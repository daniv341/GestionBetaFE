import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, newPostVenta, getAllVentas } from "../../../redux/action";
import ModalVenta from "../Components/ModalVenta";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Table,
  Badge,
} from "react-bootstrap";

const initialForm = {
  fecha: new Date().toISOString().slice(0, 10),
  comprobante: "Factura",
  nro: "",
  metodoPago: "Efectivo",
  estado: "Pendiente",
  notas: "",
  carga_imp: "",
  ventaLibre: false,
  descuento: "",
};

function formatMoney(value) {
  const n = Number(value || 0);
  return n.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

function toNumber(v) {
  const n = Number(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function mapMetodoPagoToBE(uiValue) {
  const v = String(uiValue || "").trim().toLowerCase();
  if (v === "efectivo") return "EFECTIVO";
  if (v === "transferencia") return "TRANSFERENCIA";
  if (v === "tarjeta") return "TARJETA";

  return String(uiValue || "").trim().toUpperCase().replace(/\s+/g, "_");
}

// (opcional) para mostrar lindo lo que venga del BE
function mapMetodoPagoToUI(beValue) {
  const v = String(beValue || "").trim().toUpperCase();
  if (v === "EFECTIVO") return "Efectivo";
  if (v === "TRANSFERENCIA") return "Transferencia";
  if (v === "TARJETA") return "Tarjeta";
  return beValue || "-";
}

export default function VentasPanel() {
  const dispatch = useDispatch();

  // ✅ ventas desde Redux (GET_ALL_VENTAS)
  const ventas = useSelector((state) => state.allVentas) ?? [];

  // ✅ productos desde Redux (GET_ALL_PRODUCTS)
  const productos = useSelector((state) => state.allProducts) ?? [];

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);

  const selectedCount = selectedIds.size;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllVentas()); // ✅ trae ventas del backend
  }, [dispatch]);

  // ✅ filtrado sobre ventas del store
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ventas;

    return ventas.filter((v) => {
      const id = String(v?.id ?? "").toLowerCase();
      const estado = String(v?.estado ?? "").toLowerCase();
      const metodo = String(v?.metodo_pago ?? v?.metodoPago ?? "").toLowerCase();
      const fecha = String(v?.fecha ?? v?.createdAt ?? "").toLowerCase();

      return (
        id.includes(q) ||
        estado.includes(q) ||
        metodo.includes(q) ||
        fecha.includes(q)
      );
    });
  }, [ventas, search]);

  const allChecked =
    filtered.length > 0 && filtered.every((v) => selectedIds.has(v.id));

  function toggleAll() {
    const next = new Set(selectedIds);
    if (allChecked) filtered.forEach((v) => next.delete(v.id));
    else filtered.forEach((v) => next.add(v.id));
    setSelectedIds(next);
  }

  function toggleOne(id) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  function resetModal() {
    setForm(initialForm);
    setItems([]);
    setShowModal(false);
  }

  function openCreate() {
    setForm(initialForm);
    setItems([]);
    setShowModal(true);
  }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ✅ addProducto recibe producto COMPLETO desde ModalVenta
  function addProducto(p) {
    if (!p) return;

    const productoIdNum = Number(p.id);
    if (!productoIdNum) return;

    const precioUnitario = Number(p.precio_venta ?? p.precio ?? 0);
    const nombre = String(p.nombre ?? "Producto");

    setItems((prev) => {
      const idx = prev.findIndex(
        (it) => it.tipo === "producto" && Number(it.productoId) === productoIdNum
      );

      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          cantidad: Math.max(1, toNumber(next[idx].cantidad) + 1),
        };
        return next;
      }

      return [
        ...prev,
        {
          tipo: "producto",
          productoId: productoIdNum,
          nombre,
          cantidad: 1,
          precioUnitario,
        },
      ];
    });
  }

  function updateItem(index, patch) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const subtotal = useMemo(() => {
    return items.reduce((acc, it) => {
      const qty = Math.max(0, toNumber(it.cantidad));
      const pu = Math.max(0, toNumber(it.precioUnitario));
      return acc + qty * pu;
    }, 0);
  }, [items]);

  const descuentoNum = useMemo(
    () => Math.max(0, toNumber(form.descuento)),
    [form.descuento]
  );

  const totalCalculado = useMemo(() => {
    const t = subtotal - descuentoNum;
    return t >= 0 ? t : 0;
  }, [subtotal, descuentoNum]);

  function validateVenta() {
    if (items.length === 0) return "Agregá al menos un producto.";
    for (const it of items) {
      const qty = toNumber(it.cantidad);
      if (qty <= 0) return "La cantidad debe ser mayor a 0.";
      if (!it.productoId) return "Falta productoId.";
    }
    return null;
  }

  async function createVenta(e) {
    e.preventDefault();

    const err = validateVenta();
    if (err) return alert(err);

    const estadoBool = String(form.estado).toLowerCase() === "pagada";

    const cargaImpNum =
      Number(String(form.carga_imp || "0").replace("%", "").trim()) || 0;

    const metodoPagoBE = mapMetodoPagoToBE(form.metodoPago);

    const detalles_venta = items.map((it) => ({
      productoId: Number(it.productoId),
      cantidad: Math.max(1, toNumber(it.cantidad)),
    }));

    const payload = {
      venta: {
        carga_impositiva: cargaImpNum,
        metodo_pago: metodoPagoBE,
        estado: estadoBool,
        descuento: descuentoNum,
      },
      detalles_venta,
    };

    try {
      await dispatch(newPostVenta(payload));
      resetModal();

      // ✅ refrescamos lista desde BE para que aparezca en la tabla
      dispatch(getAllVentas());
    } catch (error) {
      console.log(error);
      alert("No se pudo crear la venta. Revisá el backend.");
    }
  }

  function deleteSelected() {
    // ⚠️ OJO: esto solo borra "visual" si no tenés endpoint delete ventas.
    // Si tenés deleteVentaById, lo ideal es despachar eso.
    if (selectedCount === 0) return;
    alert("Eliminar múltiples ventas: falta conectar endpoint DELETE en backend.");
    setSelectedIds(new Set());
  }

  function badgeForEstado(estado) {
    // si tu BE manda boolean: true/false
    if (typeof estado === "boolean") {
      return estado ? <Badge bg="success">Pagada</Badge> : (
        <Badge bg="warning" text="dark">Pendiente</Badge>
      );
    }

    const s = String(estado || "").toLowerCase();
    if (s === "pagada") return <Badge bg="success">Pagada</Badge>;
    if (s === "anulada") return <Badge bg="danger">Anulada</Badge>;

    return (
      <Badge bg="warning" text="dark">
        Pendiente
      </Badge>
    );
  }

  return (
    <div className="p-3">
      <Row className="align-items-center mb-3">
        <Col>
          <div className="d-flex align-items-center gap-2">
            <h4 className="m-0">Ventas</h4>
            <span className="text-muted">/ Listado</span>
          </div>
        </Col>

        <Col xs="auto" className="d-flex gap-2">
          <Button variant="success" className="px-3 fw-semibold" onClick={openCreate}>
            CREAR
          </Button>

          <Button variant="outline-secondary" title="Configuración">
            <span aria-hidden>⚙️</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom">
          <Row className="g-2 align-items-center">
            <Col md="auto">
              <div className="fw-semibold text-uppercase text-muted" style={{ fontSize: 12 }}>
                Opciones
              </div>
            </Col>

            <Col md={5}>
              <InputGroup>
                <InputGroup.Text>🔎</InputGroup.Text>
                <Form.Control
                  placeholder="Buscar por ID, estado, método, fecha…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col className="d-flex justify-content-end gap-2">
              <Button variant="outline-danger" disabled={selectedCount === 0} onClick={deleteSelected}>
                Eliminar ({selectedCount})
              </Button>

              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-secondary">Acciones</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedIds(new Set())}>
                    Limpiar selección
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={openCreate}>Crear venta</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: 48 }} className="text-center">
                  <Form.Check checked={allChecked} onChange={toggleAll} />
                </th>
                <th>ID</th>
                <th>Fecha</th>
                <th>Carga impositiva</th>
                <th>Método de pago</th>
                <th className="text-end">Total</th>
                <th>Estado</th>
                <th className="text-end">Operaciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    No hay ventas para mostrar.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => {
                  // ✅ adaptaciones: según cómo venga el BE
                  const fecha = v?.fecha ?? v?.createdAt ?? "-";
                  const carga = v?.carga_impositiva ?? v?.carga_imp ?? "-";
                  const metodo = mapMetodoPagoToUI(v?.metodo_pago ?? v?.metodoPago);
                  const total = v?.total ?? v?.monto_total ?? 0;

                  return (
                    <tr key={v.id}>
                      <td className="text-center">
                        <Form.Check checked={selectedIds.has(v.id)} onChange={() => toggleOne(v.id)} />
                      </td>
                      <td className="fw-semibold">{v.id}</td>
                      <td>{fecha}</td>
                      <td>{carga}</td>
                      <td>{metodo}</td>
                      <td className="text-end">{formatMoney(total)}</td>
                      <td>{badgeForEstado(v.estado)}</td>
                      <td className="text-end">
                        <Dropdown align="end">
                          <Dropdown.Toggle size="sm" variant="outline-secondary">
                            ⋮
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                alert(
                                  `Venta ${v.id}\n\nDetalles: ${
                                    v?.detalles_venta?.length ?? v?.items?.length ?? 0
                                  }`
                                )
                              }
                            >
                              Ver detalle
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ModalVenta
        show={showModal}
        onClose={resetModal}
        onSubmit={createVenta}
        form={form}
        onChange={onChange}
        productos={productos}
        addProducto={addProducto}
        items={items}
        updateItem={updateItem}
        removeItem={removeItem}
        subtotal={subtotal}
        descuentoNum={descuentoNum}
        totalCalculado={totalCalculado}
        formatMoney={formatMoney}
        toNumber={toNumber}
      />
    </div>
  );
}

import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
  Badge,
} from "react-bootstrap";

const initialForm = {
  fecha: new Date().toISOString().slice(0, 10),
  cliente: "",
  comprobante: "Factura",
  nro: "",
  metodoPago: "Efectivo",
  total: "",
  estado: "Pendiente",
  notas: "",
};

function formatMoney(value) {
  const n = Number(value || 0);
  return n.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

export default function VentasPanel() {
  const [ventas, setVentas] = useState([
    {
      id: "V-0001",
      fecha: "2025-12-10",
      cliente: "Javier Gutiérrez",
      comprobante: "Factura",
      nro: "A-000123",
      metodoPago: "Transferencia",
      total: 85000,
      estado: "Pagada",
    },
    {
      id: "V-0002",
      fecha: "2025-12-12",
      cliente: "María Pérez",
      comprobante: "Factura",
      nro: "A-000124",
      metodoPago: "Efectivo",
      total: 42000,
      estado: "Pendiente",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);

  const selectedCount = selectedIds.size;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ventas;
    return ventas.filter((v) => {
      return (
        v.id.toLowerCase().includes(q) ||
        v.cliente.toLowerCase().includes(q) ||
        String(v.nro).toLowerCase().includes(q) ||
        v.estado.toLowerCase().includes(q)
      );
    });
  }, [ventas, search]);

  const allChecked = filtered.length > 0 && filtered.every((v) => selectedIds.has(v.id));

  function toggleAll() {
    const next = new Set(selectedIds);
    if (allChecked) {
      filtered.forEach((v) => next.delete(v.id));
    } else {
      filtered.forEach((v) => next.add(v.id));
    }
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
    setShowModal(false);
  }

  function openCreate() {
    setForm((prev) => ({ ...initialForm, nro: prev.nro || "" }));
    setShowModal(true);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function createVenta(e) {
    e.preventDefault();

    // Validaciones mínimas
    if (!form.cliente.trim()) return;
    const totalNum = Number(form.total);
    if (!Number.isFinite(totalNum) || totalNum <= 0) return;

    const newId = `V-${String(ventas.length + 1).padStart(4, "0")}`;

    const nueva = {
      id: newId,
      fecha: form.fecha,
      cliente: form.cliente.trim(),
      comprobante: form.comprobante,
      nro: form.nro.trim() || "-",
      metodoPago: form.metodoPago,
      total: totalNum,
      estado: form.estado,
    };

    setVentas((prev) => [nueva, ...prev]);
    resetModal();
  }

  function deleteSelected() {
    if (selectedCount === 0) return;
    setVentas((prev) => prev.filter((v) => !selectedIds.has(v.id)));
    setSelectedIds(new Set());
  }

  function badgeForEstado(estado) {
    const s = (estado || "").toLowerCase();
    if (s === "pagada") return <Badge bg="success">Pagada</Badge>;
    if (s === "anulada") return <Badge bg="danger">Anulada</Badge>;
    return <Badge bg="warning" text="dark">Pendiente</Badge>;
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
          <Button
            variant="success"
            className="px-3 fw-semibold"
            onClick={openCreate}
          >
            CREAR
          </Button>

          <Button variant="outline-secondary" title="Configuración">
            <span aria-hidden>⚙️</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm border-0">
        {/* Barra superior tipo "OPCIONES" */}
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
                  placeholder="Buscar por ID, cliente, nro, estado…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Col>

            <Col className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-danger"
                disabled={selectedCount === 0}
                onClick={deleteSelected}
              >
                Eliminar ({selectedCount})
              </Button>

              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-secondary">
                  Acciones
                </Dropdown.Toggle>
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
                <th>Cliente</th>
                <th>Comprobante</th>
                <th>Número</th>
                <th>Método de pago</th>
                <th className="text-end">Total</th>
                <th>Estado</th>
                <th className="text-end">Operaciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center text-muted py-4">
                    No hay ventas para mostrar.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v.id}>
                    <td className="text-center">
                      <Form.Check
                        checked={selectedIds.has(v.id)}
                        onChange={() => toggleOne(v.id)}
                      />
                    </td>
                    <td className="fw-semibold">{v.id}</td>
                    <td>{v.fecha}</td>
                    <td>{v.cliente}</td>
                    <td>{v.comprobante}</td>
                    <td>{v.nro}</td>
                    <td>{v.metodoPago}</td>
                    <td className="text-end">{formatMoney(v.total)}</td>
                    <td>{badgeForEstado(v.estado)}</td>
                    <td className="text-end">
                      <Dropdown align="end">
                        <Dropdown.Toggle size="sm" variant="outline-secondary">
                          ⋮
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => alert(`Ver ${v.id}`)}>
                            Ver detalle
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => alert(`Editar ${v.id}`)}>
                            Editar
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            className="text-danger"
                            onClick={() => {
                              setVentas((prev) => prev.filter((x) => x.id !== v.id));
                              setSelectedIds((prev) => {
                                const next = new Set(prev);
                                next.delete(v.id);
                                return next;
                              });
                            }}
                          >
                            Eliminar
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal Crear Venta */}
      <Modal show={showModal} onHide={resetModal} centered>
        <Form onSubmit={createVenta}>
          <Modal.Header closeButton>
            <Modal.Title>Crear venta</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Estado</Form.Label>
                  <Form.Select name="estado" value={form.estado} onChange={onChange}>
                    <option>Pendiente</option>
                    <option>Pagada</option>
                    <option>Anulada</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    name="cliente"
                    value={form.cliente}
                    onChange={onChange}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Comprobante</Form.Label>
                  <Form.Select
                    name="comprobante"
                    value={form.comprobante}
                    onChange={onChange}
                  >
                    <option>Factura</option>
                    <option>Recibo</option>
                    <option>Nota de crédito</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    name="nro"
                    value={form.nro}
                    onChange={onChange}
                    placeholder="Ej: A-000125"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Método de pago</Form.Label>
                  <Form.Select
                    name="metodoPago"
                    value={form.metodoPago}
                    onChange={onChange}
                  >
                    <option>Efectivo</option>
                    <option>Transferencia</option>
                    <option>Tarjeta</option>
                    <option>Mercado Pago</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Total</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      name="total"
                      value={form.total}
                      onChange={onChange}
                      placeholder="Ej: 85000"
                      inputMode="decimal"
                      required
                    />
                  </InputGroup>
                  <div className="text-muted mt-1" style={{ fontSize: 12 }}>
                    Vista previa: <span className="fw-semibold">{formatMoney(form.total)}</span>
                  </div>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Notas (opcional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="notas"
                    value={form.notas}
                    onChange={onChange}
                    placeholder="Observaciones internas…"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={resetModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="success" className="fw-semibold px-3">
              CREAR
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

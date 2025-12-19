import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
  ListGroup,
} from "react-bootstrap";

const ModalVenta = ({
  show,
  onClose,
  onSubmit,

  form,
  onChange,

  productos = [],
  addProducto, 

  items = [],
  updateItem,
  removeItem,

  subtotal = 0,
  descuentoNum = 0,
  totalCalculado = 0,

  formatMoney,
  toNumber,
}) => {
  // ======= Buscador productos =======
  const [q, setQ] = useState("");
  const [openSug, setOpenSug] = useState(false);
  const wrapRef = useRef(null);

  const sugerencias = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];

    return (productos ?? [])
      .filter((p) => {
        const nombre = String(p?.nombre ?? "").toLowerCase();
        const desc = String(p?.descripcion ?? "").toLowerCase();
        return nombre.includes(query) || desc.includes(query);
      })
      .slice(0, 8);
  }, [productos, q]);

  function pickProducto(p) {
    if (!p) return;
    addProducto(p); 
    setQ("");
    setOpenSug(false);
  }


  useEffect(() => {
    function onDocClick(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpenSug(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);


  useEffect(() => {
    if (!show) {
      setQ("");
      setOpenSug(false);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Form onSubmit={onSubmit}>
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
                <Form.Label>Carga Impositiva</Form.Label>
                <Form.Control
                  name="carga_imp"
                  value={form.carga_imp || ""}
                  onChange={onChange}
                  placeholder="Ej: 21%"
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
                <Form.Label>Descuento (monto)</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    name="descuento"
                    value={form.descuento || ""}
                    onChange={onChange}
                    placeholder="Ej: 2000"
                    inputMode="decimal"
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <div className="d-flex align-items-center justify-content-between mt-2">
                <div className="fw-semibold">Ítems de la venta</div>

              </div>


              <div ref={wrapRef} style={{ position: "relative" }} className="mt-2">
                <InputGroup>
                  <InputGroup.Text>🔎</InputGroup.Text>
                  <Form.Control
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setOpenSug(true);
                    }}
                    onFocus={() => setOpenSug(true)}
                    placeholder="Buscar producto por nombre o descripción…"
                    autoComplete="off"
                    disabled={(productos ?? []).length === 0}
                  />
                </InputGroup>

                {(productos ?? []).length === 0 && (
                  <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                    No hay productos cargados (o todavía están cargando).
                  </div>
                )}

                {openSug && sugerencias.length > 0 && (
                  <div
                    className="shadow-sm border rounded bg-white"
                    style={{
                      position: "absolute",
                      zIndex: 2000,
                      left: 0,
                      right: 0,
                      marginTop: 6,
                      maxHeight: 260,
                      overflow: "auto",
                    }}
                  >
                    <ListGroup variant="flush">
                      {sugerencias.map((p) => {
                        const precio = p?.precio_venta ?? 0;

                        return (
                          <ListGroup.Item
                            key={p.id}
                            action
                            onClick={() => pickProducto(p)}
                            className="py-2"
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <div className="fw-semibold">{p.nombre}</div>
                                <div className="text-muted" style={{ fontSize: 12 }}>
                                  {p.descripcion ?? "-"}
                                </div>
                              </div>
                              <div className="text-end">
                                <div className="fw-semibold">
                                  {formatMoney(precio)}
                                </div>
                              </div>
                            </div>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </div>
                )}

                {openSug && q.trim() && sugerencias.length === 0 && (
                  <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                    Sin resultados.
                  </div>
                )}
              </div>

              {/* Tabla de items */}
              <div className="mt-3 border rounded">
                <Table responsive className="mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "45%" }}>Producto / Concepto</th>
                      <th style={{ width: 120 }}>Cantidad</th>
                      <th style={{ width: 180 }}>Precio unitario</th>
                      <th className="text-end" style={{ width: 160 }}>
                        Subtotal
                      </th>
                      <th style={{ width: 60 }} />
                    </tr>
                  </thead>

                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-3">
                          Agregá al menos un producto.
                        </td>
                      </tr>
                    ) : (
                      items.map((it, idx) => {
                        const qty = Math.max(0, toNumber(it.cantidad));
                        const pu = Math.max(0, toNumber(it.precioUnitario));
                        const lineTotal = qty * pu;

                        return (
                          <tr key={`${it.productoId || it.nombre || "item"}-${idx}`}>
                            <td>
                              <div>
                                <div className="fw-semibold">{it.nombre}</div>
                                <div className="text-muted" style={{ fontSize: 12 }}>
                                  ID producto: {it.productoId}
                                </div>
                              </div>
                            </td>

                            <td>
                              <Form.Control
                                type="number"
                                min={1}
                                value={it.cantidad}
                                onChange={(e) =>
                                  updateItem(idx, { cantidad: e.target.value })
                                }
                              />
                            </td>

                            <td>
                              <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                  inputMode="decimal"
                                  value={it.precioUnitario}
                                  onChange={(e) =>
                                    updateItem(idx, { precioUnitario: e.target.value })
                                  }
                                />
                              </InputGroup>
                            </td>

                            <td className="text-end fw-semibold">
                              {formatMoney(lineTotal)}
                            </td>

                            <td className="text-end">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeItem(idx)}
                              >
                                🗑️
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Totales */}
              <div className="d-flex justify-content-end mt-3">
                <div style={{ width: 320 }} className="border rounded p-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-semibold">{formatMoney(subtotal)}</span>
                  </div>

                  <div className="d-flex justify-content-between mt-1">
                    <span className="text-muted">Descuento</span>
                    <span className="fw-semibold">- {formatMoney(descuentoNum)}</span>
                  </div>

                  <hr className="my-2" />

                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total</span>
                    <span className="fw-bold">{formatMoney(totalCalculado)}</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label>Notas (opcional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="notas"
                  value={form.notas || ""}
                  onChange={onChange}
                  placeholder="Observaciones internas…"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="success" className="fw-semibold px-3">
            CREAR
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalVenta;

import { useState } from "react";

function Sidebar({ onNavigate }) {
  const [openProducts, setOpenProducts] = useState(false);

  return (
    <aside
      className="sidebar d-flex flex-column p-4"
      style={{ width: "250px", background: "#475057", color: "white", height: "100vh" }}
    >
      <h4 className="mb-5 fw-bold">Inicio</h4>

      {/* Productos */}
      <div>
        <p
          className="fw-bold fs-4 mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenProducts(!openProducts)}
        >
          Productos
        </p>

        {openProducts && (
          <ul className="list-unstyled ms-3">
            <li
              className="mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate("cargar")}
            >
              Cargar producto
            </li>

            <li
              className="mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate("listar")}
            >
              Lista de productos
            </li>
          </ul>
        )}
      </div>

      {/* Ventas */}
      <h4 className="mt-4 fw-bold">Ventas</h4>
    </aside>
  );
}

export default Sidebar;

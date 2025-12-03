import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ onNavigate }) {
  const [openProducts, setOpenProducts] = useState(false);

  const handleLinkClick = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <aside
      className="sidebar d-flex flex-column p-4"
      style={{
        width: "250px",
        background: "#475057",
        color: "white",
        height: "100vh",
      }}
      aria-label="Barra lateral"
    >
      <header>
        <h4 className="mb-5 fw-bold">Inicio</h4>
      </header>

      <nav aria-label="Navegación principal">
        <ul className="p-0 m-0 list-unstyled">
          <li>
            <Link
              to="/"
              className="btn btn-link text-white p-0 fw-bold fs-4"
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="#ventas"
              className="btn btn-link text-white p-0 fw-bold fs-4"
            >
              Ventas
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

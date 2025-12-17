import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar({ onNavigate }) {
  const [openProducts, setOpenProducts] = useState(false);

  const handleLinkClick = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <aside className="sidebar" aria-label="Barra lateral">
      <p className="fs-3 fw-bold mb-4 text-white">Gestión Beta</p>

      <nav aria-label="Navegación principal">
        <ul className="p-0 m-0 list-unstyled d-flex flex-column gap-3 optionSidebar">
          <li>
            <Link
              to="/"
              className="px-4 d-flex align-items-center gap-2 py-2 w-100 text-white text-decoration-none"
              onClick={() => handleLinkClick("/")}
            >
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/sales"
              className="px-4 d-flex align-items-center gap-2 py-2 w-100 text-white text-decoration-none"
              onClick={() => handleLinkClick("/sales")}
            >
              <span>Ventas</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

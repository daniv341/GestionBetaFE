import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import IconProduct from "./IconProduct";
import IconSales from "./IconSales";

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Barra lateral">

      <div className="titulo w-100 py-1 mb-5 text-center">
        <h5 className="fw-bold m-0 text-white">Gestión Beta</h5>
      </div>
      
      <nav aria-label="Navegación principal" className="text-center">
        <ul className="p-0 m-0 list-unstyled d-flex flex-column gap-3 optionSidebar">
          <li>
    
            <NavLink
              to="/panel-productos"
              className={({ isActive }) =>
                `px-4 d-flex align-items-center gap-2 py-2 w-100 text-white ${isActive ? "fw-bold bg-dark rounded" : ""
                }`
              }
            >
              <IconProduct />
              <span>Productos</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/ventas"
              className={({ isActive }) =>
                `px-4 d-flex align-items-center gap-2 py-2 w-100 text-white ${isActive ? "fw-bold bg-dark rounded" : ""
                }`
              }
            >
              <IconSales />
              <span>Ventas</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

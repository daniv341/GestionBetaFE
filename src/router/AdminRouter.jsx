import React from "react";
import SidebarLayout from "../layout/SidebarLayout";
import { Route, Routes } from "react-router-dom";
import LoginPanel from "../features/auth/components/panelLogin";
import ProductRouter from "../features/product/routes/ProductRouter";
function AdminRouter() {
  return (
   <>
      {/* 👇 Aquí colocamos el botón LOGIN visible siempre en el layout */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
        <LoginPanel />
      </div>
</>
  );
}

export default AdminRouter;

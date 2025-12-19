import React from "react";
import { Outlet } from "react-router-dom";
import LoginPanel from "../features/auth/components/panelLogin";

function AdminRouter() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
        <LoginPanel />
      </div>

      <Outlet />
    </>
  );
}

export default AdminRouter;

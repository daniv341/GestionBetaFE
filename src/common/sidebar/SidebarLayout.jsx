import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const SidebarLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <main className="flex-grow-1 p-3" style={{ minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;

import React from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import { Route, Routes } from 'react-router-dom';
import ProductView from '../features/product/pages/ProductView';
import LoginPanel from '../features/auth/components/panelLogin';
function AdminRouter() {
  return (
    <SidebarLayout>

      {/* 👇 Aquí colocamos el botón LOGIN visible siempre en el layout */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
        <LoginPanel />
      </div>

      <Routes>
        <Route path="/" element={<ProductView />} />
      </Routes>
    </SidebarLayout>
  );
}

export default AdminRouter;

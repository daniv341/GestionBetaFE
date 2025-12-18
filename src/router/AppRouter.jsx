import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import LoginView from "../features/auth/pages/LoginView";
import ProductRouter from '../features/product/routes/ProductRouter';
import SidebarLayout from '../layout/SidebarLayout';

const AppRouter = () => {
  return (
    <SidebarLayout>
    <Routes>
        <Route path="/*" element={<AdminRouter></AdminRouter>} />
          <Route path="/panel-productos/*" element={<ProductRouter />} />
        <Route path="/login" element={<LoginView></LoginView>} />
    </Routes>
    </SidebarLayout>
  )
}

export default AppRouter
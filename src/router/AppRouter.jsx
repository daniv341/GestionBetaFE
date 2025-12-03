import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import ProductForm from '../features/product/components/ProductForm'
import LoginView from "../features/auth/pages/LoginView";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" element={<AdminRouter></AdminRouter>} />
        <Route path="/newProduct" element={<ProductForm></ProductForm>} />
        <Route path="/login" element={<LoginView></LoginView>} />
    </Routes>
  )
}

export default AppRouter
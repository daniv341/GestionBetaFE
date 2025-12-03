import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import ProductForm from '../features/product/components/ProductForm'

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" element={<AdminRouter></AdminRouter>} />
        <Route path="/newProduct" element={<ProductForm></ProductForm>} />
    </Routes>
  )
}

export default AppRouter
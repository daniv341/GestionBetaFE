import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ProductView from '../pages/ProductView';

function ProductRouter() {
  return (
    <Routes>
      <Route path="/formulario-producto" element={<ProductForm />} />
        <Route path="/" element={<ProductView />} />
    </Routes>
  )
}

export default ProductRouter
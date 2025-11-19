import React from 'react'
import SidebarLayout from '../layout/SidebarLayout'
import { Route, Routes } from 'react-router-dom'
import ProductView from '../features/product/pages/ProductView'

function AdminRouter() {
  return (
    <SidebarLayout>
        <Routes>
           <Route path="/" element={<ProductView></ProductView>} />
        </Routes>
    </SidebarLayout>
  )
}

export default AdminRouter
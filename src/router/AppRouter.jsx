import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" element={<AdminRouter></AdminRouter>} />
    </Routes>
  )
}

export default AppRouter
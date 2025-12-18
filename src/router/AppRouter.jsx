import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import ProductForm from '../features/product/components/ProductForm'
import LoginView from "../features/auth/pages/LoginView";
import VentasViews from '../features/Ventas/Pages/VentasView'
import SidebarLayout from '../common/sidebar/SidebarLayout'
import ProductView from '../features/product/pages/ProductView'
import LandingPage from '../features/landingPage/page/landingPage'

const AppRouter = () => {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* App con sidebar */}
      <Route element={<SidebarLayout />}>
        <Route path="/products" element={<ProductView />} />
        <Route path="/ventas" element={<VentasViews />} />
      </Route>
    </Routes>
  );
}

export default AppRouter
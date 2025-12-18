import { Route, Routes } from 'react-router-dom'
import VentasViews from '../features/Ventas/Pages/VentasView'
import SidebarLayout from '../common/sidebar/SidebarLayout'
import ProductView from '../features/product/pages/ProductView'
import LandingPage from '../features/landingPage/page/landingPage'
import ProductRouter from '../features/product/routes/ProductRouter';

const AppRouter = () => {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* App con sidebar */}
      <Route element={<SidebarLayout />}>
        <Route path="/products" element={<ProductView />} />
        <Route path="/ventas" element={<VentasViews />} />
         <Route path="/panel-productos/*" element={<ProductRouter />} />
      </Route>
    </Routes>
  );
}

export default AppRouter
import { useState } from "react";

import ProductForm from "./features/product/components/ProductForm";

import Sidebar from "./common/sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";


function App() {

  return (
    <>
     <BrowserRouter>
      <AppRouter></AppRouter>
     </BrowserRouter>
    </>
  );
}

export default App;

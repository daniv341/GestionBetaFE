import { useEffect } from "react";
import axios from "axios";
import ProductForm from "./features/product/components/ProductForm";
import {jwtDecode} from "jwt-decode";
import Sidebar from "./common/sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import LoginView from "./features/auth/pages/LoginView";

function App() {

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { exp } = jwtDecode(token);   
        const now = Date.now() / 1000;       
        if (exp < now) {
          localStorage.removeItem("token");
        } else {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

      } catch (err) {
        localStorage.removeItem("token");
      }
    }
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);

  }, []); 


  return (
    <>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </>
  );
}

export default App;

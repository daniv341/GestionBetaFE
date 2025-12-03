import axios from "axios";
import {
  POST_NEW_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, DELETE_PRODUCT_BY_ID, UPDATE_PRODUCT_BY_ID,
  POST_NEW_VENTA, GET_ALL_VENTAS, GET_VENTA_BY_ID, DELETE_VENTA_BY_ID, UPDATE_VENTA_BY_ID,
  POST_NEW_USER, GET_ALL_USERS, GET_USER_BY_ID, DELETE_USER_BY_ID, UPDATE_USER_BY_ID
} from "./actionTypes";

const url = "http://localhost:3000";


//CRUD para productos

export function newPostProduct(values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/api/v1/productos`, values);

      return dispatch({
        type: POST_NEW_PRODUCT,
        payload: res.data,
      });

    } catch (error) {
      console.log("Error al crear producto:", error);
    }
  };
}

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/api/v1/productos`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data,
      });
    }
    catch (error) {
      console.log("Error al obtener productos:", error);
    }
  }
}
export function getAllProductById() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/api/v1/productos/:id`);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error al obtener producto por ID:", error);
    }
  };
}

export function deleteProductById(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${url}/api/v1/productos/${id}`);  
      return dispatch({
        type: DELETE_PRODUCT_BY_ID,
        payload: id,
      });
    } catch (error) {
      console.log("Error al eliminar producto por ID:", error);
    }
  };
}

export function updateProductById(id, updatedData) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/api/v1/productos/${id}`, updatedData);
      return dispatch({ 
        type: UPDATE_PRODUCT_BY_ID,
        payload: res.data,
      });
    }
    catch (error) {
      console.log("Error al actualizar producto por ID:", error);
    }
  };
}

//CRUD para Ventas
export function newPostVenta(values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/api/v1/ventas`, values); 
      return dispatch({
        type: POST_NEW_VENTA,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error al crear venta:", error);
    } 
  };
}

export function getAllVentas() {
  return async function (dispatch) {
    try { 
      const res = await axios.get(`${url}/api/v1/ventas`);
      return dispatch({
        type: GET_ALL_VENTAS,
        payload: res.data,
      });
    }
    catch (error) {
      console.log("Error al obtener ventas:", error);
    }
  }
}

export function getAllVentaById() {
  return async function (dispatch) {
    try { 
      const res = await axios.get(`${url}/api/v1/ventas/:id`);
      return dispatch({
        type: GET_VENTA_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error al obtener venta por ID:", error);
    }
  };
}

export function deleteVentaById(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`${url}/api/v1/ventas/${id}`);  
      return dispatch({
        type: DELETE_VENTA_BY_ID,
        payload: id,
      });
    } catch (error) {
      console.log("Error al eliminar venta por ID:", error);
    }
  };
}

export function updateVentaById(id, updatedData) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${url}/api/v1/ventas/${id}`, updatedData);
      return dispatch({ 
        type: UPDATE_VENTA_BY_ID, 
        payload: res.data,
      });
    } catch (error) {
      console.log("Error al actualizar venta por ID:", error);
    }
  };
}

//CRUD para Usuarios

// export function newPostUser(values) { 
//   return async function (dispatch) {
//     try {
//       const res = await axios.post(`${url}/api/v1/usuarios`, values); 
//       return dispatch({
//         type: POST_NEW_USER,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log("Error al crear usuario:", error);
//     }
//   };
// }

// export function getAllUsers() {
//   return async function (dispatch) {
//     try {
//       const res = await axios.get(`${url}/api/v1/usuarios`);
//       return dispatch({
//         type: GET_ALL_USERS,
//         payload: res.data,
//       });
//     }
//     catch (error) {
//       console.log("Error al obtener usuarios:", error);
//     }
//   };
// }

// export function getUserById() {
//   return async function (dispatch) {
//     try {     
//       const res = await axios.get(`${url}/api/v1/usuarios/:id`);
//       return dispatch({
//         type: GET_USER_BY_ID,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log("Error al obtener usuario por ID:", error);
//     } 

//   };
// }


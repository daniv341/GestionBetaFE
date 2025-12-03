import axios from "axios";
import { POST_NEW_PRODUCT } from "./actionTypes";

const url = "http://localhost:3000";

export function newPostProduct(values) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${url}/api/v1/productos`, values);

      console.log("Respuesta del backend:", res.data);

      return dispatch({
        type: POST_NEW_PRODUCT,
        payload: res.data,
      });

    } catch (error) {
      console.log("Error al crear producto:", error);
    }
  };
}

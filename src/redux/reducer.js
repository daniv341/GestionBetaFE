import {
  POST_NEW_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, DELETE_PRODUCT_BY_ID, UPDATE_PRODUCT_BY_ID,
  POST_NEW_VENTA, GET_ALL_VENTAS, GET_VENTA_BY_ID, DELETE_VENTA_BY_ID, UPDATE_VENTA_BY_ID,
  POST_NEW_USER, GET_ALL_USERS, GET_USER_BY_ID, DELETE_USER_BY_ID, UPDATE_USER_BY_ID
} from "./actionTypes";

const initialState = {
  products: [],
  allProducts: [],
  productDetail: {},
  ventas: [],
  allVentas: [],
  ventaDetail: {},

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    //CRUD para productos

    case POST_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };

    case DELETE_PRODUCT_BY_ID:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };

    case UPDATE_PRODUCT_BY_ID:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        allProducts: state.allProducts.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    //CRUD para ventas
    case POST_NEW_VENTA:
      return {
        ...state,
        ventas: [...state.ventas, action.payload],
      };

    case GET_ALL_VENTAS:    
      return {
        ...state,
        ventas: action.payload,
        allVentas: action.payload,
      };
    
    case GET_VENTA_BY_ID:
      return {
        ...state,
        ventaDetail: action.payload,
      };

    case DELETE_VENTA_BY_ID:
      return {
        ...state,
        ventas: state.ventas.filter(venta => venta.id !== action.payload),
      };
      
    case UPDATE_VENTA_BY_ID:
      return {
        ...state, 
        ventas: state.ventas.map(venta =>
          venta.id === action.payload.id ? action.payload : venta
        ),
        allVentas: state.allVentas.map(v =>
          v.id === action.payload.id ? action.payload : v
        ),
      };


    default:
      return state;
  }
};




export default rootReducer; 
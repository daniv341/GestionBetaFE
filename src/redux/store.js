// src/redux/store.js

import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import rootReducer from "./reducer";

// Habilitar Redux DevTools si está disponible
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Crear el store con Thunk
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

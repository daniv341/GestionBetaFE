import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/action";
import DataTable from "../../../common/sidebar/DataTable";
import colsProduct from "../../../helpers/colsProduct.js";
import ProductRow from "../components/ProductRow";
import { Link } from "react-router-dom";

const ProductView = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    console.log("ProductView montado, despachando getProducts");
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Productos actualizados:", products);
  }, [products]);

  return (
    <>
      <section className="p-4 mt-4">
        <h3 className="text-dark font-bold">Gestión de productos</h3>
        <div className="mb-2 d-flex justify-content-end">
          <Link
            to="/panel-productos/formulario-producto"
            className="border bg-white rounded p-2 text-muted text-decoration-none"
          >
            + Agregar producto
          </Link>
        </div>

        {products && products.length > 0 ? (
          <DataTable
            columns={colsProduct.columns}
            data={products}
            RowComponent={ProductRow}
          />
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </section>
    </>
  );
};

export default ProductView;

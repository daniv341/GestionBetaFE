import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/action";
import DataTable from "../../../common/sidebar/DataTable";
import colsProduct from "../../../helpers/colsProduct.js";
import ProductRow from "../components/ProductRow";

const ProductView = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    console.log("ProductView montado, despachando getAllProducts");
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Productos actualizados:", products);
  }, [products]);

  return (
    <>
      <section className="p-4 lg:p-8">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
          <h1 className="text-dark font-bold text-xl">Gestión de productos</h1>
          <button className="border bg-white rounded-md text-gray-600 hover:text-gray-800 p-2 flex justify-center items-center text-sm">
            <span className="text-sm">Nuevo producto</span>
          </button>
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

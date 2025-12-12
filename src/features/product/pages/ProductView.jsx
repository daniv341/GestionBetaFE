import React, { useState } from "react";
import DataTable from "../../../common/sidebar/DataTable";
import colsProduct from "../../../helpers/colsProduct.js";
import ProductRow from "../components/ProductRow";


const ProductView = () => {
  const data = [
    {
      Nombre: "Gomitas ácidas",
      Categoría: "Golosinas",
      Precio: 1500,
      Stock: 120,
    },
    {
      Nombre: "Chocolate relleno",
      Categoría: "Chocolates",
      Precio: 2500,
      Stock: 80,
    },
    {
      Nombre: "Caramelos masticables",
      Categoría: "Golosinas",
      Precio: 900,
      Stock: 200,
    },
    {
      Nombre: "Alfajor triple",
      Categoría: "Alfajores",
      Precio: 1800,
      Stock: 60,
    },
    {
      Nombre: "Gaseosa Cola 500ml",
      Categoría: "Bebidas",
      Precio: 1100,
      Stock: 45,
    },
  ];

  console.log(data);
  
  return (
    <>
      <section className="p-4 lg:p-8">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
          <h1 className="text-dark font-bold text-xl">Gestión de productos</h1>
          <button className="border bg-white rounded-md text-gray-600 hover:text-gray-800 p-2 flex justify-center items-center text-sm">
            <span className="text-sm">Nuevo producto</span>
          </button>
        </div>

        
          <DataTable
            columns={colsProduct.columns}
            data={data}
            RowComponent={ProductRow}
          ></DataTable>
        
      </section>
    </>
  );
};
export default ProductView;

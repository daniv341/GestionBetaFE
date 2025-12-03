import React from 'react'
import DataTable from '../../../common/sidebar/DataTable'
import  colsProduct  from '../../../helpers/colsProduct.js'
import data from '../../../helpers/data.js'
import ProductRow from '../components/ProductRow'


function ProductView() {
    
  return (
  <section>

        <h1>Lista de productos</h1>
        <button>Nuevo Producto</button>
       <DataTable
          columns={colsProduct}
          data={data}
          RowComponent={ProductRow}
        ></DataTable>
    </section>
  
  )
}


export default ProductView


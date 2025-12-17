import React from 'react'
import { Link } from 'react-router-dom'

function ProductRow({row}) {
    console.log(row);
    
  return (
   
  <tr className="align-middle text-start text-secondary">
      <td className="">{row.id}</td>
      <td>{row.nombre}</td>
      <td>{row.descripcion}</td>
      <td>{row.categoria}</td>
      <td>${row.precio_venta}</td>
      <td>{row.stock_actual}</td>
      <td>{row.stock_minimo}</td>
      
      <td className="d-flex gap-2 align-items-center">
        <Link
          title="Ver producto"
          to={`/products/${row.id}`}
          className="btn btn-sm btn-info"
        >
          <i className="bi bi-eye"></i>
        </Link>
        <Link
          title="Editar producto"
          to={`/products/edit/${row.id}`}
          className="btn btn-sm btn-warning"
        >
          <i className="bi bi-pencil"></i>
        </Link>
        <button
          title="Eliminar producto"
          className="btn btn-sm btn-danger"
          onClick={() => console.log('Eliminar:', row.id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
import React from 'react'
import { Link } from 'react-router-dom'

function ProductRow({row}) {
    console.log(row);
    
  return (
   
  <tr className="align-middle text-start text-secondary">
      <td className="">{row.Nombre}</td>
      <td>{row.Categoria}</td>
      <td>${row.Precio}</td>
      <td>{row.Stock}</td>
      
      <td className="d-flex flex-column gap-2 align-items-center flex-lg-row d-lg-table-cell">
        <Link
          title="Ver menú"
          to="{/admin/productos/ver-menu/${row._id}}"
          className="me-lg-2 btn btn-secondary border-secondary"
        >
      
        </Link>
        <Link
          title="Editar menú"
          to="{/admin/productos/editar-menu/${row._id}}"
          className="me-lg-2 btn btn-warning"
        >
        </Link>
        <button
          variant="danger"
          title="Eliminar menú"
          className="me-lg-2"
         
        >
        
        </button>
      </td>
    </tr>
  )
}

export default ProductRow
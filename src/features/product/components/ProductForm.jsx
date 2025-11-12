import React from "react";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
  
    console.log(data);
    
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-4 bg-light rounded shadow-sm"
    >
      <h2 className="mb-3">Cargar producto</h2>

      <div className="mb-3">
        <label className="form-label">ID</label>
        <input
          {...register("id", {
            required: "Campo obligatorio",
            maxLength: {
              value: 40,
              message: "El ID no puede superar los 40 caracteres :)",
            },
          })}
          type="text"
          className={`form-control ${errors.id ? "is-invalid" : ""}`}
        />
        {errors.id && (
          <div className="invalid-feedback">{errors.id.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          {...register("nombre", { required: "Campo obligatorio" })}
          type="text"
          className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
        />
        {errors.nombre && (
          <div className="invalid-feedback">{errors.nombre.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea {...register("descripcion")} className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio de venta</label>
        <input
          {...register("precioVenta", {
            required: "Campo obligatorio",
            valueAsNumber: true,
          })}
          type="number"
          step="0.01"
          className={`form-control ${errors.precioVenta ? "is-invalid" : ""}`}
        />
        {errors.precioVenta && (
          <div className="invalid-feedback">{errors.precioVenta.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Precio de compra</label>
        <input
          {...register("precioCompra", { valueAsNumber: true })}
          type="number"
          step="0.01"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <input
          {...register("categoria")}
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Stock actual</label>
        <input
          {...register("stockActual", { valueAsNumber: true })}
          type="number"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Stock mínimo</label>
        <input
          {...register("stockMinimo", { valueAsNumber: true })}
          type="number"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select {...register("estado")} className="form-select">
          <option value="habilitado">Habilitado</option>
          <option value="deshabilitado">Deshabilitado</option>
        </select>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => reset()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

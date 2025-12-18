import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/formProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../slices/actions/productActions";

export default function ProductForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const isAuthenticated = auth?.isAuthenticated;
  
  console.log("Estado de auth en ProductForm:", { auth, user, isAuthenticated });
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      enable: true,
    },
  });

  const precioVenta = watch("precio_venta");
  const precioCompra = watch("precio_compra");

  const handleFormSubmit = async (data) => {
    try {
      if (!isAuthenticated || !user) {
        alert("Debes estar autenticado para crear un producto");
        return;
      }

      console.log("Datos del formulario antes de enviar:", data);
      console.log("Usuario actual:", user);
      
      const result = await dispatch(createProduct({ ...data, user }));
      console.log("Resultado de la acción:", result);
      
      if (result.type === createProduct.fulfilled.type) {
        console.log("Producto creado exitosamente");
        alert("Producto creado exitosamente");
        reset();
        navigate("/panel-productos");
      } else {
        console.error("Error al crear producto:", result.payload);
        alert("Error: " + (result.payload?.error || result.payload?.message || "No se pudo crear el producto"));
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error: " + error.message);
    }
  };

  const handleCancel = () => {
    navigate("/panel-productos");
  };

  const blockInvalidKeys = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1 className="form-title">
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Producto
          </h1>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="form-body">
          {/* Información Básica */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-info-circle me-2"></i>
              Información Básica
            </h3>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label fw-semibold">
                  Nombre del Producto <span className="text-danger">*</span>
                </label>
                <input
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 3,
                      message: "Mínimo 3 caracteres",
                    },
                    maxLength: {
                      value: 100,
                      message: "Máximo 100 caracteres",
                    },
                  })}
                  type="text"
                  placeholder="Ej: Laptop Dell Inspiron"
                  className={`py-2 ${errors.nombre ? "is-invalid" : ""}`}
                />
                {errors.nombre && (
                  <div className="invalid-feedback d-block">
                    {errors.nombre.message}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">
                  SKU <span className="text-muted">(Opcional)</span>
                </label>
                <input
                  {...register("SKU", {
                    maxLength: {
                      value: 50,
                      message: "Máximo 50 caracteres",
                    },
                  })}
                  type="text"
                  placeholder="Ej: DELL-001"
                  className={`py-2 ${errors.SKU ? "is-invalid" : ""}`}
                />
                {errors.SKU && (
                  <div className="invalid-feedback d-block">
                    {errors.SKU.message}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label fw-semibold">
                Descripción <span className="text-danger">*</span>
              </label>
              <textarea
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  minLength: {
                    value: 10,
                    message: "Mínimo 10 caracteres",
                  },
                  maxLength: {
                    value: 500,
                    message: "Máximo 500 caracteres",
                  },
                })}
                rows="4"
                placeholder="Describe las características del producto..."
                className={`py-2 ${errors.descripcion ? "is-invalid" : ""}`}
              />
              {errors.descripcion && (
                <div className="invalid-feedback d-block">
                  {errors.descripcion.message}
                </div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Categoría <span className="text-danger">*</span>
                </label>
                <input
                  {...register("categoria", {
                    required: "La categoría es obligatoria",
                    minLength: {
                      value: 3,
                      message: "Mínimo 3 caracteres",
                    },
                  })}
                  type="text"
                  placeholder="Ej: Electrónica"
                  className={`py-2 ${errors.categoria ? "is-invalid" : ""}`}
                />
                {errors.categoria && (
                  <div className="invalid-feedback d-block">
                    {errors.categoria.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Precios */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-cash-coin me-2"></i>
              Precios
            </h3>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Precio de Compra <span className="text-danger">*</span>
                </label>
                <div className="input-group input-group-lg">
                  <span className="me-2">$</span>
                  <input
                    {...register("precio_compra", {
                      required: "El precio de compra es obligatorio",
                      valueAsNumber: true,
                      min: {
                        value: 0.01,
                        message: "Debe ser mayor a 0",
                      },
                    })}
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    onKeyDown={blockInvalidKeys}
                    className={` ${errors.precio_compra ? "is-invalid" : ""}`}
                  />
                </div>
                {errors.precio_compra && (
                  <div className="invalid-feedback d-block">
                    {errors.precio_compra.message}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label fw-semibold">
                  Precio de Venta <span className="text-danger">*</span>
                </label>
                <div className="input-group input-group-lg">
                  <span className="me-2">$</span>
                  <input
                    {...register("precio_venta", {
                      required: "El precio de venta es obligatorio",
                      valueAsNumber: true,
                      min: {
                        value: 0.01,
                        message: "Debe ser mayor a 0",
                      },
                      validate: (value) =>
                        !precioCompra ||
                        value >= precioCompra ||
                        "Debe ser mayor o igual al precio de compra",
                    })}
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    onKeyDown={blockInvalidKeys}
                    className={` ${errors.precio_venta ? "is-invalid" : ""}`}
                  />
                </div>
                {errors.precio_venta && (
                  <div className="invalid-feedback d-block">
                    {errors.precio_venta.message}
                  </div>
                )}
              </div>
            </div>

            {precioVenta && precioCompra && precioVenta > precioCompra && (
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Margen de ganancia:</strong> $
                {(precioVenta - precioCompra).toFixed(2)} (
                {Math.round(
                  ((precioVenta - precioCompra) / precioCompra) * 100
                )}
                %)
              </div>
            )}
          </div>

          {/* Stock */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-boxes me-2"></i>
              Inventario
            </h3>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Stock Actual <span className="text-danger">*</span>
                </label>
                <input
                  {...register("stock_actual", {
                    required: "El stock actual es obligatorio",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Debe ser 0 o mayor",
                    },
                  })}
                  type="number"
                  step="1"
                  min="0"
                  placeholder="0"
                  onKeyDown={blockInvalidKeys}
                  className={`py-2 ${errors.stock_actual ? "is-invalid" : ""}`}
                />
                {errors.stock_actual && (
                  <div className="invalid-feedback d-block">
                    {errors.stock_actual.message}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Stock Mínimo <span className="text-danger">*</span>
                </label>
                <input
                  {...register("stock_minimo", {
                    required: "El stock mínimo es obligatorio",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Debe ser 0 o mayor",
                    },
                  })}
                  type="number"
                  step="1"
                  min="0"
                  placeholder="0"
                  onKeyDown={blockInvalidKeys}
                  className={`py-2 ${errors.stock_minimo ? "is-invalid" : ""}`}
                />
                {errors.stock_minimo && (
                  <div className="invalid-feedback d-block">
                    {errors.stock_minimo.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="form-section">
            <div className="form-check form-switch">
              <input
                {...register("enable")}
                type="checkbox"
                className="form-check-input"
                id="enableSwitch"
              />
              <label className="form-check-label" htmlFor="enableSwitch">
                <strong>Producto Habilitado</strong>
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              <i className="bi bi-check-circle me-2"></i>
              {isSubmitting ? "Guardando..." : "Guardar Producto"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-outline-secondary "
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/action"; 
export default function FormularioLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));

      console.log("Resultado login:", resultAction);


      if (resultAction?.payload) {
        // Por ahora sólo vemos que llegó algo
        // Más adelante podés hacer navigate("/home") o similar
        navigate("/"); // o "/dashboard", lo que tengas
      }
    } catch (error) {
      console.error("Error en el login:", error);
      // acá podrías mostrar un mensaje en pantalla si querés
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Iniciar sesión
      </h2>

      <form onSubmit={handleSubmit(handleLogin)}>
        <label className="block mb-1 text-sm font-medium" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 rounded-md border border-gray-300"
          placeholder="nombre@ejemplo.com"
          {...register("email", {
            required: "El correo es obligatorio",
            minLength: {
              value: 3,
              message: "El correo debe contener al menos 3 caracteres",
            },
            maxLength: {
              value: 265,
              message: "El correo debe contener como máximo 265 caracteres",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}

        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="••••••••"
            {...register("contraseña", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
              maxLength: {
                value: 16,
                message: "La contraseña debe tener como máximo 16 caracteres",
              },
            })}
          />
          {errors.contraseña && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contraseña.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

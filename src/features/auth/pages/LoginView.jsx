import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function FormularioLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispach = useDispatch();

  const handleLogin = async (data) => {
    e.preventDefault();
    const result = await dispach(loginUser(data));
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

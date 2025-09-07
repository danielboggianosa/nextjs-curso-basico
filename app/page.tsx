"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validatePassword = (password: string) => password.length >= 8;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al registrar el usuario.");
      } else {
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setEmail("");
        setName("");
        setPassword("");
      }
    } catch {
      setError("Error de red. Intenta nuevamente más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
            Registro de Usuario
          </h2>
          <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
            Completa el formulario para crear una cuenta.
          </p>
          {error && (
            <div
              role="alert"
              className="mb-4 p-3 text-red-700 bg-red-100 rounded border border-red-300"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              role="alert"
              className="mb-4 p-3 text-green-700 bg-green-100 rounded border border-green-300"
            >
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-800 dark:text-gray-200"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error && !validateEmail(email)
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              aria-invalid={error && !validateEmail(email) ? "true" : undefined}
            />

            <label
              htmlFor="name"
              className="block mb-1 font-medium text-gray-800 dark:text-gray-200"
            >
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error && !name.trim()
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              aria-invalid={error && !name.trim() ? "true" : undefined}
            />

            <label
              htmlFor="password"
              className="block mb-6 font-medium text-gray-800 dark:text-gray-200"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mb-6 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error && !validatePassword(password)
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              aria-invalid={error && !validatePassword(password) ? "true" : undefined}
              minLength={8}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        </div>
      </section>
  );
}
"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!password) {
      setError("La contraseña es obligatoria.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Credenciales inválidas.");
      } else {
        // Login exitoso - por ejemplo, redirigir a dashboard
        // Aquí puedes usar next/navigation para redirección
        // import { useRouter } from 'next/navigation';
        // router.push('/dashboard');
        console.log("Usuario logueado:", data);
        // Para demo limpiaremos formulario
        setEmail("");
        setPassword("");
        setError("");
        alert("Login exitoso!");
      }
    } catch (err) {
      setError("Error de red. Intenta nuevamente más tarde.");
      console.error("Error en login:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
          Iniciar Sesión
        </h1>
        <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
          Ingresa tus credenciales para acceder a tu cuenta.
        </p>
        {error && (
          <div
            role="alert"
            className="mb-4 p-3 text-red-700 bg-red-100 rounded border border-red-300"
          >
            {error}
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
            htmlFor="password"
            className="block mb-6 font-medium text-gray-800 dark:text-gray-200"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mb-6 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error && !password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            aria-invalid={error && !password ? "true" : undefined}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}

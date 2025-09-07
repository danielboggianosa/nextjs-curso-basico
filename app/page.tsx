"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Form submitted");
    // Here you would typically handle form submission, e.g., send data to an API
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          name,
          password
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to register");
        return;
      }
      const data = await response.json();
      console.log("User registered:", data);
      // Optionally redirect or show success message
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to register. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <p className="mb-4">Please fill in the form below to register.</p>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="mb-2 p-2 border rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
        <input
          type="text"
          placeholder="Name"
          className="mb-2 p-2 border rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 border rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}

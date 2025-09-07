import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/users.service";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const userService = new UserService();

    try {
      const user = await userService.login(email, password);

      // No retornar la contraseña en la respuesta
      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json(userWithoutPassword);
    } catch (loginError: any) {
      // loginError.message puede ser "User not found" o "Invalid password"
      return NextResponse.json({ error: loginError.message }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Error en /api/login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
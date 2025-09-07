import { UserService } from "@/services/users.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, name, password } = await request.json();

        if (!email || !name || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const service = new UserService();
        const result = await service.create({ email, name, password });
        if (!result) {
            return NextResponse.json({ error: 'Error creating user' }, { status: 400 });
        }

        return NextResponse.json({ email, name, password });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
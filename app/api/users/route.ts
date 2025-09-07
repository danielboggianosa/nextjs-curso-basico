import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        const password = searchParams.get('password');
        return NextResponse.json({ username, password });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();
        return NextResponse.json({ username, password });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}
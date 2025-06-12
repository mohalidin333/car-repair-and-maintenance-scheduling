import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {role, firstname, lastname, email, password} = await request.json();

    return NextResponse.json({
        role,
        firstname,
        lastname,
        email,
        password
    });
}
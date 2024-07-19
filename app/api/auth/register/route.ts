import { Request } from 'express';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        console.log("req.body:", req.body);

        const data = await req.json();

        return NextResponse.json({ status: 200, message: "Registered" });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
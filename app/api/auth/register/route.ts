import { NextRequest, NextResponse } from 'next/server';

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        // const data = req.body;
        const data = await req.json();
        console.log("req.body:", data);

        return NextResponse.json({ status: 200, message: "Registered" });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
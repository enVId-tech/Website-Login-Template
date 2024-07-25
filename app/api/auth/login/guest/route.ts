import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const response = NextResponse.json({ status: 200, message: "Logged in as guest" });

        response.headers.set('Set-Cookie', `sessionToken=guest; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 1}`); // 1 days

        return response;
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
};
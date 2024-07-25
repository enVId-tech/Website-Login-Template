import { UserLoginData } from "@/app/api/modules/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const data: UserLoginData = await req.json() as unknown as UserLoginData;

        if (data.password) {
            return NextResponse.json({ status: 400, message: "Password not allowed" });
        }

        console.log("data:", data);
        const response: NextResponse = NextResponse.json(
            {
                status: 200,
                message: "Logged in as guest"
            }
        );

        // response.cookies.set('sessionToken', 'guest', { sameSite: 'strict', path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 3 }); // 3 days
        response.headers.set('Set-Cookie', `sessionToken=${data.username}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 1}`); // 1 days

        if (!response.headers.get("Set-Cookie")) {
            throw new Error("No cookie set");
        }

        return response;
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
};
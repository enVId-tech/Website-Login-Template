import { getItemsFromDatabase, deleteFromDatabase } from '@/app/api/modules/mongoDB.ts';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const data = req.headers.get("cookie")?.split(";").find((cookie: string) => cookie.includes("userId"))?.split("=")[1];

        if (!data) {
            return NextResponse.json({ status: 400, message: "No data found" });
        }

        const deleted = await deleteFromDatabase({ sessionToken: data }, "users", "one");

        if (!deleted) {
            return NextResponse.json({ status: 404, message: "No data found" });
        }

        if (await getItemsFromDatabase("events", { userId: data })) {
            await deleteFromDatabase({ sessionToken: data }, "events", "one");
        }

        res.cookies.set("sessionToken", "", { path: "/", httpOnly: true, sameSite: "strict", maxAge: 0 });

        return NextResponse.redirect("/login");
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
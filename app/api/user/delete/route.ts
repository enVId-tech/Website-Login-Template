import { getItemsFromDatabase, deleteFromDatabase } from '@/app/api/modules/mongoDB.ts';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        // const data = req.headers.get("cookie")?.split(";").find((cookie: string) => cookie.includes("userId"))?.split("=")[1];

        const dataMain = req.cookies.get("sessionToken");

        if (!dataMain) {
            return NextResponse.json({ status: 400, message: "No data found" });
        }

        const data = dataMain.value;

        const deleted = await deleteFromDatabase({ sessionToken: data }, "users", "one");

        cookies().delete("sessionToken");

        if (!deleted) {
            return NextResponse.json({ status: 404, message: "No data found" });
        }
        

        return NextResponse.json({ status: 200, message: "User deleted" });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
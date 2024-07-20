import { getItemsFromDatabase, modifyInDatabase } from "@/app/api/modules/mongoDB.ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const cookies = req.headers.get("cookie");
        const sessionToken = cookies?.split(";").find((cookie: string) => cookie.includes("sessionToken"))?.split("=")[1];

        if (!sessionToken) {
            return NextResponse.json({ status: 401, message: "You must be logged in to view user data" });
        }

        if (sessionToken === "guest") {
            const response = NextResponse.json({
                status: 200,
                message: "Logged out"
            });

            response.headers.set('Set-Cookie', `sessionToken=""; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);

            return response;
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { sessionToken }));

        if (!fileData || fileData.length === 0) {
            return NextResponse.json({ status: 404, message: "No data found" });
        } else if (fileData.length > 1) {
            return NextResponse.json({ status: 500, message: "Multiple data found" });
        }

        if (fileData[0]._id) {
            delete fileData[0]._id;
        }

        if (fileData[0].sessionToken) {
            fileData[0].sessionToken = "";
        }

        await modifyInDatabase({ email: fileData.email }, fileData[0], "users");

        const response = NextResponse.json({ status: 200, message: "Logged out" });

        response.headers.set('Set-Cookie', 'sessionToken=""; Path=/; HttpOnly; SameSite=Strict; Max-Age=0;');

        return response;
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
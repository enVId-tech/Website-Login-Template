import { NextApiResponse } from "next";
import { deleteFromDatabase, getItemsFromDatabase } from "@/app/api/modules/mongoDB.ts";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest, res: NextApiResponse): Promise<NextResponse> {
    try {
        const cookies = req.headers.get("cookie");
        const sessionToken = cookies?.split(";").find((cookie: string) => cookie.includes("sessionToken"))?.split("=")[1];
        
        if (!sessionToken) {
            return NextResponse.json({ status: 401, message: "You must be logged in to view user data" });
        }
        
        if (sessionToken === "guest") {
            return NextResponse.json({ status: 401, message: "You must be logged in to view user data" });
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { sessionToken }));

        if (!fileData || fileData.length === 0) {
            return NextResponse.json({ status: 404, message: "No data found" });
        } else if (fileData.length > 1) {
            await deleteFromDatabase({ sessionToken }, "users", "many");
            return NextResponse.json({ status: 500, message: "Multiple data found" });
        }

        if (fileData[0]._id) {
            delete fileData[0]._id;
        }

        if (fileData[0].sessionToken) {
            delete fileData[0].sessionToken;
        }

        return NextResponse.json({ status: 200, message: "User data found", data: fileData[0] });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
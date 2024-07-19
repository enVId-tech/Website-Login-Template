import { Request } from "express";
import { NextApiResponse } from "next";
import { deleteFromDatabase, getItemsFromDatabase } from "@/app/api/modules/mongoDB.ts";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse): Promise<NextResponse> {
    try {
        console.log("req.cookies:", req.cookies);
        if (req.cookies["userId"] === "guest") {
            return NextResponse.json({ status: 401, message: "You must be logged in to view user data" });
        } else if (!req.cookies["userId"]) {
            return NextResponse.json({ status: 404, message: "No data found" });
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { userId: req.cookies["userId"] }));

        if (!fileData || fileData.length === 0) {
            NextResponse.json({ status: 404, message: "No data found" });
        } else if (fileData.length > 1) {
            await deleteFromDatabase({ userId: req.cookies["userId"] }, "users", "many");
            return NextResponse.json({ status: 500, message: "Multiple data found" });
        }

        if (fileData[0]._id) {
            delete fileData[0]._id;
        }

        if (fileData[0].userId) {
            delete fileData[0].userId;
        }

        return NextResponse.json(fileData);
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
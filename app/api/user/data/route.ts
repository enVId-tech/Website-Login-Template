import { Request, Response } from "express";
import { deleteFromDatabase, getItemsFromDatabase } from "@/app/api/modules/mongoDB.ts";

export async function POST(req: Request, res: Response) {
    try {
        if (req.cookies["userId"] === "guest") {
            res.status(401).json({ status: 401, message: "You must be logged in to view user data" });
            return;
        } else if (!req.cookies["userId"]) {
            res.status(404).json({ status: 404, message: "No data found" });
            return;
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { userId: req.cookies["userId"] }));

        if (!fileData || fileData.length === 0) {
            res.status(404).json({ status: 404, message: "No data found" });
        } else if (fileData.length > 1) {
            await deleteFromDatabase({ userId: req.cookies["userId"] }, "users", "many");
            res.status(500).json({ status: 500, message: "Multiple data found" });
        }

        if (fileData[0]._id) {
            delete fileData[0]._id;
        }

        if (fileData[0].userId) {
            delete fileData[0].userId;
        }

        res.status(200).json(fileData);
    } catch (error: unknown) {
        console.error("Error:", error);
    }
}
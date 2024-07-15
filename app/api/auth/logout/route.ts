import { Request, Response } from "express";
import { getItemsFromDatabase } from "@/app/api/modules/mongoDB.ts";

export async function POST(req: Request, res: Response) {
    try {
        if (!req.session) {
            return res.status(400).json({ status: 400, message: "No data found" });
        }

        const data = req.cookies["userId"];

        if (!data) {
            return res.status(400).json({ status: 400, message: "No data found" });
        }

        await getItemsFromDatabase("users", { userId: data });

        res.clearCookie("userId");

        req.session.destroy((err: unknown) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).json({ status: 500, message: "Error during logout" });
            }
            res.clearCookie("userId");
            res.status(200).json({ status: 200, message: "Logged out" });
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { getItemsFromDatabase } from "@/app/api/modules/mongoDB.ts";
import { comparePassword } from "@/app/api/modules/encryption.ts";
import { Request, Response } from "express";

export const runtime = "nodejs";


export async function POST(req: Request, res: Response) {
        try {
        const data = req.body;

        if (!data) {
            throw new Error("No data found");
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { email: data.username }));

        if (!fileData || fileData.length === 0) {
            res.status(404).json({ status: 404, message: "No data found" });
            throw new Error("No data found");
        } else if (fileData.length > 1) {
            res.status(500).json({ status: 500, message: "Multiple data found" });
            throw new Error("Multiple data found");
        }

        if (await comparePassword(data.password, fileData[0].password)) {
            res.cookie("userId", fileData[0].userId, {
                maxAge: 1000 * 60 * 60 * 24 * 3.5, // 3.5 days
                httpOnly: true,
            });

            res.status(200).json({ status: 200, message: "Logged in" });
        } else {
            res.status(401).json({ status: 401, message: "Incorrect password" });
        }
    } catch (error: unknown) {
        console.error("Error:", error);
    }
};
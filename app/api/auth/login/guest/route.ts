import { Request, Response } from "express";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        res.cookie("userId", "guest", {
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
            httpOnly: true,
        });

        return NextResponse.json({ status: 200, message: "Logged in as guest" });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
};
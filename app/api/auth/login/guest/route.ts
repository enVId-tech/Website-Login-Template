import { Request, Response } from "express";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        res.clearCookie("userId");
        // res.redirect(`http://${APP_HOSTNAME}:${CLIENT_PORT}`);
        return NextResponse.redirect('/');
    } catch (error: unknown) {
        console.error("Error:", error as string);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
};
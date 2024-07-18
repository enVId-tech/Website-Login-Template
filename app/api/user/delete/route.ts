import { Request, Response } from 'express';
import { getItemsFromDatabase, deleteFromDatabase } from '@/app/api/modules/mongoDB.ts';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    try {
        const data = req.cookies["userId"];

        if (!data) {
            return NextResponse.json({ status: 400, message: "No data found" });
        }

        const deleted = await deleteFromDatabase({ userId: data }, "users", "one");

        if (!deleted) {
            return NextResponse.json({ status: 404, message: "No data found" });
        }

        if (await getItemsFromDatabase("events", { userId: data })) {
            await deleteFromDatabase({ userId: data }, "events", "one");
        }

        res.clearCookie("userId");

        return NextResponse.redirect("/login");
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
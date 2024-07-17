import { Request, Response} from 'express';
import { getItemsFromDatabase, deleteFromDatabase } from '@/app/api/modules/mongoDB.ts';

export async function POST(req: Request, res: Response) {
    try {
        const data = req.cookies["userId"];

        if (!data) {
            throw new Error("No data found");
        }

        const deleted = await deleteFromDatabase({ userId: data }, "users", "one");

        if (!deleted) {
            res.status(404).json({ status: 404, message: "No data found" });
            throw new Error("No data found or error occurred");
        }

        if (await getItemsFromDatabase("events", { userId: data })) {
            await deleteFromDatabase({ userId: data }, "events", "one");
        }

        res.clearCookie("userId");

        res.status(200).json({ status: 200, message: "Data deleted" });
    } catch (error: unknown) {
        console.error("Error:", error);
    }
}
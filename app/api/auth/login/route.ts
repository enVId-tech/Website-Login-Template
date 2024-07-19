import { NextResponse } from "next/server";
import { getItemsFromDatabase } from "@/app/api/modules/mongoDB.ts";
import { comparePassword } from "@/app/api/modules/encryption.ts";
import { UserLoginData } from "@/app/api/modules/interfaces.ts";

export const runtime = "nodejs";


export async function POST(req: NextResponse, res: NextResponse): Promise<NextResponse> {
    try {
        const data: UserLoginData = await req.json() as unknown as UserLoginData;

        console.log("data:", data);

        if (!data) {
            throw new Error("No data found");
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { email: data.username }));

        if (!fileData || fileData.length === 0) {
            return NextResponse.json({ status: 404, message: "No data found" });
        } else if (fileData.length > 1) {
            return NextResponse.json({ status: 500, message: "Multiple data found" });
        }

        if (await comparePassword(data.password, fileData[0].password)) {
            // req.cookie("userId", fileData[0].userId, {
            //     maxAge: 1000 * 60 * 60 * 24 * 3.5, // 3.5 days
            //     httpOnly: true,
            // });

            return NextResponse.json({ status: 200, message: "Logged in" });
        } else {
            return NextResponse.json({ status: 401, message: "Incorrect password" });
        }
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
};
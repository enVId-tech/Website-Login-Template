import { NextRequest, NextResponse } from "next/server";
import { getItemsFromDatabase, modifyInDatabase } from "@/app/api/modules/mongoDB.ts";
import { comparePassword, generateRandomValue } from "@/app/api/modules/encryption.ts";
import { UserLoginData } from "@/app/api/modules/interfaces.ts";

export const runtime = "nodejs";


export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
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
            const newSessionToken = generateRandomValue(256, "all");

            console.log("newSessionToken:", newSessionToken);

            fileData[0].sessionToken = newSessionToken;

            delete fileData[0]._id;

            await modifyInDatabase({ email: data.username }, fileData[0], "users");

            return NextResponse.json(
                { 
                    status: 200, 
                    message: "Logged in",
                    headers: {
                        "Set-Cookie": `sessionToken=${newSessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 3}` // 3 days
                    }
                }
            );
        } else {
            return NextResponse.json({ status: 401, message: "Incorrect password" });
        }
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
};
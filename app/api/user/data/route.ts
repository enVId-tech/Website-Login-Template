import { NextApiResponse } from "next";
import { deleteFromDatabase, getItemsFromDatabase } from "@/app/api/modules/mongoDB.ts";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextApiResponse): Promise<NextResponse> {
    try {
        const cookiesMain = req.headers.get("cookie");
        const sessionToken = cookiesMain?.split(";").find((cookie: string) => cookie.includes("sessionToken"))?.split("=")[1];
        
        if (!sessionToken) {
            return NextResponse.json({ status: 404, message: "No session token found" });
        }
        
        if (sessionToken === "guest") {
            return NextResponse.json({ 
                status: 401, 
                message: "You must be logged in to view user data", 
                data: {
                    displayName: "Guest",
                    email: "",
                    firstname: "Guest",
                    lastname: "",
                    hd: "",
                    profilePicture: "",
                } 
            });
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { sessionToken }));

        if (!fileData || fileData.length === 0) {
            let response = NextResponse.json({ status: 404, message: "No data found" });

            response.headers.set('Set-Cookie', `sessionToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);

            return response;
        } else if (fileData.length > 1) {
            await deleteFromDatabase({ sessionToken }, "users", "many");
            return NextResponse.json({ status: 500, message: "Multiple data found" });
        }

        if (fileData[0]._id) {
            delete fileData[0]._id;
        }

        if (fileData[0].sessionToken) {
            delete fileData[0].sessionToken;
        }

        if (fileData[0].password) {
            delete fileData[0].password;
        }

        return NextResponse.json({ status: 200, message: "User data found", data: fileData[0] });
    } catch (error: unknown) {
        console.error("Error:", error);
        // return NextResponse.json({ status: 500, message: "Internal server error" })
        return NextResponse.redirect("/login");
    }
}
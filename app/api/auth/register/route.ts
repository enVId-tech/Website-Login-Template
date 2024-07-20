import { getItemsFromDatabase, writeToDatabase } from '@/app/api/modules/mongoDB.ts';
import { NextRequest, NextResponse } from 'next/server';
import { RegisterData } from '@/app/api/modules/interfaces';
import { permanentEncryptPassword } from '@/app/api/modules/encryption.ts';

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const data: RegisterData = await req.json();

        if (!data || !data.email || !data.password || !data.username) {
            return NextResponse.json({ status: 400, message: "No data found" });
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { email: data.email }));
        
        if (fileData.length > 0) {
            return NextResponse.json({ status: 409, message: "User already exists" });
        }

        if (fileData.length > 1) {
            return NextResponse.json({ status: 500, message: "Multiple data found" });
        }

        const hashedPassword: string = await permanentEncryptPassword(data.password);

        console.log("hashedPassword: " + hashedPassword);

        let firstName: string = "";
        let lastName: string = "";

        if (data.username.split(" ").length > 1) {
            firstName = data.username.split(" ")[0];
            lastName = data.username.split(" ")[1];
        }

        const newUser = {
            displayName: data.username,
            email: data.email,
            password: hashedPassword,
            firstname: firstName ? firstName : data.username,
            lastname: lastName ? lastName : "",
            hd: "",
            profilePicture: "",
            sessionToken: "",
        }

        const write = await writeToDatabase("users", newUser);

        if (!write) {
            return NextResponse.json({ status: 500, message: "Error writing to database" });
        }

        const user = JSON.parse(await getItemsFromDatabase("users", { email: data.email }));

        if (user.length !== 1) {
            return NextResponse.json({ status: 500, message: "Error reading from database" });
        }

        return NextResponse.json({ status: 200, message: "User created", userId: user[0].userId });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
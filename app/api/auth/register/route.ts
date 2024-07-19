import { getItemsFromDatabase } from '@/server/modules/mongoDB';
import { NextRequest, NextResponse } from 'next/server';
import { RegisterData } from '@/app/api/interfaces';
import { encryptData } from '@/server/modules/encryption';

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const data: RegisterData = await req.json();

        if (!data || !data.email || !data.password || !data.username) {
            return NextResponse.json({ status: 400, message: "No data found" });
        }

        // const fileData = JSON.parse(await getItemsFromDatabase("users", { email: data.email }));
        
        // if (fileData.length > 0) {
        //     return NextResponse.json({ status: 409, message: "User already exists" });
        // }

        // if (fileData.length > 1) {
        //     return NextResponse.json({ status: 500, message: "Multiple data found" });
        // }

        // if (fileData[0]._id) {
        //     delete fileData[0]._id;
        // }

        const hashedPassword = await encryptData(data.password);

        console.log("hashedPassword: " + hashedPassword.encryptedData);

        return NextResponse.json({ status: 200, message: "Registered" });
    } catch (error: unknown) {
        console.error("Error:", error);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}
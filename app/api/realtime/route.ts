import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(req: NextRequest, res: NextResponse) {
    type GetTime = { timestamp: number; };
    const body: GetTime = { timestamp: Date.now() };
    return new Response(JSON.stringify(body), {
        headers: {
            "content-type": "application/json",
        },
    });
    // return new Response("Hi! This is a test response from the server.", {
    //     headers: {
    //         "content-type": "text/plain",
    //     },
    // });
}
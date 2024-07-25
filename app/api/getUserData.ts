"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserData } from "./modules/interfaces";

function getCookie(name: string): string | null {
    return cookies().get(name)?.value ?? '';
}

export default async function getUserData(): Promise<UserData | null | undefined> {
    try {
        const cookie: string | null = await getCookie('sessionToken');

        if (!cookie) {
            console.error('Error: No session token found');
            redirect('/login');
        }

        const response: Response = await fetch('http://localhost:3000/api/user/data', 
            { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `sessionToken=${cookie}`,
                },
                cache: "no-store",
            }
        );

        const data = await response.json();

        if (data.status === 404) {
            console.error('Error: No user data found');
            redirect('/login');
        } else if (data.status === 400) {
            console.error('Error: Bad request');
            redirect('/login');
        } else if (data.status === 401) {
            console.log("Guest account");
            return
        } else if (data.status === 500) {
            console.error('Error: An error occurred. Please try again later.');
            redirect('/login');
        }

        if (!data || data === null) {
            console.error(data);
            console.error('Error: No data found');
            return null;
        }

        return data.data;
    } catch (error: unknown) {
        console.error('Error:', error);
        return null;
    }
}
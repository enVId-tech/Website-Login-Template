"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserData } from "./modules/interfaces";

function getCookie(name: string): string | null {
    return cookies().get(name)?.value ?? '';
}

export default async function getUserData(retries?: number): Promise<UserData | null | undefined> {
    let redirectTo: string = '';

    try {
        const cookie: string | null = await getCookie('sessionToken');

        console.log('Cookie:', cookie);

        if (!cookie || cookie === null) {
            console.error('Error: No session token found');
            redirectTo = '/login';
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

            console.log(cookies().get('sessionToken'));
            cookies().delete('sessionToken');

            redirectTo = '/login';
        } else if (data.status === 400) {
            console.error('Error: Bad request');

            if (retries && retries > 0) {
                return getUserData(3 - retries);
            }

            redirectTo = '/login';
        } else if (data.status === 401) {
            console.log("Guest account");
        } else if (data.status === 500) {
            console.error('Error: An error occurred. Please try again later.');
            redirectTo = '/login';
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
    } finally {
        if (redirectTo !== '') {
            redirect(redirectTo);
        }
    }
}
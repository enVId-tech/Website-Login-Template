import { redirect } from "next/navigation";
import { UserData } from "./interfaces";

export default async function getUserData(): Promise<UserData[] | null | undefined> {
    try {
        const response: Response = await fetch('http://localhost:3000/api/user/data', 
            { 
                method: "POST", 
                credentials: 'include',
                headers: {
                    'Content-Type': 'plain/text',
                },
                cache: 'no-store',
            }
        );
        
        if (response.status === 404) {
            console.error('Error: No user data found');
            redirect('/login');
        } else if (response.status === 400) {
            console.error('Error: Bad request');
            redirect('/login');
        } else if (response.status === 401) {
            console.log("Guest account");
            return
        } else if (response.status === 500) {
            console.error('Error: An error occurred. Please try again later.');
            redirect('/login');
        }

        const result: UserData[] | null | undefined = await response.json();

        if (!result || result === null) {
            console.error(result);
            console.error('Error: No data found');
            return null;
        }

        return result;
    } catch (error: unknown) {
        console.error('Error:', error);
    }

    return;
}
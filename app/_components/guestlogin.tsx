"use client";
import React from "react";

interface LoginData {
    status: number;
    message: string;
}

export function GuestLoginComponent(): React.JSX.Element {
    const guestLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const jsonData = {
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json',
            },
            "body": JSON.stringify({
                "username": "guest",
                "password": ""
            })
        }

        try {
            const response: Response = await fetch('http://localhost:3000/api/auth/login/guest', jsonData);

            const data: LoginData = await response.json();

            if (data.status === 200) {
                console.log('Login successful!');
                window.location.href = "/";
            } else if (data.status === 404) {
                console.error('Login failed:', data.message);
            }
        } catch (error: unknown) {
            console.error('Error:', error as string);
        }
    }

    return (
        <form onSubmit={(e) => guestLogin(e)}>
            <button type="submit">Guest Login</button>
        </form>
    )
}
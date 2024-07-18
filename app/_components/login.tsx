"use client";

import { redirect } from "next/navigation";
import React from "react";

interface LoginData {
    status: number;
    message: string;
}

async function loginToAccount(username: HTMLInputElement, password: HTMLInputElement): Promise<void> {
    const jsonData: object = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "username": username.value,
            "password": password.value
        })
    }

    try {
        const response: Response = await fetch('http://localhost:3000/api/auth/login', jsonData);
        const data: LoginData = await response.json();

        if (data.status === 200) {
            // console.log('Login successful!');
            redirect('/');
        } else if (data.status === 404) {
            console.error('User not found:', data.message);
            alert('User not found. Please try again.');
        } else if (data.status === 401) {
            alert('Incorrect password. Please try again.');
        } else {
            console.error('Login failed:', data.message);
            alert('Login failed. Please try again.');
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
}

export function LoginComponent(): React.ReactElement {
    const username = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);

    return (
        <form onSubmit={(e) => { e.preventDefault(); loginToAccount(username.current!, password.current!); }}>
            <input type="text" placeholder="Email" ref={username} />
            <input type="password" placeholder="Password" autoComplete='current-password' ref={password} />

            <button type="submit">Login</button>
        </form>
    );
}
"use client";

import React from "react";

interface LoginData {
    status: number;
    message: string;
}

export function LoginComponent(): React.JSX.Element {
    const username = React.useRef<HTMLInputElement>(null);
    const password = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (document.cookie.includes('session')) {
            window.location.href = '/';
        }
    }, []);

    const loginToAccount = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const jsonData: object = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "username": username.current?.value,
                "password": password.current?.value
            })
        }
    
        try {
            const response: Response = await fetch('http://localhost:3000/api/auth/login', jsonData);
            const data: LoginData = await response.json();
    
            if (data.status === 200) {
                console.log('Login successful!');
                window.location.href = '/';
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

    return (
        <form onSubmit={(e) => loginToAccount(e)}>
            <input type="text" placeholder="Email" ref={username} />
            <input type="password" placeholder="Password" autoComplete='current-password' ref={password} />

            <button type="submit">Login</button>
        </form>
    );
}
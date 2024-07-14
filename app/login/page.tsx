import RootLayout from "@/app/_components/layout.tsx";
import { redirect } from "next/navigation";
import React from "react";

interface LoginData {
    status: number;
    message: string;
}

async function guestLogin(): Promise<void> {
    try {
        const response: Response = await fetch('/login/guest', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            "cache": "no-store"
        });

        if (response.status === 200) {
            // console.log('Login successful!');
            window.location.href = '/';
        } else {
            console.error('Login failed:', response.statusText);
            alert('Login failed. Please try again.');
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
}

function googleLogin(): void {
    redirect('/auth/google');
}

async function loginToAccount(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

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
        const response: Response = await fetch('/login/user', jsonData);
        const data: LoginData = await response.json();

        if (data.status === 200) {
            // console.log('Login successful!');
            window.location.href = '/';
        } else if (data.status === 404) {
            console.error('User not found:', data.message);
            alert('User not found. Please try again.');
        } else if (data.status === 401) {
            console.error('Incorrect password:', data.message);
            alert('Incorrect password. Please try again.');
        } else {
            console.error('Login failed:', data.message);
            alert('Login failed. Please try again.');
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
};

export default async function Login(): Promise<React.JSX.Element> {
    return (
        <RootLayout>
            <section id="login">
                <div id="container">
                    <div id="regLogin">
                        <h1>Login</h1>

                        <form onSubmit={loginToAccount}>
                            <input id="username" type="text" placeholder="Email" />
                            <input id="password" type="password" placeholder="Password" autoComplete='current-password' />

                            <button type="submit">Login</button>
                        </form>

                        <hr />

                        <button onClick={() => googleLogin}>Register/Sign In with Google</button>

                        <hr />

                        <button onClick={() => guestLogin}>Continue as Guest</button>
                    </div>
                </div>
            </section>
        </RootLayout>
    )
}
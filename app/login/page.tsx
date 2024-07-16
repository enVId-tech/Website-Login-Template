import RootLayout from "@/app/_components/layout.tsx";
import { redirect } from "next/navigation";
import React from "react";
import { LoginComponent } from "../_components/login";

interface LoginData {
    status: number;
    message: string;
}

async function guestLogin(): Promise<void> {
    "use server";
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

async function googleLogin(): Promise<void> {
    "use server";
    redirect('/auth/google');
}

export default async function Login(): Promise<React.JSX.Element> {
    return (
        <RootLayout>
            <section id="login">
                <div id="container">
                    <div id="regLogin">
                        <h1>Login</h1>

                        <LoginComponent />

                        <hr />

                        <form action={googleLogin}>
                            <button>Register/Sign In with Google</button>
                        </form>
                        <hr />

                        <form action={guestLogin}>
                            <button>Continue as Guest</button>
                        </form>
                    </div>
                </div>
            </section>
        </RootLayout>
    )
}
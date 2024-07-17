import RootLayout from "@/app/_components/layout.tsx";
import { redirect } from "next/navigation";
import React from "react";
import { LoginComponent } from "../_components/login";
import styles from "@/styles/login.module.scss";

interface LoginData {
    status: number;
    message: string;
}

async function guestLogin(): Promise<void> {
    "use server";
    try {
        const response: Response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            "cache": "no-store"
        });

        if (response.status === 200) {
            // console.log('Login successful!');
            redirect('/');
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
            <section className={styles.login}>
                <div className={styles.container}>
                    <div className={styles.regLogin}>
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
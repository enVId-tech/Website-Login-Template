import RootLayout from "@/app/_components/layout.tsx";
import { redirect } from "next/navigation";
import React from "react";
import { LoginComponent } from "../_components/login";
import styles from "@/styles/login.module.scss";
import { cookies } from "next/headers";
import { get } from "http";

interface LoginData {
    status: number;
    message: string;
}

function getCookie(name: string): string | null {
    return cookies().get(name)?.value ?? '';
}

async function guestLogin(): Promise<void> {
    "use server";
    let redirectTo: string = '';

    const jsonData = {
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response: Response = await fetch('http://localhost:3000/api/auth/login/guest', jsonData);

        const data: LoginData = await response.json();

        if (data.status === 200) {
            console.log('Login successful!');
            redirectTo = "/"
        } else if (data.status === 404) {
            console.error('Login failed:', data.message);
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    } finally {
        if (redirectTo !== '') {
            redirect(redirectTo);
        }
    }
}

async function googleLogin(): Promise<void> {
    "use server";
    redirect('/register');
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
                            <button>Register</button>
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
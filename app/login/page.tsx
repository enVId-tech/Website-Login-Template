import { redirect } from "next/navigation";
import React from "react";
import { LoginComponent } from "../_components/login";
import styles from "@/styles/login.module.scss";
import { cookies } from "next/headers";
import { GuestLoginComponent } from "../_components/guestlogin";

async function googleLogin(): Promise<void> {
    "use server";
    redirect('/register');
}

export default async function Login(): Promise<React.JSX.Element> {
    const cookie: string | null = (await cookies()).get('sessionToken')?.value ?? '';

    if (cookie) {
        redirect('/');
    }

    return (
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

                    <GuestLoginComponent />
                </div>
            </div>
        </section>
    )
}
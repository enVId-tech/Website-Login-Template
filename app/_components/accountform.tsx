"use client";

import React from "react";
import styles from "@/styles/account.module.scss";
import { UserData } from "../api/modules/interfaces";

async function setPassword(passwordRef: React.RefObject<HTMLInputElement>, confirmPasswordRef: React.RefObject<HTMLInputElement>): Promise<void> {
    try {
        const password: string = passwordRef.current?.value as string;
        const confirmPassword: string = confirmPasswordRef.current?.value as string;

        if (password === "" || confirmPassword === "") {
            alert('Please fill out all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const dataJson = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "password": password
            })
        }

        const response = await fetch('/post/password', { ...dataJson, "credentials": "include" });
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
}

export default function AccountForm(): React.JSX.Element {
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

    const [data, setData] = React.useState<UserData | null>(null);

    React.useEffect(() => {
        async function fetchData(): Promise<void> {
            const response = await fetch('/api/user/data', { "method": "POST", "credentials": "include" });
            const data = await response.json();

            if (data.status === 404) {
                console.error('Error: No user data found');
                return;
            } else if (data.status === 400) {
                console.error('Error: Bad request');
                return;
            } else if (data.status === 401) {
                console.log("Guest account");
                return;
            } else if (data.status === 500) {
                console.error('Error: An error occurred. Please try again later.');
                return;
            }

            if (!data || data === null) {
                console.error(data);
                console.error('Error: No data found');
                return;
            }

            setData(data.data);
        }

        fetchData();
    }, []);

    return (
        data === null ? <h1>Loading...</h1> :
            <form className={styles.info} action={() => setPassword(passwordRef, confirmPasswordRef)}>
                <h2>Username: {data!.displayName}</h2>
                <h2>Email: {data!.email}</h2>
                <input type='password' placeholder='Password' ref={passwordRef} />
                <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />
                <button type="submit">Change Password</button>
            </form>
    )
}
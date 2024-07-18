"use client";

import React from "react";
import styles from "@/styles/account.module.scss";
import { UserData } from "../api/interfaces";

async function setPassword(): Promise<void> {

}

export default function AccountPage(): React.JSX.Element {
    const [data, setData] = React.useState<UserData | null>(null);

    React.useEffect(() => {
        "use server";
    }, []);

    return (
        data === null ? <h1>Loading...</h1> :
            <form className={styles.info} action={setPassword}>
                <h2>Username: {data!.displayName}</h2>
                <h2>Email: {data!.email}</h2>
                <input type='password' placeholder='Password' />
                <input type='password' placeholder='Confirm Password' />
                <button type="submit">Change Password</button>
            </form>
    )
}
import React from "react";
import styles from "@/styles/sidebar.module.scss";
import getUserData from "@/app/api/getUserData.ts";
import { type UserData } from "@/app/api/modules/interfaces";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function account(): Promise<void> {
    "use server";
    if (await getUserData() === null) {
        redirect('/login');
    } else if (await getUserData() === undefined) {
        return;
    }

    redirect('/account');
}

function getCookie(name: string): string | null {
    return cookies().get(name)?.value ?? '';
}

export default async function Sidebar(): Promise<React.JSX.Element> {
    const sessionToken: string | null = await getCookie('sessionToken');

    let setData: UserData | undefined | null = await getUserData();

    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <img src={setData?.profilePicture ? setData?.profilePicture : "https://via.placeholder.com/150"} alt="Profile Picture" />
                <h2>Logged in as <br /> {setData?.displayName}</h2>
                {
                    sessionToken === 'guest' ? null : <form action={account}>
                        <button>Account</button>
                    </form>
                }

            </div>
            <div className={styles.pages}>
                <span className="pageSelector">
                    <a href="/">
                        <h1>Home</h1>
                    </a>
                </span>
                <span className="pageSelector">
                    <a href="/ex_1">
                        <h1>Ex. Page 1</h1>
                    </a>
                </span>
                <span className="pageSelector">
                    <a href='/logout'>
                        <h1>Logout</h1>
                    </a>
                </span>
            </div>
        </div>
    )
}
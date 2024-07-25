import React from "react";
import styles from "@/styles/sidebar.module.scss";
import getUserData from "@/app/api/getUserData.ts";
import { type UserData } from "@/app/api/modules/interfaces";
import { redirect } from "next/navigation";

async function account(): Promise<void> {
    if (await getUserData() === null) {
        redirect('/login');
    } else if (await getUserData() === undefined) {
        alert('Guest accounts cannot access this page. Please login.');
        return;
    }

    redirect('/account');
}

export default async function Sidebar(): Promise<React.JSX.Element> {
    let setData: UserData | undefined | null = await getUserData();

    if (!setData) {
        setData = {
            firstName: "Guest",
            lastName: null,
            email: "guest@localhost",
            profilePicture: "https://via.placeholder.com/150",
            displayName: "Guest",
            hd: null,
        }
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <img src={setData?.profilePicture ? setData?.profilePicture : "https://via.placeholder.com/150"} alt="Profile Picture" />
                <h2>Logged in as <br /> {setData?.displayName}</h2>
                <form action={account()}>
                    <button>Account</button>
                </form>
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
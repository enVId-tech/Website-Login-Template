import React from "react";
import styles from "@/styles/sidebar.module.scss";
import getUserData from "@/app/api/getUserData.ts";
import { type UserData } from "@/app/api/modules/interfaces";
import { redirect } from "next/navigation";

async function account(): Promise<void> {
    "use server";
    if (await getUserData() === null) {
        redirect('/login');
    } else if (await getUserData() === undefined) {
        alert('Guest accounts cannot access this page. Please login.');
        return;
    }

    redirect('/account');
}

function getData(): UserData | undefined {
    getUserData().then((data: UserData | null | undefined) => {
        return data;
    }).catch((error: unknown) => {
        console.error('Error:', error)
        return undefined;
    });

    return undefined;
}

export default function Sidebar(): React.JSX.Element {
    const data: UserData | undefined = getData();

    console.log(data);

    let setData = {};

    if (!data) {
        console.error('Guest account');
        setData = {
            firstName: 'Guest',
            lastName: 'Account',
            email: '',
            profilePicture: '',
            displayName: 'Guest Account',
            hd: '',
        }
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <img src={data?.profilePicture ? data?.profilePicture : "https://via.placeholder.com/150"} alt="Profile Picture" />
                <h2>Logged in as <br /> {data?.displayName}</h2>
                <form action={account}>
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
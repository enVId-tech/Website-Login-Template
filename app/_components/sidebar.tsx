import React from "react";
import styles from "@/styles/sidebar.module.scss";
import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/interfaces.ts";
import { redirect } from "next/navigation";
import { Button } from 'react-bootstrap';

async function account(): Promise<void> {
    if (await getUserData() === null) {
        redirect('/login');
    } else if (await getUserData() === undefined) {
        alert('Guest accounts cannot access this page. Please login.');
        return;
    }

    redirect('/account');
}

function getData(): UserData | undefined {
    getUserData().then((data: UserData[] | null | undefined) => {
        return data ? data[0] : undefined;
    }).catch((error: unknown) => {
        console.error('Error:', error)
        return undefined;
    });

    return undefined;
}

export default function Sidebar(): React.JSX.Element {
    const data: UserData | undefined = getData();

    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <img src={data?.profilePicture ? data?.profilePicture : "https://via.placeholder.com/150"} alt="Profile Picture" />
                <h2>Logged in as <br /> {data?.firstName}</h2>
                <Button>Account</Button>
            </div>
            <div className={styles.pages}>
                <span className="pageSelector">
                    <a href="/">
                        <h1>Home</h1>
                    </a>
                </span>

                <span className="pageSelector">
                    <a href="/calendar">
                        <h1>Calendar</h1>
                    </a>
                </span>

                <span className="pageSelector">
                    <a href="/events">
                        <h1>Events</h1>
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
import RootLayout from "@/app/_components/layout.tsx";
import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/modules/interfaces";
import styles from '@/styles/home.module.scss';
import Sidebar from "../_components/sidebar";
import React from "react";

interface HomeData {
    firstName: string;
    lastName: string | null;
    email: string;
    profilePicture: string;
    displayName: string;
    hd: string | null;
}

export default async function Home(): Promise<React.JSX.Element> {
    let data: UserData | undefined | null = await getUserData();

    console.log(data);

    return (
        <RootLayout>
            <section className={styles.home}>
                <Sidebar />
                <div className={styles.container}>
                    <h1>Welcome, {data?.displayName}!</h1>
                </div>
            </section>
        </RootLayout>
    )
}
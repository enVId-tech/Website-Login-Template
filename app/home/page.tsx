"use client";
import RootLayout from "@/app/_components/layout.tsx";
import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/modules/interfaces";
import { redirect } from 'next/navigation';
import styles from '@/assets/styles/home.module.scss';
import Sidebar from "../_components/sidebar";
import React from "react";

interface HomeData {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    displayName: string;
    hd: string;
}

export default async function Home(): Promise<React.JSX.Element> {
    const [data, setData] = React.useState<HomeData | undefined>();

    React.useEffect(() => {
        const data = (): void => {
            getUserData().then((data: UserData | null | undefined) => {
                if (!data) {
                    console.error('Guest account');
                    setData({
                        firstName: 'Guest',
                        lastName: 'Account',
                        email: '',
                        profilePicture: '',
                        displayName: 'Guest Account',
                        hd: '',
                    })
                } else {
                    setData(data);
                }
            }).catch((error: unknown) => {
                console.error('Error:', error)
            });
        }

        data();
    }, []);

    return (
        <RootLayout>
            <section id="home">
                <Sidebar />
                <div id="container">
                    <h1>Welcome, {data?.displayName}!</h1>
                </div>
            </section>
        </RootLayout>
    )
}
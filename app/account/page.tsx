import React from 'react';
import RootLayout from '@/app/_components/layout.tsx';
import Sidebar from '@/app/_components/sidebar.tsx';
import styles from '@/styles/account.module.scss';
import { UserData } from '@/app/api/modules/interfaces';
import getUserData from '@/app/api/getUserData.ts';
import AccountForm from '@/app/_components/accountform';
import { redirect } from 'next/navigation';
import DeleteForm from '../_components/deleteform';
import { cookies } from 'next/headers';

async function logout(): Promise<void> {
    "use server";
    redirect('/logout');
}

async function deleteAccount(): Promise<void> {
    "use server";
    try {
        if (!confirm('Are you sure you want to delete your account?')) {
            return;
        }

        const response = await fetch('http://localhost:3000/api/user/delete', { "method": "POST", "credentials": "include" });

        if (response.status === 401) {
            alert('You must be logged in to delete your account');
            return;
        } else if (response.status === 500) {
            alert('An error occurred. Please try again later.');
            return;
        } else if (response.status === 404) {
            alert('No account found');
            return;
        } else {
            cookies().delete("sessionToken");
            redirect('/login');
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
}

export default async function AccountPage(): Promise<React.JSX.Element> {
    let data: UserData | undefined | null = await getUserData();

    return (
        <RootLayout>
            <section className={styles.account}>
                <Sidebar />
                <div className={styles.container}>
                    <h1>Account</h1>
                    <AccountForm />

                    <div className={styles.other}>
                        <h1 id="main">Other</h1>
                        <form action={logout}>
                            <button>Logout</button>
                        </form>

                        <DeleteForm />
                    </div>
                </div>
            </section>
        </RootLayout>
    )
}
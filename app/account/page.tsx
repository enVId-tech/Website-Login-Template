import React from 'react';
import RootLayout from '@/app/_components/layout.tsx';
import Sidebar from '@/app/_components/sidebar.tsx';
import styles from '@/styles/account.module.scss';
import AccountForm from '@/app/_components/accountform';
import { redirect } from 'next/navigation';
import DeleteForm from '../_components/deleteform';
import { cookies } from 'next/headers';

async function logout(): Promise<void> {
    "use server";
    redirect('/logout');
}

function getCookie(name: string): string | null {
    return cookies().get(name)?.value ?? '';
}

export default async function AccountPage(): Promise<React.JSX.Element> {
    const sessionToken: string | null = await getCookie('sessionToken');

    if (!sessionToken || sessionToken === '') {
        redirect('/login');
    }

    if (sessionToken === 'guest') {
        redirect('/');
    }

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
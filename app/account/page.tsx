import React from 'react';
import RootLayout from '@/app/_components/layout.tsx';
import Sidebar from '@/app/_components/sidebar.tsx';
import styles from '@/styles/account.module.scss';
import { UserData } from '@/app/api/interfaces.ts';
import getUserData from '@/app/api/getUserData.ts';
import { redirect } from 'next/navigation';

const data: any = getUserData();

function getData(): UserData | undefined {
    getUserData().then((data: UserData[] | null | undefined) => {
        return data ? data[0] : undefined;
    }).catch((error: unknown) => {
        console.error('Error:', error)
        return undefined;
    });

    return undefined;
}

async function logout(): Promise<void> {
    "use server";
    try {
        const response = await fetch('/api/auth/logout', { "method": "POST", "credentials": "include" });
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        } else {
            redirect('/login');
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
}

async function deleteAccount(): Promise<void> {
    "use server";
    try {
        if (!confirm('Are you sure you want to delete your account?')) {
            return;
        }

        const response = await fetch('/post/delete', { "method": "POST", "credentials": "include" });

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
            window.location.href = '/login';
        }
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
}

async function setPassword(): Promise<void> {
    "use server";
    try {
        const password: string = "e"; // passwordRef.current?.value as string;
        const confirmPassword: string = "e" // confirmPasswordRef.current?.value as string;

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

export default function AccountPage(): React.JSX.Element {
    return (
        <RootLayout>
            <section className={styles.account}>
                <Sidebar />
                <div className={styles.container}>
                    <h1>Account</h1>
                    <form className={styles.info} action={setPassword}>
                        <h2>Username: {data?.displayName}</h2>
                        <h2>Email: {data?.email}</h2>
                        <input type='password' placeholder='Password' />
                        <input type='password' placeholder='Confirm Password' />
                        <button type="submit">Change Password</button>
                    </form>

                    <div className={styles.other}>
                        <h1 id="main">Other</h1>
                        <form action={logout}>
                            <button>Logout</button>
                        </form>

                        <form action={deleteAccount}>
                            <button className={styles.delete}>Delete Account</button>
                        </form>    
                    </div>
                </div>
            </section>
        </RootLayout>
    )
}
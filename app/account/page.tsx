import React from 'react';
import RootLayout from '@/app/_components/layout.tsx';
import Sidebar from '@/app/_components/sidebar.tsx';
import styles from '@/styles/account.module.scss';

export default function AccountPage(): React.JSX.Element {
    return (
        <RootLayout>
        <section className={styles.account}>
            <Sidebar />
            <div className={styles.container}>
                <h1>Account</h1>
                <div className={styles.info}>
                    <h2>Username: {data?.displayName}</h2>
                    <h2>Email: {data?.email}</h2>
                    <input type='password' placeholder='Password' ref={passwordRef} />
                    <input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />
                    <button onClick={() => setPassword()}>Change Password</button>
                </div>

                <div className={styles.other}>
                    <h1 id="main">Other</h1>
                    <button onClick={() => logout()}>Logout</button>
                    <button className={styles.delete} onClick={() => deleteAccount()}>Delete Account</button>
                </div>
            </div>
        </section>
        </RootLayout>
    )
}
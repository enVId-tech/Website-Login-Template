import styles from '@/styles/register-user.module.scss';
import { Work_Sans } from 'next/font/google';
import React from 'react';

const Work_Sans500 = Work_Sans({
    weight: "500",
    subsets: ["latin"],
})

export default function RegisterUserPage(): React.JSX.Element {
    return (
        <div className={styles.registerUserPage}>
            <div className={styles.container}>
                <h1 className={Work_Sans500.className}>Register User</h1>
                <form>
                    <label htmlFor="username" className={Work_Sans500.className}>Username</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="email" className={Work_Sans500.className}>Email</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="password" className={Work_Sans500.className}>Password</label>
                    <input type="password" id="password" name="password" required />
                    <label htmlFor="confirmPassword" className={Work_Sans500.className}>Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                    <button className={Work_Sans500.className}>Register</button>
                </form>
            </div>
        </div>
    );
}
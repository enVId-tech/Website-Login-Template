"use client";

import styles from '@/styles/register-user.module.scss';
import { Work_Sans } from 'next/font/google';
import { redirect } from 'next/navigation';
import React from 'react';

const Work_Sans500 = Work_Sans({
    weight: "500",
    subsets: ["latin"],
})

export default function RegisterUserPage(): React.JSX.Element {
    const usernameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        registerUser();
    }

    const registerUser = async (): Promise<void> => {
        const username: string = usernameRef.current?.value as string;
        const email: string = emailRef.current?.value as string;
        const password: string = passwordRef.current?.value as string;
        const confirmPassword: string = confirmPasswordRef.current?.value as string;

        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert('Please fill out all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const response: Response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "confirmPassword": confirmPassword,
            }),
        });

        if (response.status === 200) {
            alert('User registration successful');
            window.location.href = '/login';
        } else {
            alert('User registration failed');
        }
    }

    return (
        <div className={styles.registerUserPage}>
            <div className={styles.container}>
                <h1 className={Work_Sans500.className}>Register User</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="username" className={Work_Sans500.className}>Username</label>
                    <input type="text" id="username" name="username" ref={usernameRef} required />
                    <label htmlFor="email" className={Work_Sans500.className}>Email</label>
                    <input type="email" id="email" name="email" ref={emailRef} required />
                    <label htmlFor="password" className={Work_Sans500.className}>Password</label>
                    <input type="password" id="password" name="password" ref={passwordRef} required />
                    <label htmlFor="confirmPassword" className={Work_Sans500.className}>Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" ref={confirmPasswordRef} required />
                    <button className={Work_Sans500.className}>Register</button>
                </form>
            </div>
        </div>
    );
}
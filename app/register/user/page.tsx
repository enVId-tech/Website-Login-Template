"use client";

import styles from '@/styles/register-user.module.scss';
import { Work_Sans } from 'next/font/google';
import React from 'react';

const Work_Sans500 = Work_Sans({
    weight: "500",
    subsets: ["latin"],
})

interface RegisterUserProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function registerUser({ username, email, password, confirmPassword }: RegisterUserProps): void {
    "use server";
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    }).then((response: Response) => {
        if (response.status === 200) {
            alert('User registered successfully');
        } else {
            alert('User registration failed');
        }
    }).catch((error: unknown) => {
        console.error('Error:', error);
    });
}

export default function RegisterUserPage(): React.JSX.Element {
    const usernameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        registerUser({
            username: usernameRef.current?.value as string,
            email: emailRef.current?.value as string,
            password: passwordRef.current?.value as string,
            confirmPassword: confirmPasswordRef.current?.value as string,
        });
    }

    return (
        <div className={styles.registerUserPage}>
            <div className={styles.container}>
                <h1 className={Work_Sans500.className}>Register User</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
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
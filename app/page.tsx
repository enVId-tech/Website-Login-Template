"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

export default async function HomePageRedirect(): Promise<React.JSX.Element> {
    if (cookies().get('sessionToken')?.value) {
        redirect('/home');
    } else {
        redirect('/login');
    }

    return (
        <h1>Redirecting...</h1>
    );
}
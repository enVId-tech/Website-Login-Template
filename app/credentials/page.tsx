import { redirect } from 'next/navigation';
import React from 'react';

export default async function CredentialsRedirect() {
    redirect('/credentials/login');
    
    return (
        <section id="credentialsRedirect">
            <div id="container">
                <h1>Redirecting...</h1>
            </div>
        </section>
    )
}
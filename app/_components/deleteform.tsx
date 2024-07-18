import React from "react";
import styles from "@/styles/account.module.scss";

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
        }

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        alert('Account deleted successfully');
    } catch (error: unknown) {
        console.error('Error:', error as string);
    }
}

export default function DeleteForm(): React.JSX.Element {
    return (
        <form className={styles.info} action={deleteAccount}>
            <h2>Delete Account</h2>
            <button>Delete Account</button>
        </form>
    )
}
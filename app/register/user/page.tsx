import styles from '@/styles/register-user.module.scss';
import React from 'react';

export default function RegisterUserPage(): React.JSX.Element {
    return (
        <div className={styles.registerUserPage}>
            <div className={styles.container}>
                <h1>Register User</h1>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                    <button>Register</button>
                </form>
            </div>
        </div>
    );
}
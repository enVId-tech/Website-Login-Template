import styles from '@/styles/register.module.scss';
import { Work_Sans } from 'next/font/google';
import React from 'react';

const Work_Sans500 = Work_Sans({
    weight: "500",
    subsets: ["latin"],
})

export default function Register(): React.JSX.Element {
    return (
        <div className={styles.register}>
            <div className={styles.container}>
                <div className={styles.choose}>
                    <h1 className={Work_Sans500.className}>Register</h1>
                    <p className={Work_Sans500.className}>Choose an option to register</p>

                    <form action='/register/user'>
                        <button>User</button>
                    </form>

                    <form action='/auth/google'>
                        <button>Google</button>
                    </form>

                    <form action='/login'>
                        <button>Back</button>
                    </form>
                </div>
            </div>
       </div>
    );
}
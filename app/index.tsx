import React from "react";
import Head from "next/head";
import styles from '@/styles/home.module.scss';const HomePage: React.FC = (): React.JSX.Element => {
    return (
        <div className={styles.homePageMainDiv}>
            <Head>
                <title>Template - Template</title>
            </Head>
        </div>
    );
};

export default HomePage;
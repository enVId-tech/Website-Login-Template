/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '../../assets/scss/homepage.scss';
import { UserData } from '@/components/ts/interfaces.ts';
import getUserData from '@/components/ts/getUserData.ts';
import Sidebar from '@/templates/sidebar.tsx';

const HomePage: React.FC = (): React.JSX.Element => {
    const [data, setData] = React.useState<UserData | null | undefined>();

    const userData = async (): Promise<void> => {
        try {
            const userData: UserData[] | null | undefined = await getUserData();

            if (userData === null) {
                window.location.href = '/login';
                return;
            }

            if (userData === undefined) {
                console.error('Guest account');
                setData({
                    firstName: 'Guest',
                    lastName: 'Account',
                    email: '',
                    profilePicture: '',
                    displayName: 'Guest Account',
                    hd: '',
                })
                return;
            }

            setData(userData![0]);
        } catch (error: unknown) {
            console.error('Error:', error as string);
        }
    }

    React.useEffect(() => {
        try {
            userData();
        } catch (error: unknown) {
            console.error('Error:', error as string);
        }
    }, []);

    return (
        <section id="home">
            <Sidebar />
            <div id="container">
                <h1>Welcome, {data?.displayName}!</h1>
            </div>
        </section>
    )
}

export default HomePage;
import RootLayout from "@/app/_components/layout.tsx";
import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/interfaces.ts";
import { redirect } from 'next/navigation';
import styles from '@/assets/styles/home.module.scss';

interface HomeData {
    error: string;
    displayName: string;
}

async function userData(): Promise<HomeData | undefined> {
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

export default async function Home(): Promise<React.JSX.Element> {
    const data: HomeData | undefined = await userData();

    if (!data) {
        return <RootLayout>
            <section id="home">
                <div id="container">
                    <h1>Welcome, Guest Account!</h1>
                </div>
            </section>
        </RootLayout>
    }

    return (
        <RootLayout>
            <section id="home">
                <div id="container">
                    <h1>Welcome, {data?.displayName}!</h1>
                </div>
            </section>
        </RootLayout>
    )
}

function setData(arg0: UserData) {
    throw new Error("Function not implemented.");
}
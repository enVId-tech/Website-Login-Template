import RootLayout from "@/app/_components/layout.tsx";
import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/interfaces.ts";
import styles from '@/styles/logout.module.scss';

interface LogoutData {
    error: string;
}

async function handleLogout(): Promise<void> {
    const response: Response = await fetch("/credentials/logout", { "method": "POST", "credentials": "include" });
    const data: LogoutData = await response.json();

    if (data.error) {
        alert(data.error);
        window.location.href = "/login";
    } else {
        window.location.href = "/";
    }
}

function handleCancel(): void {
    window.location.href = "/";
}

export default async function Logout(): Promise<React.JSX.Element> {
    await getUserData();

    return (
        <RootLayout>
            <section id="logout">
                <div id="container">
                    <h1>Logout</h1>
                    <p>Are you sure you want to logout?</p>
                    <button onClick={() => handleLogout()}>Yes</button>
                    <button onClick={() => handleCancel()}>No</button>
                </div>
            </section>
        </RootLayout>
    )
}
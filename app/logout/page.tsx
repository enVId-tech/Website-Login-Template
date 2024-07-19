import RootLayout from "@/app/_components/layout.tsx";
import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/modules/interfaces";
import styles from '@/styles/logout.module.scss';
import { redirect } from "next/navigation";

interface LogoutData {
    error: string;
}

async function handleLogout(): Promise<void> {
    "use server";
    const response: Response = await fetch("http://localhost:3000/api/auth/logout", { "method": "POST", "credentials": "include" });
    const data: LogoutData = await response.json();

    if (data.error) {
        alert(data.error);
        redirect("/home");
    }
    
    redirect("/login");
}

async function handleCancel(): Promise<void> {
    "use server";
    redirect("/");
}

export default async function Logout(): Promise<React.JSX.Element> {
    await getUserData();

    return (
        <RootLayout>
            <section className={styles.logout}>
                <div className={styles.container}>
                    <h1>Logout</h1>
                    <p>Are you sure you want to logout?</p>

                    <form action={handleLogout}>
                        <button>Yes</button>
                    </form>

                    <form action={handleCancel}>
                        <button>No</button>
                    </form>
                </div>
            </section>
        </RootLayout>
    )
}
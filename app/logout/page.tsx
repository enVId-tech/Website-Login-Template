import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/modules/interfaces";
import styles from '@/styles/logout.module.scss';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LogoutData {
    error: string;
}
async function getCookie(name: string): Promise<string | null> {
    return (await cookies()).get(name)?.value ?? '';
}

async function handleLogout(): Promise<void> {
    "use server";
    const cookie: string | null = await getCookie('sessionToken');

    if (!cookie) {
        console.error('Error: No session token found');
        redirect('/login');
    }

    const response: Response = await fetch("http://localhost:3000/api/auth/logout",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `sessionToken=${cookie}`
            },
            cache: "no-store",
        }
    );


    const data: LogoutData = await response.json();

    if (data.error) {
        alert(data.error);
        redirect("/home");
    }

    (await cookies()).delete("sessionToken");
    redirect("/login");
}

async function handleCancel(): Promise<void> {
    "use server";
    redirect("/");
}

export default async function Logout(): Promise<React.JSX.Element> {
    await getUserData();

    return (
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
    )
}
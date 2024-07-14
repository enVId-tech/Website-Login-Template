import RootLayout from "@/app/_components/layout.tsx";
import getUserData from "@/app/api/getUserData.ts";
import { UserData } from "@/app/api/interfaces.ts";
import { redirect } from 'next/navigation';

const Home = async () => {
    // const data: any = await getData();
    const data: UserData[] | null | undefined = await getUserData();

    if (data === null || !data) {
        redirect('/login');
    }

    return (
        <RootLayout>
            <section id="home">
                <div>
                    <h1>Home Page</h1>
                    <p>Static Data: {}</p>
                </div>
            </section>
        </RootLayout>
    );
};

export default Home;

// import RootLayout from '@/pages/layout.tsx';

type HomeProps = {
    staticData: string;
};

async function getData(): Promise<string> {
    const res = await fetch('/api/realtime');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Home = async () => {
    const data: string | null = await getData();
    
    return (
        // <RootLayout>
            <div>
                <h1>Home Page</h1>
                <p>Static Data: {data}</p>
            </div>
        // </RootLayout>
    );
};

export default Home;

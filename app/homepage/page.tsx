// import RootLayout from '@/pages/layout.tsx';
import dotenv from 'dotenv';
import handler from '../api/realtime/page';
dotenv.config({ path: '@/app/api/environment.local.env' });
async function getData(): Promise<string | null> {
    try {
        const response = await fetch('http://localhost:3000/api/realtime');
        const data = await response.json();
        return data.timestamp;
    } catch (error) {
        console.error('Failed to fetch real-time data:', error);
        return null;
    }
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

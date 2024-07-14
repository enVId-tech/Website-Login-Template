import RootLayout from "@/app_template/layout";

// import RootLayout from '@/pages/layout.tsx';
async function getData() {
    try {
        const response: Response | null = await fetch('http://localhost:3000/api/realtime', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        const data: string = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch real-time data:', error);
        return null;
    }
}

const Home = async () => {
    const data: any = await getData();
    
    return (
        <RootLayout>
            <div>
                <h1>Home Page</h1>
                <p>Static Data: {data}</p>
            </div>
        </RootLayout>
    );
};

export default Home;

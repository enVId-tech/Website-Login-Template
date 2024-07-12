// import RootLayout from '@/pages/layout.tsx';

type HomeProps = {
    staticData: string;
};

const Home = ({ staticData }: HomeProps) => {
    return (
        // <RootLayout>
            <div>
                <h1>Home Page</h1>
                <p>Static Data: {staticData}</p>
            </div>
        // </RootLayout>
    );
};

export async function getServerSideProps() {
    // Simulate fetching static data
    const response = await fetch("http://localhost:3000/api/realtime");
    const users = await response.json();

    return {
        props: {
            staticData: users.timestamp,
        },
    };
}

export default Home;

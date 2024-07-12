// pages/index.tsx
import { GetStaticProps } from 'next';
import RealTimeData from '@/components/RealTimeData.tsx';
import RootLayout from '@/app/layout.tsx';

type HomeProps = {
    staticData: string;
};

const Home = ({ staticData }: HomeProps) => {
    return (
        <RootLayout>
            <div>
                <h1>Home Page</h1>
                <p>Static Data: {staticData}</p>
                <RealTimeData />
            </div>
        </RootLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    // Simulate fetching static data
    const staticData = 'This is some simulated static data fetched at build time.';

    return {
        props: {
            staticData,
        },
    };
};

export default Home;

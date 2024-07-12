import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Simulate real-time data by returning the current timestamp for testing purposes
        const realTimeData = { timestamp: new Date().toISOString() };
        res.status(200).json(realTimeData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch real-time data' });
    }
};

export default handler;
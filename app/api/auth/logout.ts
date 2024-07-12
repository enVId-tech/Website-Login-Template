import type { NextApiRequest, NextApiResponse } from 'next';
import cookieParser from 'cookie-parser';
import { Response } from 'express';

const logoutHandler = async (req: NextApiRequest, res: Response) => {
    try {
        res.clearCookie('userId');
        res.status(200).json({ status: 200, message: 'Logged out' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

export default logoutHandler;
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import EmailProvider from 'next-auth/providers/email'; // Import the function instead of the type
import GoogleProvider from 'next-auth/providers/google';
// Use mongodb adapter
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as unknown as string);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await client.connect();
  const db = client.db('mydatabase');
  const collection = db.collection('mycollection');
  const options = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as unknown as string,
        clientSecret: process.env.GOOGLE_SECRET as unknown as string,
      }),
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
    adapter: Adapters.TypeORM.Adapter(
      // The first argument should be a database connection string or TypeORM config object
      process.env.DATABASE_URL,
      // The second argument can be used to pass custom models and schemas
      {
        models: {
          User: collection,
        },
      }
    ),
  };
  return NextAuth(req, res, options);
};
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const notesCollection = db.collection('transcribed_notes');

    // Fetch all notes
    const notes = await notesCollection.find({userId}).toArray();

    res.status(200).json({ notes });
  } catch (error) {
    console.error('Fetch notes error:', error);
    res.status(500).json({
      error: 'Failed to fetch notes',
      details: (error as Error).message
    });
  }
}

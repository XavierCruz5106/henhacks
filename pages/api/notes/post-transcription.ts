import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { getAuth } from '@clerk/nextjs/server';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }


  const {userId} = getAuth(req);
  const { title, content, summary } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const transcribedNotesCollection = db.collection('transcribed_notes');

    const newNote = {
      title,
      content,
      description: summary,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await transcribedNotesCollection.insertOne(newNote);

    res.status(201).json({ message: 'Transcription saved successfully', noteId: result.insertedId });
  } catch (error) {
    console.error('Error saving transcription:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}

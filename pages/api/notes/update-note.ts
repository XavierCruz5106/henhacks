import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  try {
    const { id, title, content, description } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({ error: 'Missing required fields: id, title, and content' });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const notesCollection = db.collection('notes');

    const updateFields: any = { title, content, updatedAt: new Date() };

    // Only include description if it was provided in the request
    if (description !== undefined) {
      updateFields.description = description;
    }

    const result = await notesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );


    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({
      error: 'Failed to update note',
      details: (error as Error).message
    });
  }
}
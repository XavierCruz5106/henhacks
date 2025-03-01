import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  try {
    const { title, content, tags = [], fileId = null } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const notesCollection = db.collection('notes');

    // Create the note document
    const note = {
      title,
      content,
      tags,
      fileId: fileId ? new ObjectId(fileId) : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert the note
    const result = await notesCollection.insertOne(note);

    // Return success response with created note ID
    res.status(201).json({
      message: 'Note created successfully',
      noteId: result.insertedId,
      note: {
        _id: result.insertedId,
        ...note
      }
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      error: 'Failed to create note',
      details: (error as Error).message
    });
  }
}
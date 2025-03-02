import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { Readable } from 'stream';

// Create custom middleware to handle file uploads in Next.js
const uploadMiddleware = multer({ storage: multer.memoryStorage() });

// Disable built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to run multer with Next.js
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const bucket = new GridFSBucket(db);

    // Use multer middleware
    await runMiddleware(req, res, uploadMiddleware.single('file'));

    // Now we can access req.file safely, but we need to cast it
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a readable stream from the buffer
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null); // Mark the end of the stream

    // Create upload stream to GridFS
    const uploadStream = bucket.openUploadStream(file.originalname, {
      metadata: {
        contentType: file.mimetype,
        uploadDate: new Date(),
      }
    });

    // Pipe the readable stream to the upload stream
    const uploadPromise = new Promise<string>((resolve, reject) => {
      uploadStream.on('finish', () => {
        resolve(uploadStream.id.toString());
      });
      uploadStream.on('error', reject);
    });

    readableStream.pipe(uploadStream);
    const fileId = await uploadPromise;

    res.status(200).json({
      message: 'File uploaded successfully',
      fileId
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed', details: (error as Error).message });
  }
};

export default handler;
// pages/api/messages/fetch-messages.js

import { MongoClient } from "mongodb";
import { getAuth } from "@clerk/nextjs/server";


const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/your_db";
export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { userId } = getAuth(req);

    const {recipientId } = req.query;

    console.log(req.params)

    if (!userId || !recipientId) {
      return res.status(400).json({ error: "User ID and Recipient ID are required" });
    }

    const client = new MongoClient(uri);

    try {

      const db = client.db();
      const messages = await db.collection('messages').find({
        $or: [
          { senderId: userId, receiverId: recipientId },
          { senderId: recipientId, receiverId: userId },
        ],
      }).sort({ timestamp: 1 }).toArray();  // Sort by timestamp to get messages in the correct order

      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

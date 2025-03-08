import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { getAuth } from "@clerk/nextjs/server";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/your_db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = getAuth(req);

  const {receiverId, content } = req.body;

  if (!userId || !receiverId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const messagesCollection = db.collection("messages");

    const newMessage = {
      userId,
      receiverId,
      content,
      timestamp: new Date(),
      status: "sent"
    };

    await messagesCollection.insertOne(newMessage);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}

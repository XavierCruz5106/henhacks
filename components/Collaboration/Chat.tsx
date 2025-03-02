'use client'
import { useState, useEffect } from "react";

const Chat = ({ userId, recipientId }: { userId: string, recipientId: string }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  // Fetch messages when the component mounts or user/recipientId changes
  console.log(process.env.NEXT_PUBLIC_CLERK_KEY)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${recipientId}/fetch-message`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CLERK_KEY}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        setMessages(data.messages);  // Assuming the response returns an array of messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Only fetch messages if the recipientId is set
    if (recipientId) {
      fetchMessages();
    }
  }, [userId, recipientId]);  // This will run the fetchMessages when userId or recipientId changes

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { senderId: userId, receiverId: recipientId, content: message, timestamp: new Date(), status: "sent", userId: userId };

    try {
      const response = await fetch("/api/messages/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setMessages([...messages, { ...newMessage, timestamp: new Date() }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">Chat with User</h3>
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-md ${msg.senderId === userId ? "bg-blue-200" : "bg-gray-200"}`}>
            <p className="text-sm">{msg.content}</p>
            <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 border p-2 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

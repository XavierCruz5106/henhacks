import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Dialog from "../ui/dialog";  // Assuming Dialog component is already available
import Chat from "./Chat";  // Import the Chat component
import { Button } from "../ui/button";

const StudyBuddies = () => {
  const { user, isSignedIn } = useUser();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);  // State to handle chat modal visibility
  const [selectedUser, setSelectedUser] = useState<any>(null);  // State to store the selected user for chat

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users/get-users");
        const data = await res.json();
        console.log(data)

        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  const handleChatOpen = (recipient: any) => {
    setSelectedUser(recipient);  // Set the recipient user
    setIsChatOpen(true);  // Open the chat modal
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Users</h2>
      <ul className="space-y-2">
        {users.map((otherUser) => (
          // Skip rendering if user.id matches loggedInUserId
          otherUser.id !== user!.id && (
            <li key={otherUser.id} className="p-2 border rounded-md">
              <p className="text-lg font-semibold">{otherUser.first_name} {otherUser.last_name}</p>
              <p className="text-sm text-gray-600">{otherUser.email_addresses[0]?.email_address}</p>
              <Button
                className="mt-2 px-4 py-2 rounded-md"
                onClick={() => handleChatOpen(otherUser)}  // Pass the user to open the chat
              >
                Chat
              </Button>
            </li>
          )
        ))}
      </ul>

      {/* Chat Dialog */}
      <Dialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)}>
        {selectedUser && (
          <Chat
            userId={user!.id}
            recipientId={selectedUser.id}
          />
        )}
      </Dialog>
    </div>
  );
};

export default StudyBuddies;

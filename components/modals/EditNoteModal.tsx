import { useState } from "react";
import Dialog from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditNoteModalProps {
  note: { id: string; title: string; content: string };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedNote: { id: string; title: string; content: string }) => void;
}

export default function EditNoteModal({ note, isOpen, onClose, onSave }: EditNoteModalProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({ id: note.id, title, content });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Note">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="mb-2" />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Dialog>
  );
}

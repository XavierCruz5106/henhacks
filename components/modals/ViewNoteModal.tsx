import Dialog from "../ui/dialog";
import { Button } from "@/components/ui/button";

interface NoteModalProps {
  note: { title: string; content: string };
  isOpen: boolean;
  onClose: () => void;
}

export default function NoteModal({ note, isOpen, onClose }: NoteModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={note.title}>
      <p className="text-base">{note.content}</p>
      <div className="mt-4 flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Calendar, Edit } from "lucide-react";
import NoteModal from "../modals/ViewNoteModal";
import EditNoteModal from "../modals/EditNoteModal";

const MyNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes/get-all");
        if (!response.ok) throw new Error("Failed to fetch notes");

        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const openViewModal = (note: any) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const openEditModal = (note: any) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedNote(null);
  };

  const handleSave = (updatedNote: any) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center space-x-2">
        <Input placeholder="Search your notes..." className="flex-1" />
        <Button size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <Card key={note._id?.toString() || note.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{note.tag}</Badge>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{note.createdAt}</span>
                </div>
              </div>
              <CardTitle className="text-base">{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{note.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => openEditModal(note)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button size="sm" onClick={() => openViewModal(note)}>
                <BookOpen className="mr-2 h-4 w-4" />
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Note Modal */}
      {selectedNote && (
        <NoteModal note={selectedNote} isOpen={isViewModalOpen} onClose={closeModals} />
      )}

      {/* Edit Note Modal */}
      {selectedNote && (
        <EditNoteModal
          note={selectedNote}
          isOpen={isEditModalOpen}
          onClose={closeModals}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MyNotes;

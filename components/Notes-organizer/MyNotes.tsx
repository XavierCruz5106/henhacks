import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Calendar, Edit, Plus } from "lucide-react";
import NoteModal from "../modals/ViewNoteModal";
import EditNoteModal from "../modals/EditNoteModal";
import CreateNoteModal from "../modals/CreateNoteModal"; // Import the new modal component

const MyNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]); // State for filtered notes
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for creating a new note
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes/get-all");
      if (!response.ok) throw new Error("Failed to fetch notes");

      const data = await response.json();
      setNotes(data.notes);
      setFilteredNotes(data.notes); // Initialize filtered notes with all notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    // Filter notes based on the search query
    if (searchQuery) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes); // Reset to all notes if search query is empty
    }
  }, [searchQuery, notes]);

  function formatDate(date: Date): string {
    date = new Date(date);

    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

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
    setIsCreateModalOpen(false); // Close create modal
    setSelectedNote(null);
  };

  const handleSave = (updatedNote: any) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    fetchNotes();
  };

  const handleCreate = async (newNote: any) => {
    try {
      const response = await fetch("/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          description: newNote.description,
          tag: newNote.tag,
        }),
      });

      if (!response.ok) throw new Error("Failed to create note");

      const data = await response.json();
      setNotes((prevNotes) => [...prevNotes, data.note]);
      closeModals();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search your notes..."
          className="flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <Button size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filteredNotes.map((note) => (
          <Card key={note._id?.toString() || note.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{note.tag}</Badge>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(note.createdAt)}
                  </span>
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

      {/* Create New Note Modal */}
      <Button className="w-full" onClick={() => setIsCreateModalOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Create New Note
      </Button>
      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        onSave={handleCreate}
      />
    </div>
  );
};

export default MyNotes;

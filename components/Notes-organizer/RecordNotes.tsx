import { FileText, Mic, Download, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react";
import Dialog from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const RecordNotes = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState("")
  const recognitionRef = useRef<any>(null)
  const [notes, setNotes] = useState<
  Array<{ id: string; title: string; content: string; timestamp: string }>
  >([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<{ title: string; content: string } | null>(null)

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition. Please use Chrome or Edge.")
      return
    }

    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
      let transcript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setTranscription(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
      setIsDialogOpen(true) // Open modal after stopping
    }

    recognition.start()
    setIsRecording(true)
    recognitionRef.current = recognition
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleSaveNote = () => {
    if (!noteTitle.trim()) {
      alert("Please enter a title for the note.")
      return
    }

    const newNote = {
      id: crypto.randomUUID(), // Generate a unique ID
      title: noteTitle,
      content: transcription,
      timestamp: new Date().toISOString(),
    }

    setNotes((prevNotes) => [...prevNotes, newNote])
    setTranscription("") // Clear the transcription
    setNoteTitle("") // Clear the note title
    setIsDialogOpen(false) // Close the dialog
  }

  const handleViewNote = (note: { title: string; content: string }) => {
    setSelectedNote(note)
    setIsViewDialogOpen(true)
  }

  const handleDownloadNote = (note: { title: string; content: string }) => {
    const docContent = `Title: ${note.title}\n\n${note.content}`
    const blob = new Blob([docContent], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${note.title}.doc`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Mic className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">Record Lecture</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Record your lectures and let AI transcribe and organize the content.
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={stopRecording} disabled={!isRecording}>Stop Recording</Button>
          <Button onClick={startRecording} disabled={isRecording}>Start Recording</Button>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Recent Recordings</h3>
        <div className="space-y-2">
          {notes.map((note) => (
            <div key={note.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3" onClick={() => handleViewNote(note)}>
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium cursor-pointer">{note.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(note.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleDownloadNote(note)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setNotes(notes.filter(n => n.id !== note.id))}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for entering note title */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Enter Note Title">
        <Input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Enter note title"
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleSaveNote}>Save</Button>
        </div>
      </Dialog>
      {/* Modal for viewing transcription */}
      {selectedNote && (
        <Dialog isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} title={selectedNote.title}>
          <p className="whitespace-pre-wrap">{selectedNote.content}</p>
        </Dialog>
      )}
    </div>
  );
};

export default RecordNotes;

"use client"

import { useState, useRef } from "react"
import { FileText, Mic, Upload, Search, Plus, BookOpen, Calendar, Download, Edit, Trash } from "lucide-react"

export function NotesOrganizer() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [notes, setNotes] = useState<
    Array<{ id: string; title: string; content: string; timestamp: string }>
  >([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState("")
  const recognitionRef = useRef<any>(null)

  // Initialize the Web Speech API
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

  const saveTranscription = () => {
    if (transcription.trim()) {
      setIsDialogOpen(true) // Open the dialog to name the note
    } else {
      alert("No transcription to save.")
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

  const downloadAsWord = () => {
    if (!transcription.trim()) {
      alert("No transcription to download.")
      return
    }

    const blob = new Blob([transcription], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcription.doc"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">AI Notes Organizer</h1>
        <p className="text-sm text-gray-600 mb-6">
          Organize, summarize, and enhance your class notes.
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">My Notes</button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Upload Notes
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Voice Recording
          </button>
        </div>

        {/* Voice Recording Section */}
        <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ${
                isRecording ? "animate-pulse" : ""
              }`}
            >
              <Mic className="h-8 w-8 text-gray-600" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Record Lecture</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Record your lectures and let AI transcribe and organize the content.
          </p>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              Stop Recording
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              onClick={startRecording}
              disabled={isRecording}
            >
              Start Recording
            </button>
          </div>
        </div>

        {/* Transcription */}
        {transcription && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Transcription</h3>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{transcription}</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                onClick={saveTranscription}
              >
                Save Transcription
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                onClick={downloadAsWord}
              >
                Download as Word
              </button>
            </div>
          </div>
        )}

        {/* Saved Notes */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Saved Notes</h3>
          <div className="space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">{note.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(note.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create New Note Button */}
        <button
          className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Note
        </button>
      </div>

      {/* Dialog for creating a new note */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create New Note</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter a title for your note and save it.
            </p>
            <input
              type="text"
              placeholder="Note Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600 mb-4">
              {transcription || "No transcription available."}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                onClick={handleSaveNote}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
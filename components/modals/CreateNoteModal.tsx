import { useState } from "react";
import Dialog from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newNote: any) => void;
}

const CreateNoteModal = ({ isOpen, onClose, onSave }: CreateNoteModalProps) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!content) return;

    setIsGenerating(true);
    try {
      const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: `Summarize this note: ${content}` }] }],
      });

      const result = response.response.text();
      const [generatedSummary] = result.split("\n");

      return generatedSummary || "No summary generated";
    } catch (error) {
      console.error("Error generating AI summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (title && tag && content) {
      const summary = await generateSummary();
      console.log(summary)
      const newNote = { title, tag, content, description: summary, createdAt: new Date() };
      onSave(newNote);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Dialog>
  );
};

export default CreateNoteModal;

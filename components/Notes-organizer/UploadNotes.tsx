import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs";
import dotenv from "dotenv";
dotenv.config();
pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([pdfjsWorker], { type: "application/javascript" }));


const UploadNotes = () => {

  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_GEMINI_API_KEY"');
  }

  const uri = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(uri);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await processAndUploadFile(file);
    }
  };

  const processAndUploadFile = async (file: File) => {
    setIsLoading(true);
    try {
      const text = await extractTextFromFile(file);
      console.log("Extracted Text:", text);

      const { summary, tag } = await generateNoteSummary(text);
      console.log("AI Summary:", summary);
      console.log("AI Tag:", tag);

      await uploadNote(file.name, text, summary, tag);
      alert("Note uploaded successfully!");
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to upload note.");
    } finally {
      setIsLoading(false);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension === "pdf") {
      return await extractTextFromPDF(file);
    } else if (fileExtension === "txt") {
      return await file.text();
    } else {
      throw new Error("Unsupported file format");
    }
  };

  const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      extractedText += textContent.items.map((item: any) => item.str).join(" ") + " ";
    }

    return extractedText;
  };

  const generateNoteSummary = async (text: string) => {
    const prompt = `Summarize the following text in 2 sentences, add the prefix 'Summary:' before the summary and generate a one-word tag describing it: \n\n${text}`;
    const response = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
    const result = response.response.candidates![0].content.parts[0].text;

    console.log("AI Response:", result);

    const summaryMatch = result!.match(/Summary:\s*(.+)/i);
    const tagMatch = result!.match(/Tag:\s*(\w+)/i);

    return {
      summary: summaryMatch ? summaryMatch[1] : "No summary available",
      tag: tagMatch ? tagMatch[1] : "General",
    };
  };

  const uploadNote = async (title: string, content: string, description: string, tag: string) => {
    const response = await fetch("/api/notes/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, description, tag }),
    });

    if (!response.ok) throw new Error("Failed to create note");
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center">
        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Upload Your Notes</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Drag and drop your notes or click to browse. Supports PDF and text files.
        </p>

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".pdf,.txt"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Button to Open File Picker & Upload Automatically */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Select & Upload File"}
        </Button>
      </div>
    </div>
  );
};

export default UploadNotes;

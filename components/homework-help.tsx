"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Camera, Send, ImageIcon, FileText, Reply } from "lucide-react"

export function HomeworkHelp() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ type: string, content: string, timestamp: string, replyTo?: string }>>([
    { 
      type: "assistant", 
      content: "Hello! I'm your AI homework assistant. How can I help you today? 😊", 
      timestamp: new Date().toISOString() 
    },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatSessionRef = useRef<ReturnType<typeof model.startChat> | null>(null)

  const genAI = new GoogleGenerativeAI("AIzaSyDqa80UWZClAHQ8Y-6i5ljad_kxrtno1DM")
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = model.startChat({ history: [] })
    }
  }, [])

  const formatAIResponse = (text: string) => {
    // Remove unnecessary line breaks and repetitive phrases
    return text.replace(/\n+/g, "\n").trim();
  };

  const handleSend = async () => {
    if (!message.trim() || isProcessing) return;

    const userMessage = {
      type: "user",
      content: message,
      timestamp: new Date().toISOString(),
      replyTo: replyingTo || undefined,
    };

    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    setMessage("");
    setReplyingTo(null);
    setIsProcessing(true);

    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = model.startChat({ history: [] });
      }

      const result = await chatSessionRef.current.sendMessage(message);
      const response = await result.response;
      const aiResponse = response.text();

      const formattedResponse = formatAIResponse(aiResponse);

      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: formattedResponse,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: "Hmm, I'm having a bit of trouble right now. Can you try again? 😅",
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    setIsProcessing(false);
  };

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage((prev) => `${prev}\n[Uploaded Image Content]:\nSimulated text from image`);
    } catch (error) {
      console.error("Image Upload Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "🚫 Error: I couldn't process the image. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    setIsProcessing(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="col-span-2 md:row-span-2">
        <CardHeader>
          <CardTitle>AI Homework Assistant</CardTitle>
          <CardDescription>Get instant help with your homework questions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-b h-[400px] overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.type === "user" ? "justify-end" : ""}`}>
                {msg.type !== "user" && (
                  <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`rounded-lg p-3 text-sm max-w-[80%] ${
                  msg.type === "user" ? "bg-primary text-primary-foreground" : 
                  msg.type === "error" ? "bg-destructive text-destructive-foreground" : "bg-muted"
                }`}>
                  {msg.replyTo && (
                    <div className="text-xs font-bold text-primary mb-2">
                      Replying to: {chatHistory.find(m => m.timestamp === msg.replyTo)?.content}
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>Thinking</span>
                    <div className="flex space-x-1">
                      <div className="h-1 w-1 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="h-1 w-1 bg-primary rounded-full animate-bounce delay-200"></div>
                      <div className="h-1 w-1 bg-primary rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-2 pt-4">
          <Textarea
            placeholder={replyingTo ? "Reply to this message..." : "Ask your question..."}
            className="flex-1 min-h-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            disabled={isProcessing}
          />
          <Button size="icon" onClick={handleSend} disabled={isProcessing}>
            <Send className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Scan Homework</CardTitle>
          <CardDescription>Upload or scan your homework for instant help</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
            <Camera className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">Take a photo or upload an image of your homework</p>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} className="hidden" />
            <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>Upload Image</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Camera, Mic, Send, ImageIcon, FileText, ThumbsUp, ThumbsDown } from "lucide-react"
import { text } from "stream/consumers"

export function HomeworkHelp() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: string, text: string }[]>([
    { role: "model", text: "Hello! I'm your AI homework assistant. How can I help you today?" },
  ]);
  const genAI = new GoogleGenerativeAI("AIzaSyDqa80UWZClAHQ8Y-6i5ljad_kxrtno1DM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handelOnClick = async () => {
    if (!message) {
      alert("Please enter a message");
      return;
    }

    setLoading(true);
    const newUserMessage = { role: "user", text: message };
    setChatHistory((prevChatHistory) => [...prevChatHistory, newUserMessage]);
    setMessage("");

    try {
      const result = await model.generateContent(message);
      if (result.response.candidates) {
        const content =  {role: "model", text: result.response.candidates[0].content.parts[0].text.toString()};
        setChatHistory((prevChatHistory) => [...prevChatHistory, content]);
      } else {
        console.error("No response candidates");
        // Handle no response candidates.
      }
    } catch (error) {
      console.error("API error:", error);
      // Handle API error.
    } finally {
      setLoading(false);
    }
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
            
            {chatHistory.map((chat: { role: string , text: string }, index: number) => (
              chat.role === "model" ?
              <div key={index} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm">
                  {chat.text}
                </div>
              </div>
              :
              <div key={index} className="flex items-start gap-3 justify-end">
                <div className="rounded-lg bg-primary text-primary-foreground p-3 text-sm">
                  {chat.text}
                </div>
                <div className="rounded-full bg-primary p-2 h-8 w-8 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-2 pt-4">
          <Button variant="outline" size="icon">
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
          <Textarea
            placeholder="Ask your question..."
            className="flex-1 min-h-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button size="icon" onClick={handelOnClick}>
            <Send className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <div className="col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Scan Homework</CardTitle>
            <CardDescription>Upload or scan your homework for instant help</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
              <Camera className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Take a photo or upload an image of your homework
              </p>
              <Button className="mt-4">Upload Image</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 rounded-lg border p-3">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Calculus: Derivatives</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-3">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Physics: Momentum</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-3">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Chemistry: Balancing Equations</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState } from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Camera, Mic, Send, ImageIcon, FileText, ThumbsUp, ThumbsDown } from "lucide-react"
import { text } from "stream/consumers"
import { MessageSquare, Camera, Send, ImageIcon, FileText, Reply } from "lucide-react"

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

  const [chatHistory, setChatHistory] = useState<Array<{ type: string, content: string, timestamp: string, replyTo?: string }>>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null) // Track which message is being replied to
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add initial chatbot message when the component mounts
  useEffect(() => {
    setChatHistory([{
      type: 'assistant',
      content: "Hello! I'm your AI homework assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }])
  }, [])

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true)
    try {
      // Simulate image processing (replace with actual logic if needed)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay
      const text = "Simulated text from image upload" // Replace with actual OCR logic

      setMessage(prev => `${prev}\n[Uploaded Image Content]:\n${text}`)
    } catch (error) {
      console.error('Image Upload Error:', error)
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: "🚫 Error: I couldn't process the image. Please try again or upload a clearer image.",
        timestamp: new Date().toISOString() // Add timestamp
      }])
    }
    setIsProcessing(false)
  }

  const handleSend = async () => {
    if (!message.trim() || isProcessing) return
    
    // Add user message to history
    const newHistory = [...chatHistory, {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString(),
      replyTo: replyingTo || undefined // Add replyTo if replying to a message
    }]
    setChatHistory(newHistory)
    setMessage('')
    setReplyingTo(null) // Reset reply state
    
    try {
      setIsProcessing(true)
      
      // Simulate AI response (replace with actual logic if needed)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate delay
      const text = "Simulated AI response" // Replace with actual AI logic

      // Add AI response to history
      setChatHistory([...newHistory, {
        type: 'assistant',
        content: text,
        timestamp: new Date().toISOString(),
        replyTo: replyingTo || undefined // Add replyTo if replying to a message
      }])
    } catch (error) {
      console.error('AI Error:', error)
      setChatHistory([...newHistory, { 
        type: 'error',
        content: "Sorry, I'm having trouble helping right now. Please try again later.",
        timestamp: new Date().toISOString() // Add timestamp
      }])
    }
    setIsProcessing(false)
  }

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId) // Set the message being replied to
  }

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
            {/* Dynamic Chat Messages */}
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                {msg.type !== 'user' && (
                  <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`rounded-lg p-3 text-sm max-w-[80%] ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : msg.type === 'error'
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-muted'
                }`}>
                  {msg.replyTo && (
                    <div className="text-xs text-muted-foreground mb-2">
                      Replying to: {chatHistory.find(m => m.timestamp === msg.replyTo)?.content}
                    </div>
                  )}
                  {msg.content}
                  {msg.type === 'assistant' && (
                    <div className="flex items-center justify-end space-x-2 mt-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleReply(msg.timestamp)} // Add reply button
                      >
                        <Reply className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
                {msg.type === 'user' && (
                  <div className="rounded-full bg-primary p-2 h-8 w-8 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
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
            ))}
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-2 pt-4">
          <Textarea
            placeholder={replyingTo ? "Reply to this message..." : "Ask your question..."}
            className="flex-1 min-h-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={isProcessing}
          />
          <Button size="icon" onClick={handelOnClick}>
          <Button 
            size="icon" 
            onClick={handleSend}
            disabled={isProcessing}
          >
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
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                className="hidden"
              />
              <Button 
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
              </Button>
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
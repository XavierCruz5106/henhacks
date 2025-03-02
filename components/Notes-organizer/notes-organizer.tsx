import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Plus} from "lucide-react"
import { useState, useEffect } from 'react';
import MyNotes from "./MyNotes"
import UploadNotes from "./UploadNotes"
import RecordNotes from "./RecordNotes"




export function NotesOrganizer() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>AI Notes Organizer</CardTitle>
          <CardDescription>Organize, summarize, and enhance your class notes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notes">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="upload">Upload Notes</TabsTrigger>
              <TabsTrigger value="record">Voice Recording</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-4 pt-4">
              <MyNotes  />
            </TabsContent>

            <TabsContent value="upload" className="space-y-4 pt-4">
                <UploadNotes />
            </TabsContent>

            <TabsContent value="record" className="space-y-4 pt-4">
              <RecordNotes />
            </TabsContent>

          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Create New Note
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FileText, Mic, Upload, Search, Plus, BookOpen, Calendar, Download, Edit, Trash } from "lucide-react"

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
              <div className="flex items-center space-x-2">
                <Input placeholder="Search your notes..." className="flex-1" />
                <Button size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Calculus</Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Feb 28, 2025</span>
                      </div>
                    </div>
                    <CardTitle className="text-base">Derivatives & Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      Notes on the chain rule, product rule, and applications of derivatives in real-world problems.
                      Includes examples of optimization and related rates.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Physics</Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Feb 25, 2025</span>
                      </div>
                    </div>
                    <CardTitle className="text-base">Electromagnetism Fundamentals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      Notes on electric fields, magnetic fields, and electromagnetic induction. Includes Maxwell's
                      equations and practical applications in electrical engineering.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Chemistry</Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Feb 22, 2025</span>
                      </div>
                    </div>
                    <CardTitle className="text-base">Organic Chemistry Reactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      Notes on substitution and elimination reactions in organic chemistry. Includes reaction
                      mechanisms, stereochemistry, and practical examples.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Biology</Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Feb 20, 2025</span>
                      </div>
                    </div>
                    <CardTitle className="text-base">Cell Structure & Function</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      Notes on eukaryotic and prokaryotic cell structures, organelles, and their functions. Includes
                      cell membrane transport and cellular respiration.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="upload" className="space-y-4 pt-4">
              <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Your Notes</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Drag and drop your notes or click to browse. Supports PDF, images, and text files.
                </p>
                <Button>Upload Files</Button>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="summarize" className="rounded border-gray-300" />
                    <label htmlFor="summarize" className="text-sm">
                      Summarize notes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="highlight" className="rounded border-gray-300" />
                    <label htmlFor="highlight" className="text-sm">
                      Highlight key concepts
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="questions" className="rounded border-gray-300" />
                    <label htmlFor="questions" className="text-sm">
                      Generate practice questions
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="flashcards" className="rounded border-gray-300" />
                    <label htmlFor="flashcards" className="text-sm">
                      Create flashcards
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="record" className="space-y-4 pt-4">
              <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mic className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Record Lecture</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Record your lectures and let AI transcribe and organize the content.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Start Recording</Button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Recent Recordings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Physics Lecture - Electromagnetism</p>
                        <p className="text-xs text-muted-foreground">Feb 25, 2025 • 45:12</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Calculus Lecture - Integration</p>
                        <p className="text-xs text-muted-foreground">Feb 22, 2025 • 52:38</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
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


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, CalendarIcon, Clock, BookOpen, Brain, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"

export function StudyPlanner() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="md:col-span-1 lg:col-span-1 row-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Add to Your Schedule</CardTitle>
            <CardDescription>Track your classes, assignments, and exams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="classes">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="classes">Classes</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="exams">Exams</TabsTrigger>
              </TabsList>
              <TabsContent value="classes" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="class-name">Class Name</Label>
                  <Input id="class-name" placeholder="e.g., Calculus 101" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="day">Day</Label>
                    <Select>
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Class
                </Button>
              </TabsContent>
              <TabsContent value="assignments" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-name">Assignment Name</Label>
                  <Input id="assignment-name" placeholder="e.g., Math Homework #3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calculus">Calculus 101</SelectItem>
                      <SelectItem value="physics">Physics 202</SelectItem>
                      <SelectItem value="chemistry">Chemistry 110</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated-time">Estimated Time (hours)</Label>
                  <Input id="estimated-time" type="number" min="0.5" step="0.5" />
                </div>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Assignment
                </Button>
              </TabsContent>
              <TabsContent value="exams" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-name">Exam Name</Label>
                  <Input id="exam-name" placeholder="e.g., Midterm Exam" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam-class">Class</Label>
                  <Select>
                    <SelectTrigger id="exam-class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calculus">Calculus 101</SelectItem>
                      <SelectItem value="physics">Physics 202</SelectItem>
                      <SelectItem value="chemistry">Chemistry 110</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam-date">Exam Date</Label>
                  <Input id="exam-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topics">Topics Covered</Label>
                  <Textarea id="topics" placeholder="List the main topics that will be on the exam" />
                </div>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Exam
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="md:col-span-2 lg:col-span-2 row-span-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Study Calendar</CardTitle>
            <CardDescription>AI-optimized study schedule based on your commitments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="md:col-span-2 lg:col-span-2 row-span-1">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Study Plan</CardTitle>
                <CardDescription>March 1, 2025</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Adjust Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="rounded-full p-2 bg-primary/10">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Calculus 101</p>
                    <p className="text-xs text-muted-foreground">Class at 10:00 AM - 11:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Physics Study Session</p>
                    <p className="text-xs text-muted-foreground">1:00 PM - 2:30 PM • Chapter 7: Electromagnetism</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </div>
                <div className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="rounded-full p-2 bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Chemistry Assignment</p>
                    <p className="text-xs text-muted-foreground">3:00 PM - 4:30 PM • Due in 2 days</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </div>
                <div className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="rounded-full p-2 bg-primary/10">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Calculus Exam Prep</p>
                    <p className="text-xs text-muted-foreground">7:00 PM - 8:30 PM • Exam in 5 days</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" />
              View Full Week Schedule
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}


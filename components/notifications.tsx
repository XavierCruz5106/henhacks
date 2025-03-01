"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Clock, AlertCircle, CheckCircle2, BookOpen, Trash, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export function Notifications() {
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
    <motion.div className="grid gap-6 md:grid-cols-2" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Customize how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notification Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <Label htmlFor="assignment-reminders" className="text-sm">
                      Assignment Reminders
                    </Label>
                  </div>
                  <Switch id="assignment-reminders" defaultChecked aria-label="Toggle assignment reminders" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <Label htmlFor="exam-alerts" className="text-sm">
                      Exam Alerts
                    </Label>
                  </div>
                  <Switch id="exam-alerts" defaultChecked aria-label="Toggle exam alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <Label htmlFor="study-reminders" className="text-sm">
                      Study Session Reminders
                    </Label>
                  </div>
                  <Switch id="study-reminders" defaultChecked aria-label="Toggle study session reminders" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <Label htmlFor="progress-updates" className="text-sm">
                      Progress Updates
                    </Label>
                  </div>
                  <Switch id="progress-updates" aria-label="Toggle progress updates" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notification Timing</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="advance-notice" className="text-sm">
                    Assignment advance notice
                  </Label>
                  <select
                    id="advance-notice"
                    className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                    aria-label="Select assignment advance notice time"
                  >
                    <option>1 day before</option>
                    <option>2 days before</option>
                    <option>3 days before</option>
                    <option>1 week before</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="exam-advance" className="text-sm">
                    Exam advance notice
                  </Label>
                  <select
                    id="exam-advance"
                    className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                    aria-label="Select exam advance notice time"
                  >
                    <option>3 days before</option>
                    <option>1 week before</option>
                    <option>2 weeks before</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Calendar Integration</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="google-calendar" className="text-sm">
                      Google Calendar
                    </Label>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="outlook" className="text-sm">
                      Outlook Calendar
                    </Label>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Settings</Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Notifications</CardTitle>
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Stay updated with your academic activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="important">Important</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <TabsContent value="all" className="space-y-3 mt-0">
                  <div className="flex items-center space-x-4 rounded-lg border p-3 bg-muted/50">
                    <div className="rounded-full p-2 bg-destructive/10 flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">Calculus Exam Reminder</p>
                        <Badge variant="outline" className="text-xs">
                          1h ago
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Your exam is in 5 days. Start preparing now!</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Delete notification">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="rounded-full p-2 bg-primary/10 flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">Study Session Reminder</p>
                        <Badge variant="outline" className="text-xs">
                          3h ago
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your Physics study session is scheduled for 1:00 PM today.
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Delete notification">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="rounded-full p-2 bg-green-500/10 flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">Assignment Completed</p>
                        <Badge variant="outline" className="text-xs">
                          Yesterday
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Great job completing your Chemistry lab report!</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Delete notification">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="rounded-full p-2 bg-primary/10 flex-shrink-0">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">New Assignment Added</p>
                        <Badge variant="outline" className="text-xs">
                          2 days ago
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Physics Problem Set #4 has been added to your planner.
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Delete notification">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="unread" className="space-y-3 mt-0">
                  <div className="flex items-center space-x-4 rounded-lg border p-3 bg-muted/50">
                    <div className="rounded-full p-2 bg-destructive/10 flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">Calculus Exam Reminder</p>
                        <Badge variant="outline" className="text-xs">
                          1h ago
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Your exam is in 5 days. Start preparing now!</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Delete notification">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="important" className="space-y-3 mt-0">
                  <div className="flex items-center space-x-4 rounded-lg border p-3 bg-muted/50">
                    <div className="rounded-full p-2 bg-destructive/10 flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">Calculus Exam Reminder</p>
                        <Badge variant="outline" className="text-xs">
                          1h ago
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Your exam is in 5 days. Start preparing now!</p>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Delete notification">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Mark All as Read
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}


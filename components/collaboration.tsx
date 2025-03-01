import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Calendar, Clock, BookOpen, MessageSquare, Video, Plus } from "lucide-react"

export function Collaboration() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Study Groups & Collaboration</CardTitle>
          <CardDescription>Connect with classmates and join study sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="groups">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="groups">Study Groups</TabsTrigger>
              <TabsTrigger value="buddies">Study Buddies</TabsTrigger>
              <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
            </TabsList>
            <TabsContent value="groups" className="space-y-4 pt-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Search study groups..." className="flex-1" />
                <Button size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge>Calculus</Badge>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">12 members</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">Calculus Study Group</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A group for Calculus 101 students to collaborate on homework and prepare for exams.
                    </p>
                    <div className="mt-4 flex -space-x-2">
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                        +9
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Group</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge>Physics</Badge>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">8 members</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">Physics Problem Solvers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Weekly sessions to work through challenging physics problems and prepare for exams.
                    </p>
                    <div className="mt-4 flex -space-x-2">
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>RJ</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>AL</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>TM</AvatarFallback>
                      </Avatar>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                        +5
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Group</Button>
                  </CardFooter>
                </Card>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Create New Study Group
              </Button>
            </TabsContent>
            <TabsContent value="buddies" className="space-y-4 pt-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Search for study buddies..." className="flex-1" />
                <Button size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">Jessica Davis</CardTitle>
                        <CardDescription>Chemistry & Biology</CardDescription>
                      </div>
                      <div className="ml-auto flex items-center">
                        <Badge variant="outline" className="mr-2">
                          95% Match
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Pre-med student looking for study partners for Organic Chemistry and Biology.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">Chemistry 110</Badge>
                      <Badge variant="secondary">Biology 101</Badge>
                      <Badge variant="secondary">Organic Chemistry</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Buddy
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MT</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">Michael Thompson</CardTitle>
                        <CardDescription>Physics & Calculus</CardDescription>
                      </div>
                      <div className="ml-auto flex items-center">
                        <Badge variant="outline" className="mr-2">
                          87% Match
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Engineering student looking for study partners for Physics and Calculus courses.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">Physics 202</Badge>
                      <Badge variant="secondary">Calculus 101</Badge>
                      <Badge variant="secondary">Linear Algebra</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Buddy
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="sessions" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge>Calculus</Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Today</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">Derivatives & Integrals Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">7:00 PM - 8:30 PM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm">5 participants</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm">Topics: Chain Rule, Integration by Parts</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button>
                      <Video className="mr-2 h-4 w-4" />
                      Join Session
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge>Chemistry</Badge>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Tomorrow</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">Organic Chemistry Lab Prep</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">4:00 PM - 5:30 PM</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm">3 participants</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm">Topics: Lab Safety, Experiment Procedures</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button>
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Schedule New Session
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}


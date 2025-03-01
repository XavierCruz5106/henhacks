import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, Clock, ArrowRight, CheckCircle, XCircle, Flame } from "lucide-react"
import { motion } from "framer-motion"

export function StudySessions() {

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
    <motion.div className="grid gap-4 md:grid-cols-2"
      variants={container}
      initial="hidden"
      animate="show"
      >
        <motion.div variants={item}
          initial="hidden"
          animate="show"
          className="col-span-2"
          >
          <Card>
            <CardHeader>
              <CardTitle>Interactive Study Sessions</CardTitle>
              <CardDescription>AI-generated quizzes, flashcards, and study materials based on your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="quizzes">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                  <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                  <TabsTrigger value="progress">Your Progress</TabsTrigger>
                </TabsList>
                <TabsContent value="quizzes" className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge>Calculus</Badge>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">Derivatives & Integrals</CardTitle>
                        <CardDescription>15 questions • ~20 minutes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Test your knowledge of basic derivatives, integrals, and their applications.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Start Quiz</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge>Physics</Badge>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">Electromagnetism</CardTitle>
                        <CardDescription>12 questions • ~15 minutes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Review electric fields, magnetic fields, and electromagnetic induction.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Start Quiz</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge>Chemistry</Badge>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">Organic Chemistry Basics</CardTitle>
                        <CardDescription>20 questions • ~25 minutes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Practice naming compounds, identifying functional groups, and reaction mechanisms.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Start Quiz</Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <Button variant="outline" className="w-full">
                    Generate New Quiz <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>
                <TabsContent value="flashcards" className="space-y-4 pt-4">
                  <div className="flex justify-center">
                    <Card className="w-full max-w-md h-64 flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge>Physics</Badge>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm">12</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-sm text-muted-foreground">30</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex items-center justify-center">
                        <p className="text-xl font-medium text-center">
                          What is Faraday's Law of Electromagnetic Induction?
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">
                          <XCircle className="mr-2 h-4 w-4" />I don't know
                        </Button>
                        <Button>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Show Answer
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline">Previous</Button>
                    <Button variant="outline">Next</Button>
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline">
                      Create New Flashcard Set <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="progress" className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Calculus</span>
                      </div>
                      <span className="text-sm">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Physics</span>
                      </div>
                      <span className="text-sm">62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Chemistry</span>
                      </div>
                      <span className="text-sm">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Flame className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">7-Day Streak!</h4>
                        <p className="text-xs text-muted-foreground">Keep it up to earn bonus XP</p>
                      </div>
                      <div className="ml-auto flex items-center space-x-1">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">1250 XP</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Quizzes Completed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">24</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Flashcards Mastered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">156</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
    </motion.div>
  )
}

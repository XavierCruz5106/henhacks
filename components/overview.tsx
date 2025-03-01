import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen, CheckCircle, BrainCircuit, Users, FileText, Focus, ArrowRight } from "lucide-react"

interface OverviewProps {
  setActiveTab: (tabId: string) => void;
}

export function Overview({ setActiveTab }: OverviewProps) {
  const features = [
    {
      id: "planner",
      title: "Smart Study Planner",
      description: "Personalized study schedules",
      icon: <Calendar className="h-5 w-5 text-primary" />,
    },
    {
      id: "notifications",
      title: "Smart Notifications",
      description: "Intelligent reminders",
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
    {
      id: "study",
      title: "Interactive Study Sessions",
      description: "AI-generated quizzes and flashcards",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
    },
    {
      id: "homework",
      title: "Homework Help",
      description: "Instant answers and explanations",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      id: "focus",
      title: "Distraction Management",
      description: "Focus mode and Pomodoro timer",
      icon: <Focus className="h-5 w-5 text-primary" />,
    },
    {
      id: "collaboration",
      title: "Collaboration & Community",
      description: "Connect with study buddies",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      id: "notes",
      title: "AI Notes Organizer",
      description: "Summarize and organize notes",
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Welcome back, Student!</CardTitle>
          <CardDescription>Here's your study overview for today.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <BrainCircuit className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm font-medium">AI Study Recommendation</p>
              <p className="text-xs text-muted-foreground">
                Focus on Calculus Chapter 5 today - it's critical for your upcoming exam.
              </p>
            </div>
            <Button className="ml-auto">Start Studying</Button>
          </div>
        </CardContent>
      </Card>

      {features.map((feature) => (
        <Card key={feature.id} className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
            {feature.icon}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </CardContent>
          <CardContent className="mt-auto pt-2">
            <Button
              variant="ghost"
              className="w-full justify-start p-0 text-primary hover:text-primary"
              onClick={() => setActiveTab(feature.id)}
            >
              Open {feature.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

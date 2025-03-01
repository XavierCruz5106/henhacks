"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Coffee, Bell, Plus, X } from "lucide-react"

export function DistractionManager() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Focus Mode</CardTitle>
          <CardDescription>Block distracting apps and websites while studying</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch id="focus-mode" />
            <Label htmlFor="focus-mode">Enable Focus Mode</Label>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Blocked Websites</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input placeholder="Add website to block" className="flex-1" />
                <Button size="icon" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-lg border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">facebook.com</span>
                  <Button size="icon" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">twitter.com</span>
                  <Button size="icon" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">instagram.com</span>
                  <Button size="icon" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">youtube.com</span>
                  <Button size="icon" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Blocked Applications</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input placeholder="Add application to block" className="flex-1" />
                <Button size="icon" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-lg border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Discord</span>
                  <Button size="icon" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Slack</span>
                  <Button size="icon" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Settings</Button>
        </CardFooter>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
          <CardDescription>Study with timed intervals and breaks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-primary/20 flex items-center justify-center relative">
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-primary/20"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray={290}
                    strokeDashoffset={290 - (290 * progress) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold">25:00</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => setIsRunning(false)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-10 w-10 rounded-full" onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Timer Settings</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="focus-time" className="text-xs">
                  Focus Time
                </Label>
                <div className="flex items-center">
                  <Input id="focus-time" type="number" min="1" max="60" defaultValue="25" className="text-center" />
                  <span className="ml-2 text-xs text-muted-foreground">min</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="short-break" className="text-xs">
                  Short Break
                </Label>
                <div className="flex items-center">
                  <Input id="short-break" type="number" min="1" max="30" defaultValue="5" className="text-center" />
                  <span className="ml-2 text-xs text-muted-foreground">min</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="long-break" className="text-xs">
                  Long Break
                </Label>
                <div className="flex items-center">
                  <Input id="long-break" type="number" min="5" max="60" defaultValue="15" className="text-center" />
                  <span className="ml-2 text-xs text-muted-foreground">min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-primary" />
                <Label htmlFor="sound-notification" className="text-sm">
                  Sound Notification
                </Label>
              </div>
              <Switch id="sound-notification" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coffee className="h-4 w-4 text-primary" />
                <Label htmlFor="auto-break" className="text-sm">
                  Auto-start Breaks
                </Label>
              </div>
              <Switch id="auto-break" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Apply Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


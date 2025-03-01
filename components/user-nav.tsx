"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Clock,
  Trash,
} from "lucide-react";
import { TabsContent, Tabs } from "@/components/ui/tabs";

export function UserNav() {
  const { setTheme, theme } = useTheme();
  const notifications = [
    {
      id: 1,
      icon: AlertCircle,
      color: "text-destructive",
      title: "Calculus Exam Reminder",
      time: "1h ago",
      description: "Your exam is in 5 days. Start preparing now!",
    },
    {
      id: 2,
      icon: Clock,
      color: "text-primary",
      title: "Study Session Reminder",
      time: "3h ago",
      description: "Your Physics study session is scheduled for 1:00 PM today.",
    },
    {
      id: 3,
      icon: CheckCircle2,
      color: "text-green-500",
      title: "Assignment Completed",
      time: "Yesterday",
      description: "Great job completing your Chemistry lab report!",
    },
    {
      id: 4,
      icon: BookOpen,
      color: "text-primary",
      title: "New Assignment Added",
      time: "2 days ago",
      description: "Physics Problem Set #4 has been added to your planner.",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
              aria-label="3 notifications"
            >
              {notifications.length}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-200" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <Tabs defaultValue="all">
              <TabsContent value="all" className="space-y-3 mt-0  pr-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <notification.icon
                      className={`h-5 w-5 ${notification.color}`}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {notification.time}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete notification"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full"
            aria-label="User menu"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="@student" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Alex Johnson</p>
              <p className="text-xs leading-none text-muted-foreground">
                alex.johnson@university.edu
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

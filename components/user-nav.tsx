"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
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
import {
  Bell,
  Settings,
  LogOut,
  User,
  Moon,
  Sun,
  AlertCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import Dialog from "./ui/dialog";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

export function UserNav() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  let siren = new Audio();

  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!isSignedIn) {
    return null; // Optionally handle the case when the user is not signed in
  }

  // Available themes with display names
  const availableThemes = [
    { id: "midnight-blue", name: "Midnight Blue" },
    { id: "pain", name: "Pain" },
    { id: "candy", name: "Candy" },
    { id: "horrific-ugly", name: "Horrific Ugly" },
    { id: "purple-blue", name: "Purple Blue" },
    { id: "ruby-sapphire", name: "Ruby Sapphire" },
    { id: "ruby-sapphire-inferno", name: "Ruby Sapphire Inferno" },
    { id: "eye-melter", name: "Eye Melter" },
    { id: "sleek-pink", name: "Sleek Pink" },
  ];

  // Notifications Data (Restored)
  const notifications = [
    {
      id: 1,
      icon: AlertCircle,
      iconBg: "bg-destructive/10",
      color: "text-destructive",
      title: "Calculus Exam Reminder",
      time: "1h ago",
      description: "Your exam is in 5 days. Start preparing now!",
    },
    {
      id: 2,
      icon: Clock,
      iconBg: "bg-primary/10",
      color: "text-primary",
      title: "Study Session Reminder",
      time: "3h ago",
      description: "Your Physics study session is scheduled for 1:00 PM today.",
    },
    {
      id: 3,
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      color: "text-green-500",
      title: "Assignment Completed",
      time: "Yesterday",
      description: "Great job completing your Chemistry lab report!",
    },
    {
      id: 4,
      icon: BookOpen,
      iconBg: "bg-primary/10",
      color: "text-primary",
      title: "New Assignment Added",
      time: "2 days ago",
      description: "Physics Problem Set #4 has been added to your planner.",
    },
  ];

  useEffect(() => {
    setMounted(true);

    // Apply theme to <html> tag
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  if (!isSignedIn) return null;

  // Toggle between Light/Dark mode
  const toggleMode = () => {
    const newMode = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newMode);
  };

  const cycleThemes = () => {
    let index = 0;

    const interval = setInterval(() => {
      setTheme(availableThemes[index].id);
      index = (index + 1) % availableThemes.length;
      playSiren();
    }, 50); // Change theme every second

    // Clear interval after 5 seconds
    setTimeout(() => clearInterval(interval), 1000);
  };

  const playSiren = () => {
    siren = new Audio("/siren.mp3");
    // Replace with a real siren sound file
    siren.loop = true; // Make it play on repeat
    siren.play();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Light/Dark Mode Toggle */}
      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle mode"
          onClick={toggleMode}
        >
          {resolvedTheme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Notifications Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
              {notifications.length}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end">
          <DropdownMenuLabel className="font-normal">
            Notifications
            <Tabs defaultValue="all">
              <TabsContent value="all" className="space-y-3 mt-0  pr-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div
                      className={`rounded-full p-2 flex-shrink-0 ${notification.iconBg}`}>
                    <notification.icon
                      className={`h-5 w-5 ${notification.color}`}
                    />
                    </div>
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
          <DropdownMenuSeparator />
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex items-start space-x-3 p-2"
            >
              <div
                className={`rounded-full p-2 flex-shrink-0 ${notification.iconBg}`}
              >
                <notification.icon
                  className={`h-5 w-5 ${notification.color}`}
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-gray-500">
                  {notification.description}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full"
            aria-label="User menu"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user.imageUrl || "/placeholder.svg"}
                alt={user.firstName!}
              />
              <AvatarFallback>
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Settings Dialog */}
      <Dialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Customize your experience.
          </p>

          {/* Light/Dark Mode Selection */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Select Mode</h3>
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
              >
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
              >
                Dark
              </Button>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="flex flex-wrap gap-2 mt-4">
            <h3 className="text-sm font-medium">Select Theme</h3>
            <div className="flex flex-wrap gap-2">
              {" "}
              {/* Added flex-wrap here */}
              {availableThemes.map((themeOption) => (
                <Button
                  key={themeOption.id}
                  variant={theme === themeOption.id ? "default" : "outline"}
                  onClick={() => setTheme(themeOption.id)}
                >
                  {themeOption.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
          <Button className="ms-4" onClick={cycleThemes}>
            Death
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

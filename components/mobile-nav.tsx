"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Menu, LayoutDashboard, Calendar, Bell, BookOpen, HelpCircle, Focus, Users, FileText } from "lucide-react"
import { useState } from "react"
import { MainNav } from "./main-nav"

export function MobileNav({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const [open, setOpen] = useState(false)

  const routes = [
    { label: "Overview", icon: <LayoutDashboard className="mr-2 h-4 w-4" />, value: "overview" },
    { label: "Study Planner", icon: <Calendar className="mr-2 h-4 w-4" />, value: "planner" },
    { label: "Notifications", icon: <Bell className="mr-2 h-4 w-4" />, value: "notifications" },
    { label: "Study Sessions", icon: <BookOpen className="mr-2 h-4 w-4" />, value: "study" },
    { label: "Homework Help", icon: <HelpCircle className="mr-2 h-4 w-4" />, value: "homework" },
    { label: "Focus Mode", icon: <Focus className="mr-2 h-4 w-4" />, value: "focus" },
    { label: "Collaboration", icon: <Users className="mr-2 h-4 w-4" />, value: "collaboration" },
    { label: "Notes Organizer", icon: <FileText className="mr-2 h-4 w-4" />, value: "notes" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[280px]">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-2 px-4">
            <MainNav className="md:flex mb-6" />
            {routes.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value)
                  setOpen(false) // Close mobile nav
                }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "justify-start w-full",
                  activeTab === tab.value ? "bg-accent text-white" : ""
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

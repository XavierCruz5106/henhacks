"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "planner", label: "Study Planner" },
    { id: "notifications", label: "Notifications" },
    { id: "study", label: "Study Sessions" },
    { id: "homework", label: "Homework Help" },
    { id: "focus", label: "Focus Mode" },
    { id: "collaboration", label: "Collaboration" },
    { id: "notes", label: "Notes Organizer" },
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
        <MainNav className="mx-4 my-4" />
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-2 px-4">
            {tabs.map((tab) => (
              <Button key={tab.id} variant="ghost" className="w-full justify-start" onClick={() => setOpen(false)}>
                {tab.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}


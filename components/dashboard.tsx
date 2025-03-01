"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { StudyPlanner } from "@/components/study-planner"
import { Notifications } from "@/components/notifications"
import { StudySessions } from "@/components/study-sessions"
import { HomeworkHelp } from "@/components/homework-help"
import { DistractionManager } from "@/components/distraction-manager"
import { Collaboration } from "@/components/collaboration"
import { NotesOrganizer } from "@/components/notes-organizer"
import { Overview } from "@/components/overview"
import { MobileNav } from "@/components/mobile-nav"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

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
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav className="hidden md:flex" />
          <MobileNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight">Navigation</h2>
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center rounded-md px-2 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    activeTab === tab.id ? "bg-accent" : ""
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsContent value="overview" className="space-y-4">
                <Overview setActiveTab={setActiveTab} />
              </TabsContent>
              <TabsContent value="planner" className="space-y-4">
                <StudyPlanner />
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4">
                <Notifications />
              </TabsContent>
              <TabsContent value="study" className="space-y-4">
                <StudySessions />
              </TabsContent>
              <TabsContent value="homework" className="space-y-4">
                <HomeworkHelp />
              </TabsContent>
              <TabsContent value="focus" className="space-y-4">
                <DistractionManager />
              </TabsContent>
              <TabsContent value="collaboration" className="space-y-4">
                <Collaboration />
              </TabsContent>
              <TabsContent value="notes" className="space-y-4">
                <NotesOrganizer />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}


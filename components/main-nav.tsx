import type React from "react"
import Link from "next/link"
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  Bell,
  BookOpen,
  HelpCircle,
  Focus,
  Users,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  setOpen?: (open: boolean) => void
}

export function MainNav({ className, setOpen }: MainNavProps) {
  const routes = [
    {
      href: "#",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      value: "overview",
    },
    {
      href: "#",
      label: "Study Planner",
      icon: <Calendar className="mr-2 h-4 w-4" />,
      value: "planner",
    },
    {
      href: "#",
      label: "Notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
      value: "notifications",
    },
    {
      href: "#",
      label: "Study Sessions",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      value: "study",
    },
    {
      href: "#",
      label: "Homework Help",
      icon: <HelpCircle className="mr-2 h-4 w-4" />,
      value: "homework",
    },
    {
      href: "#",
      label: "Focus Mode",
      icon: <Focus className="mr-2 h-4 w-4" />,
      value: "focus",
    },
    {
      href: "#",
      label: "Collaboration",
      icon: <Users className="mr-2 h-4 w-4" />,
      value: "collaboration",
    },
    {
      href: "#",
      label: "Notes Organizer",
      icon: <FileText className="mr-2 h-4 w-4" />,
      value: "notes",
    },
  ]

  return (
    <div className={cn("flex items-center", className)}>
      <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setOpen?.(false)}>
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="font-bold inline-block">AI School Companion</span>
      </Link>
      <nav className="flex gap-2 md:gap-1 md:flex-col lg:flex-row">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            onClick={() => setOpen?.(false)}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start md:w-full")}
          >
            {route.icon}
            <span className="hidden md:inline-block">{route.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}


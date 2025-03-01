import type React from "react"
import Link from "next/link"
import {
  GraduationCap
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  setOpen?: (open: boolean) => void
}

export function MainNav({ className, setOpen }: MainNavProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setOpen?.(false)}>
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="font-bold inline-block">Quester</span>
      </Link>
      <nav className="flex gap-2 md:gap-1 md:flex-col lg:flex-row">
      </nav>
    </div>
  )
}

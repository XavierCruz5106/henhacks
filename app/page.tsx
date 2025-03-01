import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "AI School Companion",
  description: "Your AI-powered study assistant for academic success",
}

export default function HomePage() {
  return <Dashboard />
}


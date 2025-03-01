import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"
import { testDatabaseConnection } from "./actions";

export const metadata: Metadata = {
  title: "AI School Companion",
  description: "Your AI-powered study assistant for academic success",
}

export default async function HomePage() {
  const isConnected = await testDatabaseConnection();

  return <Dashboard />
}

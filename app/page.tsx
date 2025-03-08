import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"
import { testDatabaseConnection } from "./actions";
import { RedirectToSignIn, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "AI School Companion",
  description: "Your AI-powered study assistant for academic success",
}

export default async function HomePage() {
  await testDatabaseConnection();

  // if clerk user isnt logged in reroute them to clerk login
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Dashboard/>
      </SignedIn>
    </>
  )
}

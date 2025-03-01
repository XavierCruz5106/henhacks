import "@/app/globals.css"
import { Roboto as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "100"
})

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem children={children} />
      </body>
    </html>
  )
}

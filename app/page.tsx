"use client"

import { FounderProvider } from "@/components/contexts/founder-context"
import FounderJourney from "@/components/founder-journey"

export default function Home() {
  return (
    <FounderProvider>
      <FounderJourney />
    </FounderProvider>
  )
}

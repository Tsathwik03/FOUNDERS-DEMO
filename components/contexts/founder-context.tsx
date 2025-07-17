"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface FounderState {
  // Core founder info
  isFirstTime: boolean | null
  startupStage: "early-stage" | "running" | "profitable" | "bootstrapped" | ""

  // Idea and domain
  hasIdea: boolean | null
  selectedDomain: string
  ideaDescription: string

  // Team and co-founder
  needsCofounder: boolean | null

  // Funding
  needsFunding: boolean | null
  fundingCategory: string
  fundingAmount: string
  equityOffer: string
  timeline: string
  useOfFunds: string

  // Company details
  companyName: string
  isRegistered: boolean | null
  hasWebsite: boolean | null
  websiteUrl: string

  // Progress tracking
  currentStep: string
  completedSteps: string[]
  lokaTokens: number

  // Files and documents
  uploadedFiles: any[]

  // Support services
  selectedServices: string[]

  // Tracking data
  userTraction: string
  monthlyUsers: string
  revenue: string
  growthRate: string
  keyMetrics: string
}

interface FounderContextType {
  state: FounderState
  updateState: (updates: Partial<FounderState>) => void
  goToStep: (step: string) => void
  earnTokens: (amount: number, reason: string) => void
  completeStep: (step: string) => void
}

const initialState: FounderState = {
  isFirstTime: null,
  startupStage: "",
  hasIdea: null,
  selectedDomain: "",
  ideaDescription: "",
  needsCofounder: null,
  needsFunding: null,
  fundingCategory: "",
  fundingAmount: "",
  equityOffer: "",
  timeline: "",
  useOfFunds: "",
  companyName: "",
  isRegistered: null,
  hasWebsite: null,
  websiteUrl: "",
  currentStep: "founder-start",
  completedSteps: [],
  lokaTokens: 100,
  uploadedFiles: [],
  selectedServices: [],
  userTraction: "",
  monthlyUsers: "",
  revenue: "",
  growthRate: "",
  keyMetrics: "",
}

const FounderContext = createContext<FounderContextType | undefined>(undefined)

export function FounderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FounderState>(initialState)

  const updateState = (updates: Partial<FounderState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const goToStep = (step: string) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }

  const earnTokens = (amount: number, reason: string) => {
    setState((prev) => ({
      ...prev,
      lokaTokens: prev.lokaTokens + amount,
    }))
  }

  const completeStep = (step: string) => {
    setState((prev) => ({
      ...prev,
      completedSteps: [...prev.completedSteps, step],
    }))
  }

  return (
    <FounderContext.Provider value={{ state, updateState, goToStep, earnTokens, completeStep }}>
      {children}
    </FounderContext.Provider>
  )
}

export function useFounderContext() {
  const context = useContext(FounderContext)
  if (!context) {
    throw new Error("useFounderContext must be used within a FounderProvider")
  }
  return context
}

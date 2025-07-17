"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProgressState {
  currentStep: string
  completedSteps: string[]
  lokaTokens: number
  decisions: Record<string, any>
}

interface ProgressContextType {
  state: ProgressState
  earnLokaTokens: (amount: number, reason: string) => void
  makeDecision: (key: string, value: any) => void
  completeStep: (step: string) => void
}

const initialState: ProgressState = {
  currentStep: "founder-start",
  completedSteps: [],
  lokaTokens: 100,
  decisions: {},
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(initialState)

  const earnLokaTokens = (amount: number, reason: string) => {
    setState((prev) => ({
      ...prev,
      lokaTokens: prev.lokaTokens + amount,
    }))
  }

  const makeDecision = (key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      decisions: { ...prev.decisions, [key]: value },
    }))
  }

  const completeStep = (step: string) => {
    setState((prev) => ({
      ...prev,
      completedSteps: [...prev.completedSteps, step],
    }))
  }

  return (
    <ProgressContext.Provider value={{ state, earnLokaTokens, makeDecision, completeStep }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgressContext must be used within a ProgressProvider")
  }
  return context
}

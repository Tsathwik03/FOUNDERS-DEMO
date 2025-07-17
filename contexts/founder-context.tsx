"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Founder {
  id: string | null
  name: string
  email: string
  type: "individual" | "team" | ""
  experience: "first-time" | "experienced" | ""
  stage: "early-stage" | "running" | "profitable" | "bootstrapped" | ""
  isFirstTime: boolean | null
}

interface Startup {
  hasIdea: boolean | null
  ideaDescription: string
  domain: string
  stage: "ideation" | "mvp" | "launched" | "scaling" | ""
  hasTeam: boolean | null
  teamSize: number
  needsFunding: boolean | null
  fundingAmount: string
  companyRegistered: boolean | null
}

interface Cofounder {
  lookingForCofounder: boolean | null
  skills: string[]
  experience: string
}

interface Progress {
  currentStep: string
  completedSteps: string[]
  totalSteps: number
  progressPercentage: number
}

interface Tokens {
  available: number
  earned: number
  spent: number
  history: Array<{
    type: "earned" | "spent"
    amount: number
    reason: string
    timestamp: Date
    id: number
  }>
}

interface FounderContextType {
  founder: Founder
  startup: Startup
  cofounder: Cofounder
  progress: Progress
  tokens: Tokens
  errors: Record<string, string>
  loading: boolean
  updateFounder: (updates: Partial<Founder>) => void
  updateStartup: (updates: Partial<Startup>) => void
  updateCofounder: (updates: Partial<Cofounder>) => void
  updateProgress: (step: string, completed?: boolean) => void
  earnTokens: (amount: number, reason: string) => void
  spendTokens: (amount: number, reason: string) => void
  getFounderSummary: () => any
  getStartupSummary: () => any
  setError: (field: string, error: string) => void
  clearError: (field: string) => void
  setLoading: (loading: boolean) => void
  resetFounder: () => void
}

const initialState = {
  founder: {
    id: null,
    name: "",
    email: "",
    type: "" as const,
    experience: "" as const,
    stage: "" as const,
    isFirstTime: null,
  },
  startup: {
    hasIdea: null,
    ideaDescription: "",
    domain: "",
    stage: "" as const,
    hasTeam: null,
    teamSize: 0,
    needsFunding: null,
    fundingAmount: "",
    companyRegistered: null,
  },
  cofounder: {
    lookingForCofounder: null,
    skills: [],
    experience: "",
  },
  progress: {
    currentStep: "dashboard",
    completedSteps: [],
    totalSteps: 10,
    progressPercentage: 0,
  },
  tokens: {
    available: 100,
    earned: 0,
    spent: 0,
    history: [],
  },
  errors: {},
  loading: false,
}

const FounderContext = createContext<FounderContextType | undefined>(undefined)

export function FounderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState)

  const updateFounder = (updates: Partial<Founder>) => {
    setState((prev) => ({
      ...prev,
      founder: { ...prev.founder, ...updates },
    }))
  }

  const updateStartup = (updates: Partial<Startup>) => {
    setState((prev) => ({
      ...prev,
      startup: { ...prev.startup, ...updates },
    }))
  }

  const updateCofounder = (updates: Partial<Cofounder>) => {
    setState((prev) => ({
      ...prev,
      cofounder: { ...prev.cofounder, ...updates },
    }))
  }

  const updateProgress = (step: string, completed = true) => {
    setState((prev) => {
      const newCompletedSteps = completed
        ? [...new Set([...prev.progress.completedSteps, step])]
        : prev.progress.completedSteps.filter((s) => s !== step)

      const progressPercentage = (newCompletedSteps.length / prev.progress.totalSteps) * 100

      return {
        ...prev,
        progress: {
          ...prev.progress,
          currentStep: step,
          completedSteps: newCompletedSteps,
          progressPercentage: Math.round(progressPercentage),
        },
      }
    })
  }

  const earnTokens = (amount: number, reason: string) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        available: prev.tokens.available + amount,
        earned: prev.tokens.earned + amount,
        history: [
          ...prev.tokens.history,
          {
            type: "earned" as const,
            amount,
            reason,
            timestamp: new Date(),
            id: Date.now(),
          },
        ],
      },
    }))
  }

  const spendTokens = (amount: number, reason: string) => {
    setState((prev) => {
      if (prev.tokens.available >= amount) {
        return {
          ...prev,
          tokens: {
            ...prev.tokens,
            available: prev.tokens.available - amount,
            spent: prev.tokens.spent + amount,
            history: [
              ...prev.tokens.history,
              {
                type: "spent" as const,
                amount,
                reason,
                timestamp: new Date(),
                id: Date.now(),
              },
            ],
          },
        }
      }
      return prev
    })
  }

  const getFounderSummary = () => {
    return {
      name: state.founder.name || "Anonymous Founder",
      type: state.founder.type || "Not specified",
      experience: state.founder.experience || "Not specified",
      stage: state.founder.stage || "Not specified",
      isFirstTime: state.founder.isFirstTime,
      hasIdea: state.startup.hasIdea,
      domain: state.startup.domain || "Not selected",
      hasTeam: state.startup.hasTeam,
      needsFunding: state.startup.needsFunding,
      companyRegistered: state.startup.companyRegistered,
      progressPercentage: state.progress.progressPercentage,
      completedSteps: state.progress.completedSteps.length,
      totalSteps: state.progress.totalSteps,
      tokensAvailable: state.tokens.available,
      tokensEarned: state.tokens.earned,
      currentStep: state.progress.currentStep,
      lookingForCofounder: state.cofounder.lookingForCofounder,
      hasBasicInfo: !!(state.founder.name && state.founder.email),
    }
  }

  const getStartupSummary = () => {
    return {
      hasIdea: state.startup.hasIdea,
      ideaDescription: state.startup.ideaDescription,
      domain: state.startup.domain,
      stage: state.startup.stage,
      hasTeam: state.startup.hasTeam,
      teamSize: state.startup.teamSize,
      needsFunding: state.startup.needsFunding,
      fundingAmount: state.startup.fundingAmount,
      companyRegistered: state.startup.companyRegistered,
    }
  }

  const setError = (field: string, error: string) => {
    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }))
  }

  const clearError = (field: string) => {
    setState((prev) => {
      const newErrors = { ...prev.errors }
      delete newErrors[field]
      return { ...prev, errors: newErrors }
    })
  }

  const setLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, loading }))
  }

  const resetFounder = () => {
    setState(initialState)
  }

  const contextValue: FounderContextType = {
    ...state,
    updateFounder,
    updateStartup,
    updateCofounder,
    updateProgress,
    earnTokens,
    spendTokens,
    getFounderSummary,
    getStartupSummary,
    setError,
    clearError,
    setLoading,
    resetFounder,
  }

  return <FounderContext.Provider value={contextValue}>{children}</FounderContext.Provider>
}

export function useFounderContext() {
  const context = useContext(FounderContext)
  if (!context) {
    throw new Error("useFounderContext must be used within a FounderProvider")
  }
  return context
}

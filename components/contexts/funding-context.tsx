"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface FundingState {
  needsFunding: boolean | null
  category: string
  amount: string
  timeline: string
  useOfFunds: string
  equityToOffer: string
  currentValuation: string
  isRegistered: boolean | null
  companyDetails: {
    name: string
    registrationNumber: string
    documents: File[]
  }
}

interface FundingContextType {
  state: FundingState
  updateFunding: (updates: Partial<FundingState>) => void
}

const initialState: FundingState = {
  needsFunding: null,
  category: "",
  amount: "",
  timeline: "",
  useOfFunds: "",
  equityToOffer: "",
  currentValuation: "",
  isRegistered: null,
  companyDetails: {
    name: "",
    registrationNumber: "",
    documents: [],
  },
}

const FundingContext = createContext<FundingContextType | undefined>(undefined)

export function FundingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FundingState>(initialState)

  const updateFunding = (updates: Partial<FundingState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  return <FundingContext.Provider value={{ state, updateFunding }}>{children}</FundingContext.Provider>
}

export function useFundingContext() {
  const context = useContext(FundingContext)
  if (!context) {
    throw new Error("useFundingContext must be used within a FundingProvider")
  }
  return context
}

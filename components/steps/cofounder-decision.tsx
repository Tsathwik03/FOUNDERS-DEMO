"use client"

import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, User, ArrowLeft } from "lucide-react"

export default function CofounderDecision() {
  const { updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const handleDecision = (needsCofounder: boolean) => {
    updateState({ needsCofounder })
    earnTokens(15, "Made co-founder decision")
    completeStep("cofounder-decision")
    goToStep("funding-decision")
  }

  const handleBack = () => {
    goToStep("ai-agents-help")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card className="shadow-lg">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4">Do you need a co-founder?</CardTitle>
          <p className="text-lg text-gray-600">Let us know if you're looking for a co-founder to join your team</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center gap-6 text-center hover:border-green-500 hover:bg-green-50 bg-white border-2 transition-all duration-200"
              onClick={() => handleDecision(true)}
            >
              <Users className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Yes - I need a co-founder</h3>
                <p className="text-sm text-gray-600">I'm looking for someone to join my team</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-40 flex flex-col items-center gap-6 text-center hover:border-blue-500 hover:bg-blue-50 bg-white border-2 transition-all duration-200"
              onClick={() => handleDecision(false)}
            >
              <User className="h-12 w-12 text-blue-600" />
              <div>
                <h3 className="font-semibold text-xl mb-2">No - I'm going solo</h3>
                <p className="text-sm text-gray-600">I prefer to work alone for now</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

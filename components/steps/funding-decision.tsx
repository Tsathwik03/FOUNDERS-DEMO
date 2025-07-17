"use client"

import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Rocket, ArrowLeft } from "lucide-react"

export default function FundingDecision() {
  const { updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const handleDecision = (needsFunding: boolean) => {
    updateState({ needsFunding })
    earnTokens(15, "Made funding decision")
    completeStep("funding-decision")

    if (needsFunding) {
      goToStep("funding-form")
    } else {
      goToStep("mentorship-options")
    }
  }

  const handleBack = () => {
    goToStep("cofounder-decision")
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
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4">Do you need funding?</CardTitle>
          <p className="text-lg text-gray-600">Let us know if you're looking to raise capital for your startup</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center gap-6 text-center hover:border-green-500 hover:bg-green-50 bg-white border-2 transition-all duration-200"
              onClick={() => handleDecision(true)}
            >
              <DollarSign className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Yes - I need funding</h3>
                <p className="text-sm text-gray-600">I'm looking to raise capital to grow my startup</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-40 flex flex-col items-center gap-6 text-center hover:border-blue-500 hover:bg-blue-50 bg-white border-2 transition-all duration-200"
              onClick={() => handleDecision(false)}
            >
              <Rocket className="h-12 w-12 text-blue-600" />
              <div>
                <h3 className="font-semibold text-xl mb-2">No - I'm bootstrapping</h3>
                <p className="text-sm text-gray-600">I'm self-funding or don't need external investment</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

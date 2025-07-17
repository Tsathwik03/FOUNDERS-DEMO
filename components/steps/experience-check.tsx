"use client"

import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Award, ArrowLeft } from "lucide-react"

export default function ExperienceCheck() {
  const { updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const handleDecision = (isFirstTime: boolean) => {
    updateState({ isFirstTime })
    earnTokens(10, "Completed experience assessment")
    completeStep("experience-check")

    if (isFirstTime) {
      goToStep("idea-status-check")
    } else {
      goToStep("startup-stage-selector")
    }
  }

  const handleBack = () => {
    goToStep("founder-start")
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
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4">What's your experience level?</CardTitle>
          <p className="text-lg text-gray-600">Help us understand your entrepreneurial background</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center gap-6 text-center hover:border-blue-500 hover:bg-blue-50 bg-white border-2 transition-all duration-200"
              onClick={() => handleDecision(true)}
            >
              <User className="h-12 w-12 text-blue-600" />
              <div>
                <h3 className="font-semibold text-xl mb-2">First-Time Founder</h3>
                <p className="text-sm text-gray-600">This is my first startup venture</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-40 flex flex-col items-center gap-6 text-center hover:border-green-500 hover:bg-green-50 bg-white border-2 transition-all duration-200"
              onClick={() => handleDecision(false)}
            >
              <Award className="h-12 w-12 text-green-600" />
              <div>
                <h3 className="font-semibold text-xl mb-2">Experienced Founder</h3>
                <p className="text-sm text-gray-600">I have previous startup experience</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

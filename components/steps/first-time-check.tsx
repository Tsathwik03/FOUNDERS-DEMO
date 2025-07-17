"use client"

import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Award } from "lucide-react"

export default function FirstTimeCheck() {
  const { makeDecision, goToNextStep } = useFounderContext()

  const handleDecision = (isFirstTime: boolean) => {
    makeDecision("isFirstTime", isFirstTime)

    if (isFirstTime) {
      goToNextStep("idea-status-check")
    } else {
      goToNextStep("startup-stage-selector")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">What's your experience level?</CardTitle>
          <p className="text-gray-600">Help us understand your entrepreneurial background</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="h-32 flex flex-col items-center gap-4 text-center hover:border-blue-500 hover:bg-blue-50 bg-transparent"
              onClick={() => handleDecision(true)}
            >
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-lg mb-2">First-Time Founder</h3>
                <p className="text-sm text-gray-600">This is my first startup venture</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-32 flex flex-col items-center gap-4 text-center hover:border-green-500 hover:bg-green-50 bg-transparent"
              onClick={() => handleDecision(false)}
            >
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Experienced Founder</h3>
                <p className="text-sm text-gray-600">I have previous startup experience</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

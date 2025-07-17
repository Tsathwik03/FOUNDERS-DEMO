"use client"

import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Rocket, TrendingUp, DollarSign, ArrowLeft } from "lucide-react"

export default function StartupStageSelector() {
  const { updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const stages = [
    {
      id: "early-stage",
      title: "Early Stage",
      description: "Just starting out with an idea",
      icon: Lightbulb,
      color: "blue",
    },
    {
      id: "running",
      title: "Running",
      description: "Have a product and some users",
      icon: Rocket,
      color: "green",
    },
    {
      id: "profitable",
      title: "Profitable",
      description: "Making money consistently",
      icon: TrendingUp,
      color: "purple",
    },
    {
      id: "bootstrapped",
      title: "Bootstrapped",
      description: "Self-funded and growing",
      icon: DollarSign,
      color: "orange",
    },
  ]

  const handleStageSelect = (stage: string) => {
    updateState({ startupStage: stage as any })
    earnTokens(15, "Selected startup stage")
    completeStep("startup-stage-selector")
    goToStep("idea-status-check")
  }

  const handleBack = () => {
    goToStep("experience-check")
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
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4">What stage is your startup?</CardTitle>
          <p className="text-lg text-gray-600">This helps us provide relevant guidance</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {stages.map((stage) => {
              const Icon = stage.icon
              return (
                <Button
                  key={stage.id}
                  variant="outline"
                  className="h-32 flex items-center gap-6 text-left hover:border-blue-500 hover:bg-blue-50 bg-white border-2 transition-all duration-200 p-6"
                  onClick={() => handleStageSelect(stage.id)}
                >
                  <Icon className={`h-10 w-10 text-${stage.color}-600 flex-shrink-0`} />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{stage.title}</h3>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

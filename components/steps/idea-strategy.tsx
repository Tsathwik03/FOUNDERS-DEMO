"use client"

import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Globe, Users, TrendingUp, ArrowLeft } from "lucide-react"

export default function IdeaStrategy() {
  const { goToStep, earnTokens, completeStep } = useFounderContext()

  const strategies = [
    {
      title: "Pitch Deck",
      description: "Create a comprehensive pitch presentation",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Early Traction",
      description: "Build initial user base and validation",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Live URL",
      description: "Deploy your MVP or landing page",
      icon: Globe,
      color: "purple",
    },
    {
      title: "Documentation",
      description: "Document your idea and business model",
      icon: Users,
      color: "orange",
    },
  ]

  const handleStrategySelect = (strategyType: string) => {
    earnTokens(15, `Started ${strategyType}`)

    switch (strategyType) {
      case "pitch-deck":
        goToStep("pitch-deck-builder")
        break
      case "live-url":
        goToStep("live-url-setup")
        break
      case "documentation":
        goToStep("documentation-builder")
        break
      case "early-traction":
        goToStep("early-traction-setup")
        break
      default:
        handleContinue()
    }
  }

  const handleContinue = () => {
    earnTokens(25, "Reviewed idea strategy")
    completeStep("idea-strategy")
    goToStep("cofounder-decision")
  }

  const handleBack = () => {
    goToStep("idea-status-check")
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

      <Card className="mb-8 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 mb-4">Idea Strategy</CardTitle>
          <p className="text-lg text-gray-600">Let's work on your startup idea strategy</p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {strategies.map((strategy) => {
          const Icon = strategy.icon
          return (
            <Card key={strategy.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-${strategy.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 text-${strategy.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{strategy.title}</h3>
                    <p className="text-sm text-gray-600">{strategy.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleStrategySelect(strategy.title.toLowerCase().replace(" ", "-"))}
                >
                  Work on {strategy.title}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button onClick={handleContinue} size="lg" className="px-8 py-3">
          Continue to Co-founder Decision
        </Button>
      </div>
    </div>
  )
}

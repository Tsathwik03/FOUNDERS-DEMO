"use client"

import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Search, FileText, Code, ArrowLeft } from "lucide-react"

export default function AIAgentsHelp() {
  const { goToStep, earnTokens, completeStep } = useFounderContext()

  const services = [
    {
      title: "R&D Help",
      description: "Research and development assistance",
      icon: Search,
      tokens: 25,
    },
    {
      title: "Cold Calling",
      description: "AI-powered customer outreach",
      icon: Bot,
      tokens: 30,
    },
    {
      title: "Pitch Deck",
      description: "AI-generated pitch deck creation",
      icon: FileText,
      tokens: 40,
    },
    {
      title: "Small Prototype",
      description: "Basic prototype development",
      icon: Code,
      tokens: 50,
    },
  ]

  const handleContinue = () => {
    earnTokens(25, "Reviewed AI agent services")
    completeStep("ai-agents-help")
    goToStep("cofounder-decision")
  }

  const handleBack = () => {
    goToStep("domain-selection")
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

      <Card className="mb-8 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Agents Help
          </CardTitle>
          <p className="text-lg text-gray-600">Get AI assistance for your startup needs (covered by Loka tokens)</p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600 font-medium">{service.tokens} Loka Tokens</span>
                  <Button variant="outline" size="sm">
                    Get Help
                  </Button>
                </div>
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

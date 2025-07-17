"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Users, Scale, Calculator, TrendingUp, ArrowLeft, CheckCircle } from "lucide-react"

export default function MentorshipOptions() {
  const { updateState, goToStep, earnTokens, completeStep } = useFounderContext()
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services = [
    {
      id: "ai-chatbot",
      title: "AI Chatbot for Help",
      description: "24/7 AI assistant for startup guidance",
      cost: "Free",
      icon: Bot,
    },
    {
      id: "mentorship",
      title: "Mentorship - Connect with Mentors",
      description: "Get paired with experienced entrepreneurs",
      cost: "10 Loka Tokens/month",
      icon: Users,
    },
    {
      id: "legal",
      title: "Legalities - Connect with Legal Team",
      description: "Professional legal support and compliance",
      cost: "15 Loka Tokens/session",
      icon: Scale,
    },
    {
      id: "auditing",
      title: "Auditing - Connect with Finance Team",
      description: "Financial auditing and accounting support",
      cost: "20 Loka Tokens/session",
      icon: Calculator,
    },
    {
      id: "exit-planning",
      title: "List Startup - Exit Planning Team",
      description: "Strategic guidance for IPO or acquisition",
      cost: "25 Loka Tokens/session",
      icon: TrendingUp,
    },
  ]

  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((s) => s !== serviceId))
    } else {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  const handleSubmit = () => {
    updateState({ selectedServices })
    earnTokens(20, "Selected support services")
    completeStep("mentorship-options")
    goToStep("progress-tracking")
  }

  const handleSkip = () => {
    completeStep("mentorship-options")
    goToStep("progress-tracking")
  }

  const handleBack = () => {
    goToStep("file-uploader")
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
        <CardHeader>
          <CardTitle className="text-2xl">Beyond Funding - What Help You Need</CardTitle>
          <p className="text-gray-600">Select the support services that will help accelerate your startup journey</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon
              const isSelected = selectedServices.includes(service.id)

              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceToggle(service.id)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{service.cost}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {isSelected ? (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center space-y-4">
            {selectedServices.length > 0 && (
              <p className="text-sm text-gray-600">
                Selected {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""}
              </p>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={handleSkip} variant="outline" size="lg">
                Skip for Now
              </Button>

              {selectedServices.length > 0 && (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  Confirm Selection
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

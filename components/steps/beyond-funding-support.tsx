"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { useProgressContext } from "../contexts/progress-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Users, Scale, Calculator, TrendingUp } from "lucide-react"

export default function BeyondFundingSupport() {
  const { goToNextStep } = useFounderContext()
  const { earnLokaTokens } = useProgressContext()

  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services = [
    {
      id: "ai-chatbot",
      title: "AI Chatbot",
      description: "24/7 AI assistant for your business",
      icon: Bot,
    },
    {
      id: "mentorship",
      title: "Mentorship",
      description: "Connect with experienced mentors",
      icon: Users,
    },
    {
      id: "legal",
      title: "Legal Support",
      description: "Legal advice and documentation",
      icon: Scale,
    },
    {
      id: "auditing",
      title: "Auditing",
      description: "Financial and business auditing",
      icon: Calculator,
    },
    {
      id: "exit-planning",
      title: "Exit Planning",
      description: "Plan your exit strategy",
      icon: TrendingUp,
    },
  ]

  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId))
    } else {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  const handleSubmit = () => {
    earnLokaTokens(30, "Selected support services")
    goToNextStep("progress-tracking")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Beyond Funding Support</CardTitle>
          <p className="text-gray-600">What additional help do you need for your startup?</p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selectedServices.includes(service.id)

          return (
            <Card
              key={service.id}
              className={`cursor-pointer transition-colors ${
                isSelected ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Selected {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""}
        </p>
        <Button onClick={handleSubmit} size="lg">
          Continue with Selected Services
        </Button>
      </div>
    </div>
  )
}

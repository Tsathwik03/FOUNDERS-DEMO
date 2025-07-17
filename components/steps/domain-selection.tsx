"use client"

import { useFounderContext } from "../contexts/founder-context"
import AppLayout from "../layout/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp } from "lucide-react"

export default function DomainSelection() {
  const { updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const domains = [
    {
      id: "AI",
      title: "Artificial Intelligence",
      description: "Machine learning, automation, intelligent systems",
      icon: "🤖",
      trending: true,
      marketSize: "$5B+",
    },
    {
      id: "Web3",
      title: "Web3 & Blockchain",
      description: "Decentralized applications, crypto, NFTs",
      icon: "⛓️",
      trending: true,
      marketSize: "$3B+",
    },
    {
      id: "Fintech",
      title: "Financial Technology",
      description: "Digital payments, banking, financial services",
      icon: "💳",
      trending: false,
      marketSize: "$8B+",
    },
    {
      id: "B2B",
      title: "Business to Business",
      description: "Enterprise solutions, SaaS, productivity tools",
      icon: "🏢",
      trending: false,
      marketSize: "$10B+",
    },
    {
      id: "C4S",
      title: "Consumer for Social",
      description: "Social platforms, community apps",
      icon: "👥",
      trending: false,
      marketSize: "$4B+",
    },
    {
      id: "Other",
      title: "Other Domain",
      description: "Healthcare, education, e-commerce, etc.",
      icon: "🌟",
      trending: false,
      marketSize: "$6B+",
    },
  ]

  const handleDomainSelect = (domainId: string) => {
    updateState({ selectedDomain: domainId })
    earnTokens(20, "Selected startup domain")
    completeStep("domain-selection")
    goToStep("ai-agents-help")
  }

  const handleBack = () => {
    goToStep("idea-status-check")
  }

  return (
    <AppLayout title="Ideation Center">
      <div className="space-y-6">
        {/* Blue Header Section */}
        <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Startup Domain</h1>
            <p className="text-gray-600">Select the domain that aligns with your interests and expertise</p>
          </div>

          {/* Domain Grid */}
          <div className="grid grid-cols-3 gap-4">
            {domains.map((domain) => (
              <Card
                key={domain.id}
                className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleDomainSelect(domain.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{domain.icon}</div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800">{domain.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {domain.trending && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {domain.marketSize}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{domain.description}</p>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Select Domain
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Section with Form Fields */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">IDEATION</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center text-sm text-gray-600">
                  DOMAIN
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center text-sm text-gray-600">
                  PROBLEM
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center text-sm text-gray-600">
                  SOLUTION
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">SMART TECHNOLOGY</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded p-4 h-20"></div>
                <div className="bg-gray-50 border border-gray-200 rounded p-4 h-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

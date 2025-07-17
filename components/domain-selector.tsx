"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ArrowLeft, TrendingUp } from "lucide-react"

interface Domain {
  id: string
  title: string
  description: string
  icon: string
  examples: string[]
  trending: boolean
  marketSize: string
}

interface DomainSelectorProps {
  selectedDomain?: string
  onDomainSelect: (domainId: string) => void
  onBack?: () => void
}

const domains: Domain[] = [
  {
    id: "AI",
    title: "Artificial Intelligence",
    description: "Machine learning, automation, intelligent systems",
    icon: "🤖",
    examples: ["ChatGPT alternatives", "AI analytics", "Computer vision"],
    trending: true,
    marketSize: "$5B+",
  },
  {
    id: "Web3",
    title: "Web3 & Blockchain",
    description: "Decentralized applications, crypto, NFTs",
    icon: "⛓️",
    examples: ["DeFi platforms", "NFT marketplaces", "Crypto wallets"],
    trending: true,
    marketSize: "$3B+",
  },
  {
    id: "Fintech",
    title: "Financial Technology",
    description: "Digital payments, banking, financial services",
    icon: "💳",
    examples: ["Payment gateways", "Digital banking", "Investment platforms"],
    trending: false,
    marketSize: "$8B+",
  },
  {
    id: "B2B",
    title: "Business to Business",
    description: "Enterprise solutions, SaaS, productivity tools",
    icon: "🏢",
    examples: ["CRM systems", "Project management", "HR solutions"],
    trending: false,
    marketSize: "$10B+",
  },
  {
    id: "C4S",
    title: "Consumer for Social",
    description: "Social platforms, community apps, consumer products",
    icon: "👥",
    examples: ["Social networks", "Community platforms", "Consumer apps"],
    trending: false,
    marketSize: "$4B+",
  },
  {
    id: "Other",
    title: "Other Domain",
    description: "Healthcare, education, e-commerce, etc.",
    icon: "🌟",
    examples: ["HealthTech", "EdTech", "E-commerce"],
    trending: false,
    marketSize: "$6B+",
  },
]

export default function DomainSelector({ selectedDomain, onDomainSelect, onBack }: DomainSelectorProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Choose Your Startup Domain
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Select the domain that aligns with your interests and expertise
              </CardDescription>
            </div>
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2 hover:bg-white/80 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <Card
            key={domain.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              selectedDomain === domain.id
                ? "ring-2 ring-blue-500 shadow-lg bg-blue-50/50"
                : "hover:shadow-lg border-gray-200"
            }`}
            onClick={() => onDomainSelect(domain.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-200">{domain.icon}</div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-gray-800">{domain.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      {domain.trending && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs text-gray-600">
                        {domain.marketSize}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {selectedDomain === domain.id ? (
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300 group-hover:text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{domain.description}</p>

              <div className="space-y-3">
                <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Popular Examples</p>
                <div className="flex flex-wrap gap-2">
                  {domain.examples.map((example, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className={`w-full mt-4 transition-all duration-200 ${
                  selectedDomain === domain.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  onDomainSelect(domain.id)
                }}
              >
                {selectedDomain === domain.id ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Selected
                  </span>
                ) : (
                  "Select Domain"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDomain && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Domain Selected!</span>
              </div>
              <p className="text-sm text-green-700">
                Great choice! You've selected <strong>{domains.find((d) => d.id === selectedDomain)?.title}</strong>
              </p>
              <p className="text-xs text-green-600">🪙 +20 Loka Tokens earned! Ready for AI-powered idea generation.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

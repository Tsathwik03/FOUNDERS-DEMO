"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, ArrowLeft, Download, Eye } from "lucide-react"

export default function PitchDeckBuilder() {
  const { state, updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const [pitchData, setPitchData] = useState({
    companyName: state.companyName || "",
    tagline: "",
    problemStatement: "",
    solution: "",
    marketSize: "",
    businessModel: "",
    traction: "",
    team: "",
    funding: state.fundingAmount || "",
    useOfFunds: state.useOfFunds || "",
  })

  const handleSave = () => {
    updateState({
      companyName: pitchData.companyName,
      ideaDescription: pitchData.solution,
    })
    earnTokens(40, "Built pitch deck")
    completeStep("pitch-deck-builder")
    goToStep("idea-strategy")
  }

  const handleBack = () => {
    goToStep("idea-strategy")
  }

  const pitchSections = [
    { key: "companyName", label: "Company Name", placeholder: "Your startup name" },
    { key: "tagline", label: "Tagline", placeholder: "One-line description of what you do" },
    {
      key: "problemStatement",
      label: "Problem Statement",
      placeholder: "What problem are you solving?",
      multiline: true,
    },
    { key: "solution", label: "Solution", placeholder: "How does your product solve this problem?", multiline: true },
    { key: "marketSize", label: "Market Size", placeholder: "Total addressable market size" },
    { key: "businessModel", label: "Business Model", placeholder: "How do you make money?", multiline: true },
    { key: "traction", label: "Traction", placeholder: "Current progress, users, revenue, etc.", multiline: true },
    { key: "team", label: "Team", placeholder: "Key team members and their expertise", multiline: true },
    { key: "funding", label: "Funding Ask", placeholder: "How much funding do you need?" },
    { key: "useOfFunds", label: "Use of Funds", placeholder: "How will you use the funding?", multiline: true },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Idea Strategy
      </Button>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Pitch Deck Builder</CardTitle>
              <p className="text-gray-600">Create your comprehensive pitch deck presentation</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            {pitchSections.map((section) => (
              <div key={section.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{section.label}</label>
                {section.multiline ? (
                  <Textarea
                    value={pitchData[section.key as keyof typeof pitchData]}
                    onChange={(e) => setPitchData({ ...pitchData, [section.key]: e.target.value })}
                    placeholder={section.placeholder}
                    rows={3}
                  />
                ) : (
                  <Input
                    value={pitchData[section.key as keyof typeof pitchData]}
                    onChange={(e) => setPitchData({ ...pitchData, [section.key]: e.target.value })}
                    placeholder={section.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">AI Pitch Deck Generation</h3>
            <p className="text-blue-700 text-sm mb-3">
              Our AI will help you create a professional pitch deck based on your inputs.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                Preview Deck
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              Save Pitch Deck
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

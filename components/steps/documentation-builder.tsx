"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileText, ArrowLeft, Download, BookOpen } from "lucide-react"

export default function DocumentationBuilder() {
  const { state, updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const [docData, setDocData] = useState({
    businessPlan: "",
    marketAnalysis: "",
    competitorAnalysis: "",
    financialProjections: "",
    operationalPlan: "",
    marketingStrategy: "",
    riskAssessment: "",
    timeline: "",
  })

  const handleSave = () => {
    updateState({ ideaDescription: docData.businessPlan })
    earnTokens(30, "Created documentation")
    completeStep("documentation-builder")
    goToStep("idea-strategy")
  }

  const handleBack = () => {
    goToStep("idea-strategy")
  }

  const documentSections = [
    {
      key: "businessPlan",
      label: "Business Plan Overview",
      placeholder: "Describe your business concept, mission, and vision...",
    },
    { key: "marketAnalysis", label: "Market Analysis", placeholder: "Analyze your target market, size, and trends..." },
    {
      key: "competitorAnalysis",
      label: "Competitor Analysis",
      placeholder: "Identify and analyze your main competitors...",
    },
    {
      key: "financialProjections",
      label: "Financial Projections",
      placeholder: "Revenue projections, costs, and profitability timeline...",
    },
    { key: "operationalPlan", label: "Operational Plan", placeholder: "How will you run your business day-to-day..." },
    {
      key: "marketingStrategy",
      label: "Marketing Strategy",
      placeholder: "How will you acquire and retain customers...",
    },
    {
      key: "riskAssessment",
      label: "Risk Assessment",
      placeholder: "Identify potential risks and mitigation strategies...",
    },
    { key: "timeline", label: "Development Timeline", placeholder: "Key milestones and timeline for your startup..." },
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
            <BookOpen className="h-8 w-8 text-purple-600" />
            <div>
              <CardTitle className="text-2xl">Documentation Builder</CardTitle>
              <p className="text-gray-600">Document your idea and create a comprehensive business plan</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            {documentSections.map((section) => (
              <div key={section.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{section.label}</label>
                <Textarea
                  value={docData[section.key as keyof typeof docData]}
                  onChange={(e) => setDocData({ ...docData, [section.key]: e.target.value })}
                  placeholder={section.placeholder}
                  rows={4}
                />
              </div>
            ))}
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">AI Documentation Assistant</h3>
            <p className="text-purple-700 text-sm mb-3">
              Our AI can help you generate comprehensive documentation based on your inputs.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                Generate Business Plan
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export as PDF
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            Save Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TrendingUp, ArrowLeft, Users, DollarSign } from "lucide-react"

export default function EarlyTractionSetup() {
  const { state, updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const [tractionData, setTractionData] = useState({
    currentUsers: state.monthlyUsers || "",
    revenue: state.revenue || "",
    growthRate: state.growthRate || "",
    customerAcquisition: "",
    keyMetrics: state.keyMetrics || "",
    validationMethods: "",
    partnerships: "",
    mediaAttention: "",
    socialProof: "",
  })

  const handleSave = () => {
    updateState({
      monthlyUsers: tractionData.currentUsers,
      revenue: tractionData.revenue,
      growthRate: tractionData.growthRate,
      keyMetrics: tractionData.keyMetrics,
      userTraction: tractionData.socialProof,
    })
    earnTokens(45, "Set up early traction tracking")
    completeStep("early-traction-setup")
    goToStep("idea-strategy")
  }

  const handleBack = () => {
    goToStep("idea-strategy")
  }

  const tractionMetrics = [
    { key: "currentUsers", label: "Current Users/Customers", placeholder: "Number of active users", icon: Users },
    { key: "revenue", label: "Monthly Revenue ($)", placeholder: "Monthly recurring revenue", icon: DollarSign },
    { key: "growthRate", label: "Growth Rate (%)", placeholder: "Monthly growth percentage", icon: TrendingUp },
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
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl">Early Traction Setup</CardTitle>
              <p className="text-gray-600">Build and track your initial user base and validation</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {tractionMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.key} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-green-600" />
                    <label className="text-sm font-medium text-gray-700">{metric.label}</label>
                  </div>
                  <Input
                    value={tractionData[metric.key as keyof typeof tractionData]}
                    onChange={(e) => setTractionData({ ...tractionData, [metric.key]: e.target.value })}
                    placeholder={metric.placeholder}
                  />
                </div>
              )
            })}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Acquisition Strategy</label>
            <Textarea
              value={tractionData.customerAcquisition}
              onChange={(e) => setTractionData({ ...tractionData, customerAcquisition: e.target.value })}
              placeholder="How are you acquiring customers? What channels are working best?"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Validation Methods</label>
            <Textarea
              value={tractionData.validationMethods}
              onChange={(e) => setTractionData({ ...tractionData, validationMethods: e.target.value })}
              placeholder="How are you validating your idea? Surveys, interviews, beta testing, etc."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Partnerships</label>
            <Textarea
              value={tractionData.partnerships}
              onChange={(e) => setTractionData({ ...tractionData, partnerships: e.target.value })}
              placeholder="Any strategic partnerships, collaborations, or key relationships..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Media & Press Attention</label>
            <Textarea
              value={tractionData.mediaAttention}
              onChange={(e) => setTractionData({ ...tractionData, mediaAttention: e.target.value })}
              placeholder="Any media coverage, press mentions, awards, or recognition..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Social Proof & Testimonials</label>
            <Textarea
              value={tractionData.socialProof}
              onChange={(e) => setTractionData({ ...tractionData, socialProof: e.target.value })}
              placeholder="Customer testimonials, reviews, case studies, social media mentions..."
              rows={3}
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Traction Building Tips</h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Focus on one key metric that matters most to your business</li>
              <li>• Document all customer feedback and iterate quickly</li>
              <li>• Build in public and share your progress regularly</li>
              <li>• Leverage social media and content marketing for organic growth</li>
            </ul>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            size="lg"
          >
            Save Traction Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, ArrowLeft } from "lucide-react"

export default function FundingForm() {
  const { state, updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const [formData, setFormData] = useState({
    fundingCategory: state.fundingCategory || "",
    fundingAmount: state.fundingAmount || "",
    timeline: state.timeline || "",
    useOfFunds: state.useOfFunds || "",
    equityOffer: state.equityOffer || "",
  })

  const handleSubmit = () => {
    updateState(formData)
    earnTokens(35, "Completed funding application")
    completeStep("funding-form")
    goToStep("pitch-deck-creation")
  }

  const handleBack = () => {
    goToStep("funding-decision")
  }

  const isFormValid = formData.fundingCategory && formData.fundingAmount && formData.timeline && formData.useOfFunds

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
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl">Funding Requirements</CardTitle>
              <p className="text-gray-600">Tell us about your funding needs</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Funding Stage *</label>
            <select
              value={formData.fundingCategory}
              onChange={(e) => setFormData({ ...formData, fundingCategory: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select funding stage...</option>
              <option value="pre-seed">Pre-Seed ($10K - $250K)</option>
              <option value="seed">Seed ($250K - $2M)</option>
              <option value="series-a">Series A ($2M - $15M)</option>
              <option value="series-b">Series B ($15M - $50M)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount Needed *</label>
            <Input
              type="text"
              value={formData.fundingAmount}
              onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
              placeholder="e.g., $500,000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equity to Offer (%)</label>
            <Input
              type="number"
              value={formData.equityOffer}
              onChange={(e) => setFormData({ ...formData, equityOffer: e.target.value })}
              placeholder="e.g., 15"
              min="1"
              max="49"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select timeline...</option>
              <option value="immediate">Immediately (0-1 month)</option>
              <option value="3-months">Within 3 months</option>
              <option value="6-months">Within 6 months</option>
              <option value="12-months">Within 12 months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Use of Funds *</label>
            <Textarea
              value={formData.useOfFunds}
              onChange={(e) => setFormData({ ...formData, useOfFunds: e.target.value })}
              placeholder="Describe how you plan to use the funding..."
              className="min-h-[100px]"
              required
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            size="lg"
          >
            Continue to Pitch Deck Creation
          </Button>

          {!isFormValid && (
            <p className="text-sm text-red-500 text-center">Please fill in all required fields to continue</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

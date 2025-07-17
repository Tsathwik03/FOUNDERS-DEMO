"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, ArrowLeft } from "lucide-react"

export default function ProgressTracking() {
  const { state, updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const [trackingData, setTrackingData] = useState({
    userTraction: state.userTraction || "",
    monthlyUsers: state.monthlyUsers || "",
    revenue: state.revenue || "",
    growthRate: state.growthRate || "",
    keyMetrics: state.keyMetrics || "",
  })

  const handleSubmit = () => {
    updateState(trackingData)
    earnTokens(30, "Completed progress tracking setup")
    completeStep("progress-tracking")
    goToStep("dashboard")
  }

  const handleBack = () => {
    goToStep("mentorship-options")
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
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl">Progress Tracking Setup</CardTitle>
              <p className="text-gray-600">Set up tracking for user traction, CRM portal, and proof of work</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current User Traction</label>
            <Input
              value={trackingData.userTraction}
              onChange={(e) => setTrackingData({ ...trackingData, userTraction: e.target.value })}
              placeholder="e.g., 1000 active users, 500 signups"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Active Users</label>
            <Input
              type="number"
              value={trackingData.monthlyUsers}
              onChange={(e) => setTrackingData({ ...trackingData, monthlyUsers: e.target.value })}
              placeholder="Number of monthly active users"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue ($)</label>
            <Input
              type="number"
              value={trackingData.revenue}
              onChange={(e) => setTrackingData({ ...trackingData, revenue: e.target.value })}
              placeholder="Monthly recurring revenue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Growth Rate (%)</label>
            <Input
              type="number"
              value={trackingData.growthRate}
              onChange={(e) => setTrackingData({ ...trackingData, growthRate: e.target.value })}
              placeholder="Monthly growth rate percentage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Metrics & Proof of Work</label>
            <Textarea
              value={trackingData.keyMetrics}
              onChange={(e) => setTrackingData({ ...trackingData, keyMetrics: e.target.value })}
              placeholder="Describe your key metrics, achievements, and proof of work..."
              rows={4}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">CRM Portal Integration</h3>
            <p className="text-blue-700 text-sm">
              We'll set up a smart traction tracking system to monitor your progress and provide insights for investors.
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            size="lg"
          >
            Complete Setup & Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

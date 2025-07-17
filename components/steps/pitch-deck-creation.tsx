"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, ArrowLeft } from "lucide-react"

export default function PitchDeckCreation() {
  const { state, updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const [formData, setFormData] = useState({
    companyName: state.companyName || "",
    hasWebsite: state.hasWebsite,
    websiteUrl: state.websiteUrl || "",
    isRegistered: state.isRegistered,
  })

  const handleSubmit = () => {
    updateState(formData)
    earnTokens(50, "Completed pitch deck setup")
    completeStep("pitch-deck-creation")
    goToStep("investor-connection")
  }

  const handleBack = () => {
    goToStep("funding-form")
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
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Pitch Deck Creation</CardTitle>
              <p className="text-gray-600">Create your comprehensive pitch deck</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <Input
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Your company name"
            />
          </div>

          <div>
            <p className="font-medium mb-3">Do you have a live website?</p>
            <div className="flex gap-4 mb-4">
              <Button
                variant={formData.hasWebsite === true ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, hasWebsite: true })}
              >
                Yes, I have a website
              </Button>
              <Button
                variant={formData.hasWebsite === false ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, hasWebsite: false })}
              >
                No website yet
              </Button>
            </div>

            {formData.hasWebsite && (
              <Input
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="mt-2"
              />
            )}
          </div>

          <div>
            <p className="font-medium mb-3">Is your company registered?</p>
            <div className="flex gap-4 mb-4">
              <Button
                variant={formData.isRegistered === true ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, isRegistered: true })}
              >
                Yes, company is registered
              </Button>
              <Button
                variant={formData.isRegistered === false ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, isRegistered: false })}
              >
                No, not registered yet
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Complete Pitch Deck Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

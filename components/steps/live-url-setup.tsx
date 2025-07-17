"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Globe, ArrowLeft, ExternalLink, Rocket } from "lucide-react"

export default function LiveUrlSetup() {
  const { state, updateState, goToStep, earnTokens, completeStep } = useFounderContext()

  const [urlData, setUrlData] = useState({
    websiteUrl: state.websiteUrl || "",
    websiteType: "",
    description: "",
    features: "",
    techStack: "",
    launchDate: "",
  })

  const handleSave = () => {
    updateState({
      hasWebsite: true,
      websiteUrl: urlData.websiteUrl,
    })
    earnTokens(35, "Set up live URL")
    completeStep("live-url-setup")
    goToStep("idea-strategy")
  }

  const handleBack = () => {
    goToStep("idea-strategy")
  }

  const websiteTypes = [
    { id: "landing", title: "Landing Page", description: "Simple page to capture interest" },
    { id: "mvp", title: "MVP Product", description: "Minimum viable product" },
    { id: "beta", title: "Beta Version", description: "Beta testing version" },
    { id: "full", title: "Full Product", description: "Complete product launch" },
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
            <Globe className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle className="text-2xl">Live URL Setup</CardTitle>
              <p className="text-gray-600">Deploy your MVP or landing page to get online presence</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            <div className="flex gap-2">
              <Input
                value={urlData.websiteUrl}
                onChange={(e) => setUrlData({ ...urlData, websiteUrl: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="flex-1"
              />
              {urlData.websiteUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={urlData.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Website Type</label>
            <div className="grid md:grid-cols-2 gap-3">
              {websiteTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={urlData.websiteType === type.id ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-start text-left"
                  onClick={() => setUrlData({ ...urlData, websiteType: type.id })}
                >
                  <h4 className="font-semibold">{type.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              value={urlData.description}
              onChange={(e) => setUrlData({ ...urlData, description: e.target.value })}
              placeholder="Describe what your website/product does..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
            <Textarea
              value={urlData.features}
              onChange={(e) => setUrlData({ ...urlData, features: e.target.value })}
              placeholder="List the main features of your product..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
            <Input
              value={urlData.techStack}
              onChange={(e) => setUrlData({ ...urlData, techStack: e.target.value })}
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Launch Date</label>
            <Input
              type="date"
              value={urlData.launchDate}
              onChange={(e) => setUrlData({ ...urlData, launchDate: e.target.value })}
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Deployment Assistance</h3>
            <p className="text-green-700 text-sm mb-3">
              Need help deploying? We can assist with hosting on Vercel, Netlify, or other platforms.
            </p>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Rocket className="h-4 w-4" />
              Get Deployment Help
            </Button>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            size="lg"
          >
            Save Live URL Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

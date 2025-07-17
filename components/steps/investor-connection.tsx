"use client"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import AppLayout from "../layout/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Search } from "lucide-react"

export default function InvestorConnection() {
  const { goToStep, earnTokens, completeStep } = useFounderContext()
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([])

  const personalityTypes = [
    { id: "director", label: "Director", checked: true },
    { id: "thinker", label: "Thinker", checked: false },
    { id: "relater", label: "Relater", checked: false },
    { id: "socializer", label: "Socializer", checked: false },
  ]

  const organizations = [
    { id: "self-employed", label: "Self Employed", checked: true },
    { id: "startup", label: "Start-up", checked: false },
    { id: "sme", label: "SME", checked: false },
    { id: "enterprise", label: "Enterprise", checked: false },
    { id: "ngo", label: "NGO", checked: false },
    { id: "govt", label: "Govt", checked: false },
  ]

  const locations = [
    { id: "mumbai", label: "Mumbai", checked: false },
    { id: "delhi", label: "Delhi", checked: false },
    { id: "bangalore", label: "Bangalore", checked: false },
    { id: "pune", label: "Pune", checked: false },
    { id: "hyderabad", label: "Hyderabad", checked: false },
    { id: "chennai", label: "Chennai", checked: false },
  ]

  const availability = [
    { id: "weekdays", label: "Weekdays", checked: false },
    { id: "weekends", label: "Weekends", checked: false },
    { id: "evenings", label: "Evenings", checked: false },
    { id: "flexible", label: "Flexible", checked: false },
  ]

  const handleSubmit = () => {
    earnTokens(40, "Connected with investors")
    completeStep("investor-connection")
    goToStep("file-uploader")
  }

  const handleBack = () => {
    goToStep("pitch-deck-creation")
  }

  return (
    <AppLayout title="Team, Investor and Mentor Search">
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

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">SEARCH PEOPLE</Button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">PERSONALITY TYPE</h3>
              <div className="space-y-2">
                {personalityTypes.map((type) => (
                  <div key={type.id} className="flex items-center gap-2">
                    <Checkbox id={type.id} defaultChecked={type.checked} />
                    <label htmlFor={type.id} className="text-sm text-gray-700">
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">ORGANIZATION</h3>
              <div className="space-y-2">
                {organizations.map((org) => (
                  <div key={org.id} className="flex items-center gap-2">
                    <Checkbox id={org.id} defaultChecked={org.checked} />
                    <label htmlFor={org.id} className="text-sm text-gray-700">
                      {org.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">LOCATION</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center gap-2">
                    <Checkbox id={location.id} defaultChecked={location.checked} />
                    <label htmlFor={location.id} className="text-sm text-gray-700">
                      {location.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">AVAILABILITY</h3>
              <div className="space-y-2">
                {availability.map((avail) => (
                  <div key={avail.id} className="flex items-center gap-2">
                    <Checkbox id={avail.id} defaultChecked={avail.checked} />
                    <label htmlFor={avail.id} className="text-sm text-gray-700">
                      {avail.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6">
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-1">Profile {index + 1}</h4>
                  <p className="text-xs text-gray-600 mb-3">Role Description</p>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
            Continue to File Upload
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

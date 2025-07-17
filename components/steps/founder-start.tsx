"use client"

import { useFounderContext } from "../contexts/founder-context"
import AppLayout from "../layout/app-layout"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function FounderStart() {
  const { goToStep } = useFounderContext()

  const handleStart = () => {
    goToStep("experience-check")
  }

  return (
    <AppLayout title="Sign Up">
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Side - Content */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            {/* Placeholder Image */}
            <div className="w-64 h-48 border-2 border-gray-300 rounded-lg mb-8 mx-auto flex items-center justify-center">
              <div className="text-gray-400">
                <div className="w-32 h-32 border border-gray-300 rounded"></div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">LOREM IPSUM IS TEXT</h1>
            <p className="text-gray-600 leading-relaxed">
              LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING TYPESETTING IS LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE
              PRINTING TYPESETTING IS
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-96 bg-white p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">SIGN UP</h2>
            <p className="text-sm text-gray-600 mb-6">YOU HAVE ALREADY ACCOUNT? HIT THE SIGN IN BUTTON</p>

            <div className="flex gap-2 justify-center mb-8">
              <Button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-full" onClick={handleStart}>
                SIGN UP
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 px-6 py-2 rounded-full bg-transparent">
                SIGN IN
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-700 mb-6 uppercase tracking-wide">
                CATEGORIZE FOUNDERS BASED ON STARTUP KNOWLEDGE.
              </h3>
            </div>

            {/* Question 1 */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700 text-center">HAVE YOU LAUNCHED A STARTUP BEFORE?</p>
              <div className="flex justify-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="launched" value="yes" className="text-gray-600" />
                  <span className="text-sm text-gray-700">YES</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="launched" value="no" className="text-gray-600" />
                  <span className="text-sm text-gray-700">NO</span>
                </label>
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700 text-center">
                ARE YOU FAMILIAR WITH PRODUCT-MARKET FIT, MVP, AND FUNDRAISING?
              </p>
              <div className="flex justify-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="familiar" value="yes" className="text-gray-600" />
                  <span className="text-sm text-gray-700">YES</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="familiar" value="no" className="text-gray-600" />
                  <span className="text-sm text-gray-700">NO</span>
                </label>
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700 text-center">
                WHAT STAGE IS YOUR CURRENT IDEA/STARTUP IN?
              </p>
              <div className="flex justify-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="stage" value="yes" className="text-gray-600" />
                  <span className="text-sm text-gray-700">YES</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="stage" value="no" className="text-gray-600" />
                  <span className="text-sm text-gray-700">NO</span>
                </label>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-6">
              <Button
                onClick={handleStart}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-full font-medium"
              >
                NEXT
              </Button>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-4">
              <Checkbox id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                I AGREE TO OUR <span className="underline">PRIVACY POLICY</span> &{" "}
                <span className="underline">TERMS & CONDITION</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

"use client"

import { useFounderContext } from "./contexts/founder-context"
import FounderStart from "./steps/founder-start"
import ExperienceCheck from "./steps/experience-check"
import StartupStageSelector from "./steps/startup-stage-selector"
import IdeaStatusCheck from "./steps/idea-status-check"
import IdeaStrategy from "./steps/idea-strategy"
import DomainSelection from "./steps/domain-selection"
import AIAgentsHelp from "./steps/ai-agents-help"
import CofounderDecision from "./steps/cofounder-decision"
import FundingDecision from "./steps/funding-decision"
import FundingForm from "./steps/funding-form"
import PitchDeckCreation from "./steps/pitch-deck-creation"
import InvestorConnection from "./steps/investor-connection"
import FileUploader from "./steps/file-uploader"
import MentorshipOptions from "./steps/mentorship-options"
import ProgressTracking from "./steps/progress-tracking"
import Dashboard from "./steps/dashboard"
import PitchDeckBuilder from "./steps/pitch-deck-builder"
import LiveUrlSetup from "./steps/live-url-setup"
import DocumentationBuilder from "./steps/documentation-builder"
import EarlyTractionSetup from "./steps/early-traction-setup"

export default function FounderJourney() {
  const { state } = useFounderContext()

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case "founder-start":
        return <FounderStart />
      case "experience-check":
        return <ExperienceCheck />
      case "startup-stage-selector":
        return <StartupStageSelector />
      case "idea-status-check":
        return <IdeaStatusCheck />
      case "idea-strategy":
        return <IdeaStrategy />
      case "domain-selection":
        return <DomainSelection />
      case "ai-agents-help":
        return <AIAgentsHelp />
      case "cofounder-decision":
        return <CofounderDecision />
      case "funding-decision":
        return <FundingDecision />
      case "funding-form":
        return <FundingForm />
      case "pitch-deck-creation":
        return <PitchDeckCreation />
      case "investor-connection":
        return <InvestorConnection />
      case "file-uploader":
        return <FileUploader />
      case "mentorship-options":
        return <MentorshipOptions />
      case "progress-tracking":
        return <ProgressTracking />
      case "dashboard":
        return <Dashboard />
      case "pitch-deck-builder":
        return <PitchDeckBuilder />
      case "live-url-setup":
        return <LiveUrlSetup />
      case "documentation-builder":
        return <DocumentationBuilder />
      case "early-traction-setup":
        return <EarlyTractionSetup />
      default:
        return <FounderStart />
    }
  }

  return <div className="min-h-screen">{renderCurrentStep()}</div>
}

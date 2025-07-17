"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  TrendingUp,
  Zap,
  MessageCircle,
  Send,
  Bot,
  User,
  ArrowLeft,
  Lightbulb,
  Target,
  Users,
  Rocket,
  Brain,
} from "lucide-react"

interface StartupIdea {
  id: number
  title: string
  description: string
  marketSize: string
  difficulty: string
  trendScore: number
  tags: string[]
  reasoning: string
}

interface Message {
  id: number
  type: "ai" | "user"
  content: string
  timestamp: Date
  options?: string[]
  step?: string
  ideas?: StartupIdea[]
}

interface AIIdeaGeneratorProps {
  domain: string
  onIdeaSelect: (idea: StartupIdea) => void
  onBack?: () => void
  lokaTokens: { available: number; spent: number }
  onSpendTokens: (amount: number, reason: string) => void
  onEarnTokens: (amount: number, reason: string) => void
}

const domainNames: Record<string, string> = {
  AI: "Artificial Intelligence",
  Web3: "Web3 & Blockchain",
  Fintech: "Financial Technology",
  B2B: "Business to Business",
  C4S: "Consumer for Social",
  Other: "Other Domain",
}

export default function AIIdeaGenerator({
  domain,
  onIdeaSelect,
  onBack,
  lokaTokens,
  onSpendTokens,
  onEarnTokens,
}: AIIdeaGeneratorProps) {
  const [selectedIdea, setSelectedIdea] = useState<StartupIdea | null>(null)
  const [showChatbot, setShowChatbot] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatStep, setChatStep] = useState("greeting")
  const [userResponses, setUserResponses] = useState<Record<string, string>>({})
  const [conversationFlow, setConversationFlow] = useState(0)

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const startChatbot = () => {
    if (lokaTokens.available < 5) {
      alert("You need at least 5 Loka tokens to use AI assistance")
      return
    }

    setShowChatbot(true)
    onSpendTokens(5, "AI Idea Generation")

    const initialMessages: Message[] = [
      {
        id: 1,
        type: "ai",
        content: `Hi there! 👋 I'm your AI startup advisor. I see you're interested in the ${domainNames[domain] || domain} domain. I'm here to help you discover amazing opportunities!`,
        timestamp: new Date(),
      },
      {
        id: 2,
        type: "ai",
        content: `Let me ask you a few questions to understand your interests and generate personalized startup ideas. This will help me create ideas that match your skills and passion! 🚀`,
        timestamp: new Date(),
      },
    ]

    setMessages(initialMessages)
    setChatStep("greeting")
    setConversationFlow(0)

    setTimeout(() => {
      askNextQuestion()
    }, 2000)
  }

  const questions = [
    {
      step: "background",
      question:
        "First, tell me about your background. Are you more technical (coding, engineering) or business-oriented (marketing, sales, management)?",
      options: ["Technical Background", "Business Background", "Both Technical & Business", "Neither - I'm exploring"],
    },
    {
      step: "experience",
      question: "What's your experience level with startups and the tech industry?",
      options: ["Complete beginner", "Some experience", "Experienced professional", "Serial entrepreneur"],
    },
    {
      step: "problems",
      question: `What problems in ${domain} frustrate you the most or seem unsolved?`,
      options: ["Write custom response", "Not sure yet", "Multiple problems", "One specific problem"],
    },
    {
      step: "target-users",
      question: "Who would you most like to help with your startup?",
      options: ["Individual consumers", "Small businesses", "Large enterprises", "Other startups", "Everyone"],
    },
    {
      step: "business-model",
      question: "How would you prefer to make money?",
      options: ["Subscription/SaaS", "One-time purchases", "Advertising", "Commission/Marketplace", "Not sure yet"],
    },
  ]

  const askNextQuestion = () => {
    if (conversationFlow < questions.length) {
      const currentQuestion = questions[conversationFlow]

      setTimeout(() => {
        const questionMessage: Message = {
          id: messages.length + 1,
          type: "ai",
          content: currentQuestion.question,
          timestamp: new Date(),
          options: currentQuestion.options,
          step: currentQuestion.step,
        }
        setMessages((prev) => [...prev, questionMessage])
        setChatStep(currentQuestion.step)
      }, 1000)
    } else {
      setTimeout(() => {
        generatePersonalizedIdeas()
      }, 1000)
    }
  }

  const handleOptionSelect = (option: string, step: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: option,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    setUserResponses((prev) => ({ ...prev, [step]: option }))

    setTimeout(() => {
      const acknowledgments = [
        "Great choice! That helps me understand you better.",
        "Perfect! This gives me good insight into your preferences.",
        "Excellent! I'm getting a clearer picture of what might work for you.",
        "Wonderful! This information is very helpful.",
        "Fantastic! I can already see some interesting possibilities.",
      ]

      const ackMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: acknowledgments[Math.floor(Math.random() * acknowledgments.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, ackMessage])

      setConversationFlow((prev) => prev + 1)
      setTimeout(() => {
        askNextQuestion()
      }, 1500)
    }, 800)
  }

  const generatePersonalizedIdeas = () => {
    setIsTyping(true)

    setTimeout(() => {
      const analysisMessage: Message = {
        id: messages.length + 1,
        type: "ai",
        content: `Perfect! Based on our conversation, I've analyzed your responses and I'm now generating personalized ${domain} startup ideas that match your profile. Give me a moment to craft something special for you... 🤔💭`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, analysisMessage])
      setIsTyping(false)

      setTimeout(() => {
        const ideas = createPersonalizedIdeas()
        const ideaMessage: Message = {
          id: messages.length + 2,
          type: "ai",
          content: `🎉 Here are 3 personalized ${domain} startup ideas crafted specifically for you based on your background, experience, and preferences:`,
          timestamp: new Date(),
          ideas: ideas,
        }
        setMessages((prev) => [...prev, ideaMessage])
        setChatStep("idea-selection")
      }, 3000)
    }, 1000)
  }

  const createPersonalizedIdeas = (): StartupIdea[] => {
    const domainSpecificIdeas: Record<string, StartupIdea[]> = {
      AI: [
        {
          id: 1,
          title: "AI-Powered Personal Learning Assistant",
          description:
            "An intelligent tutoring system that adapts to individual learning styles, creates personalized study plans, and provides real-time feedback for students and professionals.",
          marketSize: "Large ($5B+)",
          difficulty: userResponses.background?.includes("Technical") ? "Medium" : "High",
          trendScore: 94,
          tags: ["EdTech", "AI", "Personalization", "SaaS"],
          reasoning: `Based on your ${userResponses.background || "background"} and interest in helping ${userResponses["target-users"] || "people"}, this AI solution addresses the growing need for personalized education.`,
        },
        {
          id: 2,
          title: "Smart Business Process Automation Platform",
          description:
            "AI-driven platform that analyzes business workflows and automatically creates custom automation solutions without requiring coding knowledge.",
          marketSize: "Large ($8B+)",
          difficulty: "High",
          trendScore: 89,
          tags: ["Business Automation", "No-Code", "AI", "Enterprise"],
          reasoning: `Perfect for your ${userResponses.experience || "experience level"} and focus on ${userResponses["target-users"] || "business solutions"}. Automation is a massive trend.`,
        },
        {
          id: 3,
          title: "AI Health & Wellness Coach",
          description:
            "Personalized AI coach that combines health data, lifestyle patterns, and behavioral psychology to provide customized wellness recommendations.",
          marketSize: "Medium ($2B+)",
          difficulty: "Medium",
          trendScore: 87,
          tags: ["HealthTech", "AI", "Wellness", "Mobile"],
          reasoning: `Aligns with your interest in ${userResponses.problems || "solving real problems"} and the growing health consciousness trend.`,
        },
      ],
      Web3: [
        {
          id: 1,
          title: "Decentralized Freelancer Marketplace",
          description:
            "Blockchain-based platform connecting freelancers and clients with smart contracts for automatic payments, reputation tracking, and dispute resolution.",
          marketSize: "Large ($3B+)",
          difficulty: userResponses.background?.includes("Technical") ? "Medium" : "High",
          trendScore: 85,
          tags: ["DeFi", "Marketplace", "Smart Contracts", "Freelancing"],
          reasoning: `Matches your ${userResponses.background || "background"} and addresses trust issues in freelancing with blockchain transparency.`,
        },
        {
          id: 2,
          title: "NFT-Based Digital Identity Platform",
          description:
            "Secure digital identity solution using NFTs to verify credentials, certificates, and achievements across different platforms and institutions.",
          marketSize: "Medium ($1.5B+)",
          difficulty: "High",
          trendScore: 82,
          tags: ["NFT", "Identity", "Security", "Verification"],
          reasoning: `Perfect for your ${userResponses.experience || "experience"} and the growing need for digital identity solutions.`,
        },
        {
          id: 3,
          title: "Decentralized Content Creator Economy",
          description:
            "Platform where creators can tokenize their content, fans can invest in creators' success, and revenue is shared transparently through smart contracts.",
          marketSize: "Large ($4B+)",
          difficulty: "High",
          trendScore: 88,
          tags: ["Creator Economy", "Tokenization", "DeFi", "Social"],
          reasoning: `Aligns with your focus on ${userResponses["target-users"] || "helping creators"} and the booming creator economy.`,
        },
      ],
      Fintech: [
        {
          id: 1,
          title: "AI-Powered Personal Finance Coach",
          description:
            "Smart financial advisor that analyzes spending patterns, provides personalized budgeting advice, and automatically optimizes investments for individual users.",
          marketSize: "Large ($6B+)",
          difficulty: "Medium",
          trendScore: 91,
          tags: ["Personal Finance", "AI", "Budgeting", "Investment"],
          reasoning: `Perfect match for your ${userResponses.background || "background"} and the universal need for better financial management.`,
        },
        {
          id: 2,
          title: "SME Invoice Financing Platform",
          description:
            "Digital platform that provides instant cash flow solutions for small businesses by purchasing their invoices at competitive rates using AI risk assessment.",
          marketSize: "Large ($10B+)",
          difficulty: userResponses.background?.includes("Business") ? "Medium" : "High",
          trendScore: 86,
          tags: ["B2B", "Invoice Financing", "SME", "Cash Flow"],
          reasoning: `Addresses the cash flow problems you mentioned and targets ${userResponses["target-users"] || "small businesses"}.`,
        },
        {
          id: 3,
          title: "Micro-Investment Social Platform",
          description:
            "Social investing app where users can start investing with small amounts, follow successful investors, and learn through community-driven education.",
          marketSize: "Medium ($3B+)",
          difficulty: "Medium",
          trendScore: 84,
          tags: ["Social Investing", "Micro-Investment", "Education", "Community"],
          reasoning: `Combines your interest in ${userResponses.problems || "financial accessibility"} with social learning.`,
        },
      ],
    }

    return domainSpecificIdeas[domain] || domainSpecificIdeas.AI
  }

  const selectIdeaFromChat = (idea: StartupIdea) => {
    setSelectedIdea(idea)
    onIdeaSelect(idea)

    const selectionMessage: Message = {
      id: messages.length + 1,
      type: "ai",
      content: `🎉 Excellent choice! "${idea.title}" is a fantastic opportunity with huge potential. Here's why I think this is perfect for you:

✅ **Market Fit**: ${idea.reasoning}
📊 **Market Size**: ${idea.marketSize}
🎯 **Difficulty Level**: ${idea.difficulty}
📈 **Trend Score**: ${idea.trendScore}%

You're all set to move forward with this idea! Good luck! 🚀`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, selectionMessage])
    onEarnTokens(25, "Selected AI-generated idea")

    setTimeout(() => {
      setShowChatbot(false)
    }, 4000)
  }

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const messageContent = currentMessage
    setCurrentMessage("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: `That's a thoughtful question about "${messageContent}". Let me elaborate on that aspect for you.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const quickQuestions = [
    "What are the current market trends?",
    "How do I validate this idea?",
    "What's the competition like?",
    "How much funding would I need?",
    "What skills do I need for this?",
    "Can you explain this idea more?",
    "What are the risks?",
    "How long to build an MVP?",
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AI Startup Idea Generator
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Get AI-powered startup ideas in the {domainNames[domain] || domain} domain
                </CardDescription>
              </div>
            </div>
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2 hover:bg-white/80 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {!selectedIdea ? (
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="h-10 w-10 text-purple-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {showChatbot ? "AI Conversation Active" : "Ready for AI Idea Generation"}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {showChatbot
                    ? `Our AI is chatting with you about ${domainNames[domain] || domain} startup ideas`
                    : `Generate personalized startup ideas for ${domainNames[domain] || domain}`}
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>💰 Available: {lokaTokens.available} Loka Tokens</span>
                </div>

                <Button
                  onClick={startChatbot}
                  disabled={lokaTokens.available < 5}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {showChatbot ? "Chatbot Active" : "Start AI Chat"} (5 Tokens)
                </Button>

                {lokaTokens.available < 5 && (
                  <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                    You need 5 Loka tokens. Complete more steps to earn tokens!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="p-2 bg-green-500 rounded-full">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-green-800 text-lg">Idea Selected!</span>
                  </div>
                  <p className="text-sm text-green-700">You've selected "{selectedIdea.title}" as your startup idea.</p>
                  <p className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full inline-block">
                    🪙 +25 Loka Tokens earned! Next: Team status and co-founder needs
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* AI Chatbot Dialog */}
      <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-600" />
              AI Startup Advisor - {domainNames[domain]} Ideas
            </DialogTitle>
            <DialogDescription>
              Personalized conversation to generate the perfect startup idea for you
            </DialogDescription>
          </DialogHeader>

          {/* Chat Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 border rounded-lg bg-gray-50/50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.type === "ai" && (
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-4 w-4 text-purple-600" />
                        </div>
                      )}
                      {message.type === "user" && (
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>

                        {/* Render option buttons */}
                        {message.options && (
                          <div className="mt-4 space-y-2">
                            {message.options.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-xs bg-white hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
                                onClick={() => handleOptionSelect(option, message.step!)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        )}

                        {/* Render startup ideas */}
                        {message.ideas && (
                          <div className="mt-6 space-y-4">
                            {message.ideas.map((idea) => (
                              <Card
                                key={idea.id}
                                className="bg-white border-2 hover:border-purple-200 transition-colors shadow-sm"
                              >
                                <CardHeader className="pb-3">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                                      {idea.title}
                                    </CardTitle>
                                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      {idea.trendScore}%
                                    </Badge>
                                  </div>
                                </CardHeader>

                                <CardContent className="pt-0 space-y-4">
                                  <p className="text-xs text-gray-600 leading-relaxed">{idea.description}</p>

                                  <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                      <Target className="h-3 w-3 text-blue-500" />
                                      <span className="font-medium">Market:</span>
                                      <span>{idea.marketSize}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                      <Users className="h-3 w-3 text-green-500" />
                                      <span className="font-medium">Difficulty:</span>
                                      <span>{idea.difficulty}</span>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {idea.tags.map((tag, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="text-xs text-gray-600 p-3 bg-purple-50 rounded-lg border border-purple-100">
                                    <div className="flex items-start gap-2">
                                      <Brain className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <strong className="text-purple-700">Why this fits you:</strong>
                                        <p className="mt-1">{idea.reasoning}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <Button
                                    size="sm"
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                    onClick={() => selectIdeaFromChat(idea)}
                                  >
                                    <Rocket className="h-4 w-4 mr-2" />
                                    Select This Idea
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 max-w-[80%]">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {chatStep === "idea-selection" && (
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-3 font-medium">Quick questions about the ideas:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-white hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                    onClick={() => setCurrentMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="flex gap-3 p-4 border-t bg-white">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask me anything about these startup ideas..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              disabled={isTyping}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

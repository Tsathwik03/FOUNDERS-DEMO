"use client"

import type React from "react"

import { useState } from "react"
import { useFounderContext } from "../contexts/founder-context"
import { Button } from "@/components/ui/button"
import {
  Home,
  Lightbulb,
  Users,
  FileText,
  Calendar,
  BarChart3,
  MessageCircle,
  LogOut,
  Bell,
  Search,
  User,
} from "lucide-react"

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  const { state } = useFounderContext()
  const [activeNav, setActiveNav] = useState("dashboard")

  const navigationItems = [
    { id: "dashboard", label: "DASHBOARD", icon: Home },
    { id: "projects", label: "MY PROJECTS", icon: Lightbulb },
    { id: "clients", label: "MY CLIENTS", icon: Users },
    { id: "advisor", label: "MY ADVISOR", icon: User },
    { id: "calendar", label: "CALENDAR", icon: Calendar },
    { id: "tasks", label: "TASKS", icon: FileText },
    { id: "valuation", label: "TRACK VALUATION", icon: BarChart3 },
    { id: "chat", label: "CHAT", icon: MessageCircle },
    { id: "logout", label: "LOGOUT", icon: LogOut },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-semibold text-gray-800">Lokachakra</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.id

              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-800">{title || "Dashboard"}</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">AKASHGOTRIPATHI.COM</span>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <Button variant="ghost" size="sm">
                  <span className="text-sm">▼</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

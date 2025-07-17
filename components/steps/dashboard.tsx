"use client"

import { useFounderContext } from "../contexts/founder-context"
import AppLayout from "../layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, TrendingUp, FileText, Target, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

export default function Dashboard() {
  const { state } = useFounderContext()

  const stats = [
    { label: "TOTAL PROJECTS", value: "112", icon: Target },
    { label: "COMPLETED", value: "50", icon: CheckCircle },
    { label: "IN PROGRESS", value: "50", icon: TrendingUp },
    { label: "HOLD", value: "12", icon: FileText },
  ]

  const projects = [
    { name: "E-Commerce", status: "IN PROGRESS", progress: 95 },
    { name: "E-Commerce", status: "IN PROGRESS", progress: 95 },
    { name: "E-Commerce", status: "IN PROGRESS", progress: 95 },
    { name: "E-Commerce", status: "IN PROGRESS", progress: 95 },
    { name: "E-Commerce", status: "IN PROGRESS", progress: 95 },
    { name: "E-Commerce", status: "IN PROGRESS", progress: 95 },
  ]

  const advisors = [
    { name: "KARAN KHATRI", role: "LEGAL ADVISOR" },
    { name: "KARAN KHATRI", role: "LEGAL ADVISOR" },
    { name: "KARAN KHATRI", role: "LEGAL ADVISOR" },
    { name: "KARAN KHATRI", role: "LEGAL ADVISOR" },
    { name: "KARAN KHATRI", role: "LEGAL ADVISOR" },
  ]

  const meetings = [
    { title: "E-COMMERCE - PRODUCT INFORMATION DISCUSSION", time: "ADMIN DISCUSSION" },
    { title: "E-COMMERCE - PRODUCT INFORMATION DISCUSSION", time: "ADMIN DISCUSSION" },
    { title: "E-COMMERCE - PRODUCT INFORMATION DISCUSSION", time: "ADMIN DISCUSSION" },
    { title: "E-COMMERCE - PRODUCT INFORMATION DISCUSSION", time: "ADMIN DISCUSSION" },
    { title: "E-COMMERCE - PRODUCT INFORMATION DISCUSSION", time: "ADMIN DISCUSSION" },
    { title: "E-COMMERCE - PRODUCT INFORMATION DISCUSSION", time: "ADMIN DISCUSSION" },
  ]

  const calendarDays = [
    ["", "", "", 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, "", "", "", "", "", ""],
  ]

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Active Projects */}
          <Card className="col-span-2 bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                RECENT ACTIVE PROJECTS OVERVIEW
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-sm font-medium text-gray-900 w-24">{project.name}</span>
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                      {project.status}
                    </Badge>
                    <div className="flex-1 max-w-xs">
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Active Advisor */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                RECENT ACTIVE ADVISOR OVERVIEW
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {advisors.map((advisor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{advisor.name}</p>
                    <p className="text-xs text-gray-500">{advisor.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">CALENDAR</CardTitle>
                <div className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4 text-gray-400 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-900">JUNE - 2025</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-500 text-center">
                  {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                    <div key={day} className="py-2">
                      {day}
                    </div>
                  ))}
                </div>
                {calendarDays.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`h-8 flex items-center justify-center text-sm cursor-pointer rounded ${
                          day === 31
                            ? "bg-gray-800 text-white"
                            : day
                              ? "hover:bg-gray-100 text-gray-900"
                              : "text-gray-300"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Meetings */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                TODAY'S MEETINGS OVERVIEW
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {meetings.map((meeting, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="h-3 w-3 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 leading-tight">{meeting.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{meeting.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Clients Overview */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                CLIENTS OVERVIEW
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-center gap-4 h-32">
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-green-500 rounded-t" style={{ height: "80px" }}></div>
                  <span className="text-xs text-gray-600 mt-2">HAPPY CLIENTS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-orange-500 rounded-t" style={{ height: "40px" }}></div>
                  <span className="text-xs text-gray-600 mt-2">PASSIVE CLIENTS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-red-500 rounded-t" style={{ height: "20px" }}></div>
                  <span className="text-xs text-gray-600 mt-2">DETRACTOR CLIENTS</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

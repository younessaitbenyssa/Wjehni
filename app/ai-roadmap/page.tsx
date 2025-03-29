"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw, Download, ArrowLeft, MessageCircle } from "lucide-react"
import ProfileForm from "@/components/profile-form"
import ChatInterface from "@/components/chat-interface"
import DynamicRoadmap from "@/components/dynamic-roadmap"

export default function AIRoadmapPage() {
  const [showMindMap, setShowMindMap] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [pathDetails, setPathDetails] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roadmapData, setRoadmapData] = useState<any>(null)
  const [profileData, setProfileData] = useState<any>(null)

  const handleProfileSubmit = async (data: any) => {
    setLoading(true)
    setError(null)
    setProfileData(data)

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: data }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.details || result.error || "Failed to fetch roadmap data")
      }

      if (!result.roadmap) {
        throw new Error("API response missing roadmap data")
      }

      setRoadmapData(result.roadmap)
      setShowMindMap(true)
    } catch (error) {
      console.error("Error fetching roadmap:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleNodeClick = (nodeId: string, nodeData: any) => {
    setSelectedPath(nodeId)
    setPathDetails(nodeData)
  }

  const handleExportImage = () => {
    alert("This would export the mind map as an image in a production app.")
  }

  if (!showMindMap) {
    return <ProfileForm onSubmit={handleProfileSubmit} />
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Generating your educational paths...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Your Educational Paths</h1>
          <p className="text-red-500 mt-1">{error}</p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Unable to generate your educational roadmap</h2>
            <p className="text-gray-600">
              We encountered an issue while generating your personalized roadmap. This could be due to a temporary
              service disruption or an issue with the AI model.
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setShowMindMap(false)} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Update Profile
            </Button>
            <Link href="/">
              <Button variant="secondary" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Educational Paths</h1>
          <p className="text-muted-foreground mt-1">
            Explore potential educational and career paths based on your profile
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportImage} className="gap-2">
            <Download className="h-4 w-4" /> Export Map
          </Button>
          <Button variant="outline" onClick={() => setShowMindMap(false)} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Update Profile
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowChat(!showChat)}
            className={`gap-2 ${showChat ? "bg-blue-50" : ""}`}
          >
            <MessageCircle className="h-4 w-4" /> Ask Questions
          </Button>
          <Link href="/">
            <Button variant="secondary" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Mind Map - Takes up most of the space */}
        <div className="lg:col-span-9 bg-card rounded-lg shadow-md overflow-hidden" style={{ height: "700px" }}>
          {roadmapData ? (
            <DynamicRoadmap roadmapData={roadmapData} profileData={profileData} onNodeClick={handleNodeClick} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No educational paths to display. Please try refreshing the page.</p>
            </div>
          )}
        </div>

        {/* Path Details and Legend - Takes up less space */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Path Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPath ? (
                <div>
                  <h3 className="text-lg font-semibold">{pathDetails?.label}</h3>
                  <p className="text-muted-foreground mt-1">{pathDetails?.details}</p>

                  {pathDetails?.requirements && (
                    <div className="mt-4">
                      <p className="font-medium">Requirements:</p>
                      <p className="text-muted-foreground">{pathDetails.requirements}</p>
                    </div>
                  )}

                  {pathDetails?.minGrade && (
                    <div className="mt-2">
                      <p className="font-medium">Duration:</p>
                      <p className="text-muted-foreground">{pathDetails.minGrade}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Click on a node in the mind map to see more details about that educational path, school, or career
                  option.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mind Map Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span>Your Profile - Starting point</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>Educational Path - Field of study</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <span>Next Steps - Advanced education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                  <span>Career Options - Potential jobs</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Have questions about educational paths or institutions in Morocco? Click the "Ask Questions" button to
                chat with our educational guide assistant.
              </p>
              <Button onClick={() => setShowChat(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
    </div>
  )
}


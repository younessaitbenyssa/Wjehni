"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MapIcon as Sitemap, ListTree } from "lucide-react"
import DetailedRoadmap from "./detailed-roadmap"
import MindMapRoadmap from "./mind-map-roadmap"

interface InteractiveRoadmapProps {
  roadmap: any
}

export default function InteractiveRoadmap({ roadmap }: InteractiveRoadmapProps) {
  const [viewMode, setViewMode] = useState<string>("detailed")

  return (
    <div className="w-full">
      <Tabs defaultValue="detailed" value={viewMode} onValueChange={setViewMode} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 w-64">
            <TabsTrigger value="detailed" className="flex items-center gap-2">
              <ListTree className="h-4 w-4" />
              <span>Detailed</span>
            </TabsTrigger>
            <TabsTrigger value="mindmap" className="flex items-center gap-2">
              <Sitemap className="h-4 w-4" />
              <span>Mind Map</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="detailed" className="mt-0">
          <DetailedRoadmap roadmap={roadmap} />
        </TabsContent>

        <TabsContent value="mindmap" className="mt-0">
          <MindMapRoadmap roadmap={roadmap} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


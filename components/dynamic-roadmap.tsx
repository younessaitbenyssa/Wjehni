"use client"

import { useEffect } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionLineType,
} from "reactflow"
import "reactflow/dist/style.css"
import "reactflow/dist/base.css"
import { PathNode } from "@/components/path-node"

const nodeTypes = {
  pathNode: PathNode,
}

interface DynamicRoadmapProps {
  roadmapData: any
  profileData: any
  onNodeClick: (nodeId: string, nodeData: any) => void
}

export default function DynamicRoadmap({ roadmapData, profileData, onNodeClick }: DynamicRoadmapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    if (roadmapData && profileData) {
      initializeWithApiData(roadmapData, profileData)
    }
  }, [roadmapData, profileData])

  const initializeWithApiData = (roadmapData: any, profileData: any) => {
    try {
      const apiNodes: Node[] = []
      const apiEdges: Edge[] = []

      apiNodes.push({
        id: "profile",
        type: "pathNode",
        data: {
          label: "Your Profile",
          details: `${profileData?.major}, National: ${profileData?.nationalExamGrade}, Regional: ${profileData?.regionalExamGrade}`,
          type: "start",
        },
        position: { x: 400, y: 0 },
      })

      if (roadmapData.educationalPaths && Array.isArray(roadmapData.educationalPaths)) {
        const pathCount = roadmapData.educationalPaths.length
        const totalWidth = 800 
        const pathSpacing = totalWidth / (pathCount + 1)
        
        roadmapData.educationalPaths.forEach((path: any, pathIndex: number) => {
          const pathId = `path-${pathIndex}`
          const pathX = (pathIndex + 1) * pathSpacing

          
          apiNodes.push({
            id: pathId,
            type: "pathNode",
            data: {
              label: path.pathName,
              details: path.description,
              type: "path",
            },
            position: { x: pathX, y: 120 },
          })

          
          apiEdges.push({
            id: `e-profile-${pathId}`,
            source: "profile",
            target: pathId,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#3b82f6" },
            markerEnd: { type: MarkerType.ArrowClosed },
          })

          
          if (path.institutions && Array.isArray(path.institutions)) {
            const institutionCount = path.institutions.length
            const institutionWidth = 200 
            const institutionSpacing = institutionWidth * institutionCount
            const startX = pathX - institutionSpacing / 2 + institutionWidth / 2

            path.institutions.forEach((institution: any, instIndex: number) => {
              const instId = `inst-${pathIndex}-${instIndex}`
              const instX = startX + instIndex * institutionWidth

              apiNodes.push({
                id: instId,
                type: "pathNode",
                data: {
                  label: institution.name,
                  details: institution.description,
                  requirements: institution.requirements,
                  minGrade: `Duration: ${institution.duration}`,
                  type: "school",
                },
                position: { x: instX, y: 240 },
              })

            
              apiEdges.push({
                id: `e-${pathId}-${instId}`,
                source: pathId,
                target: instId,
                type: "smoothstep",
                style: { stroke: "#22c55e" },
                markerEnd: { type: MarkerType.ArrowClosed },
              })

              if (institution.nextSteps && Array.isArray(institution.nextSteps)) {
                const nextStepCount = institution.nextSteps.length
                const nextStepWidth = 180 // Width allocated per next step
                const nextStepSpacing = nextStepWidth * nextStepCount
                const nextStepStartX = instX - nextStepSpacing / 2 + nextStepWidth / 2

                institution.nextSteps.forEach((nextStep: any, nextStepIndex: number) => {
                  const nextStepId = `next-${pathIndex}-${instIndex}-${nextStepIndex}`
                  const nextStepX = nextStepStartX + nextStepIndex * nextStepWidth

                  apiNodes.push({
                    id: nextStepId,
                    type: "pathNode",
                    data: {
                      label: nextStep.name,
                      details: nextStep.description,
                      requirements: nextStep.requirements,
                      minGrade: `Duration: ${nextStep.duration}`,
                      type: "school",
                    },
                    position: { x: nextStepX, y: 360 },
                  })

                  apiEdges.push({
                    id: `e-${instId}-${nextStepId}`,
                    source: instId,
                    target: nextStepId,
                    type: "smoothstep",
                    style: { stroke: "#8b5cf6" },
                    markerEnd: { type: MarkerType.ArrowClosed },
                  })

                  if (nextStep.careers && Array.isArray(nextStep.careers) && nextStep.careers.length > 0) {
                    
                    const careerNodeId = `career-${pathIndex}-${instIndex}-${nextStepIndex}`
                    const careerDetails = nextStep.careers.join(", ")

                    
                    apiNodes.push({
                      id: careerNodeId,
                      type: "pathNode",
                      data: {
                        label: `Career Options`,
                        details: careerDetails,
                        type: "job",
                      },
                      position: { x: nextStepX, y: 480 },
                    })

                    apiEdges.push({
                      id: `e-${nextStepId}-${careerNodeId}`,
                      source: nextStepId,
                      target: careerNodeId,
                      type: "smoothstep",
                      style: { stroke: "#f59e0b" },
                      markerEnd: { type: MarkerType.ArrowClosed },
                    })
                  }
                })
              }
            })
          }
        })
      }

      setNodes(apiNodes)
      setEdges(apiEdges)
    } catch (error) {
      console.error("Error processing API data:", error)
    }
  }

  const handleNodeClick = (event: any, node: Node) => {
    onNodeClick(node.id, node.data)
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {nodes.length > 0 ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed },
          }}
          connectionLineType={ConnectionLineType.SmoothStep}
          style={{ background: "#f8fafc" }}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>Loading educational paths...</p>
        </div>
      )}
    </div>
  )
}

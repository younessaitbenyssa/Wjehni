import { Handle, Position } from "reactflow"
import { GraduationCap, BookOpen, Briefcase, User } from "lucide-react"

interface PathNodeProps {
  data: {
    label: string
    details?: string
    type: "start" | "path" | "school" | "job"
    requirements?: string
    minGrade?: string
  }
  isConnectable?: boolean
}

export function PathNode({ data, isConnectable }: PathNodeProps) {
  const getNodeStyle = () => {
    switch (data.type) {
      case "start":
        return "bg-blue-50 border-blue-300"
      case "path":
        return "bg-green-50 border-green-300"
      case "school":
        return "bg-purple-50 border-purple-300"
      case "job":
        return "bg-amber-50 border-amber-300"
      default:
        return "bg-gray-50 border-gray-300"
    }
  }

  const getIcon = () => {
    switch (data.type) {
      case "start":
        return <User className="h-4 w-4 text-blue-500" />
      case "path":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "school":
        return <GraduationCap className="h-4 w-4 text-purple-500" />
      case "job":
        return <Briefcase className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <div
      className={`p-3 rounded-lg border shadow-sm ${getNodeStyle()} transition-all hover:shadow-md`}
      style={{ minWidth: "150px", maxWidth: "250px" }}
    >
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 bg-gray-400" />
      <div className="flex items-center gap-2 mb-1">
        {getIcon()}
        <div className="font-medium truncate">{data.label}</div>
      </div>
      {data.details && <div className="text-xs text-gray-600 mt-1">{data.details}</div>}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 bg-gray-400" />
    </div>
  )
}


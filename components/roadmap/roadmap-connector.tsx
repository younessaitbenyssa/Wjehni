import { cn } from "@/lib/utils"

interface RoadmapConnectorProps {
  type?: "vertical" | "horizontal" | "corner-right" | "corner-left"
  color?: "blue" | "yellow" | "green" | "purple" | "orange"
  dashed?: boolean
  className?: string
}

export default function RoadmapConnector({
  type = "vertical",
  color = "blue",
  dashed = false,
  className,
}: RoadmapConnectorProps) {
  const colorClasses = {
    blue: "bg-blue-400",
    yellow: "bg-amber-400",
    green: "bg-green-400",
    purple: "bg-purple-400",
    orange: "bg-orange-400",
  }

  const getConnectorStyles = () => {
    switch (type) {
      case "vertical":
        return "w-1 h-12 mx-auto"
      case "horizontal":
        return "h-1 w-12"
      case "corner-right":
        return "h-12 w-12 border-t border-r rounded-tr-xl border-blue-400 border-dashed"
      case "corner-left":
        return "h-12 w-12 border-t border-l rounded-tl-xl border-blue-400 border-dashed"
      default:
        return "w-1 h-12 mx-auto"
    }
  }

  if (type === "corner-right" || type === "corner-left") {
    return <div className={cn(getConnectorStyles(), className)}></div>
  }

  return (
    <div
      className={cn(getConnectorStyles(), dashed ? "bg-none border border-dashed" : colorClasses[color], className)}
    ></div>
  )
}


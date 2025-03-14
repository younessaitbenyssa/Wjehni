import { cn } from "@/lib/utils"

interface RoadmapBadgeProps {
  text: string
  color?: "blue" | "yellow" | "green" | "purple" | "orange" | "gray"
  className?: string
}

export default function RoadmapBadge({ text, color = "blue", className }: RoadmapBadgeProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-amber-100 text-amber-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    gray: "bg-gray-100 text-gray-800",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colorClasses[color],
        className,
      )}
    >
      {text}
    </span>
  )
}


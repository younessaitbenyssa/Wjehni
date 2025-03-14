"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RoadmapSectionProps {
  title: string
  icon?: ReactNode
  color?: "blue" | "yellow" | "green" | "purple" | "orange"
  className?: string
  children: ReactNode
  index?: number
}

export default function RoadmapSection({
  title,
  icon,
  color = "blue",
  className,
  children,
  index = 0,
}: RoadmapSectionProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    yellow: "bg-amber-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  }

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn("rounded-lg overflow-hidden shadow-md", className)}
    >
      <div className={cn("px-4 py-3 text-white flex items-center gap-2", colorClasses[color])}>
        {icon}
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="bg-white p-4">{children}</div>
    </motion.div>
  )
}


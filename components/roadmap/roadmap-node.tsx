"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RoadmapNodeProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  color?: "blue" | "yellow" | "green" | "purple" | "orange"
  size?: "sm" | "md" | "lg"
  isCompleted?: boolean
  isActive?: boolean
  onClick?: () => void
  className?: string
  children?: ReactNode
  index?: number
}

export default function RoadmapNode({
  title,
  subtitle,
  icon,
  color = "blue",
  size = "md",
  isCompleted = false,
  isActive = false,
  onClick,
  className,
  children,
  index = 0,
}: RoadmapNodeProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:border-blue-300",
    yellow: "bg-amber-50 border-amber-200 hover:border-amber-300",
    green: "bg-green-50 border-green-200 hover:border-green-300",
    purple: "bg-purple-50 border-purple-200 hover:border-purple-300",
    orange: "bg-orange-50 border-orange-200 hover:border-orange-300",
  }

  const sizeClasses = {
    sm: "p-3 text-sm",
    md: "p-4",
    lg: "p-5 text-lg",
  }

  const statusClasses = {
    completed: "border-2 border-green-400",
    active: "border-2 border-blue-500 shadow-md shadow-blue-100",
    default: "border",
  }

  const getStatusClass = () => {
    if (isCompleted) return statusClasses.completed
    if (isActive) return statusClasses.active
    return statusClasses.default
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
      className={cn(
        "rounded-lg transition-all duration-200 cursor-pointer",
        colorClasses[color],
        sizeClasses[size],
        getStatusClass(),
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-grow">
          <h3 className="font-medium leading-tight">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {isCompleted && (
          <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  )
}


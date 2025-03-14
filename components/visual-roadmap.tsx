"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

interface VisualRoadmapProps {
  roadmap: any
}

export default function VisualRoadmap({ roadmap }: VisualRoadmapProps) {
  const [expandedStage, setExpandedStage] = useState<number | null>(null)
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="w-full py-8 px-4">
      <motion.div className="relative min-h-[600px]" variants={containerVariants} initial="hidden" animate="visible">
        {/* Profile Node */}
        <motion.div variants={itemVariants} className="absolute left-1/2 top-4 -translate-x-1/2">
          <Card className="bg-blue-500 text-white p-4 text-center">
            <h3 className="font-bold mb-1">{t("profile.title")}</h3>
            <p className="text-sm">Sciences Math A, 14 Regional, 14 National</p>
          </Card>
        </motion.div>

        {/* Main Paths */}
        <div className="absolute top-40 w-full flex justify-between px-20">
          {[
            {
              title: t("education.engineering"),
              subtitle: t("education.engineering.subtitle"),
            },
            {
              title: t("education.medicine"),
              subtitle: t("education.medicine.subtitle"),
            },
            {
              title: t("education.business"),
              subtitle: t("education.business.subtitle"),
            },
          ].map((path, index) => (
            <motion.div key={path.title} variants={itemVariants} className="text-center">
              <Card className="bg-green-500 text-white p-4">
                <h3 className="font-bold mb-1">{path.title}</h3>
                <p className="text-sm">{path.subtitle}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Schools */}
        <div className="absolute top-80 w-full">
          <Card className="bg-orange-500 text-white p-4">
            <div className="grid grid-cols-6 gap-4 text-center">
              <div>{t("schools.ensa")}</div>
              <div>{t("schools.ensias")}</div>
              <div>{t("schools.emi")}</div>
              <div>{t("schools.fmp")}</div>
              <div>{t("schools.encg")}</div>
              <div>{t("schools.iscae")}</div>
            </div>
          </Card>
        </div>

        {/* Career Paths */}
        <div className="absolute top-[440px] w-full">
          <Card className="bg-purple-500 text-white p-4">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="font-bold mb-2">{t("careers.engineering")}</h4>
                <p className="text-sm">{t("careers.engineering.jobs")}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">{t("careers.medical")}</h4>
                <p className="text-sm">{t("careers.medical.jobs")}</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">{t("careers.business")}</h4>
                <p className="text-sm">{t("careers.business.jobs")}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          {/* Profile to Paths */}
          <line x1="50%" y1="80" x2="25%" y2="160" stroke="#3B82F6" strokeWidth="2" />
          <line x1="50%" y1="80" x2="50%" y2="160" stroke="#3B82F6" strokeWidth="2" />
          <line x1="50%" y1="80" x2="75%" y2="160" stroke="#3B82F6" strokeWidth="2" />

          {/* Paths to Schools */}
          <line x1="25%" y1="220" x2="25%" y2="320" stroke="#22C55E" strokeWidth="2" />
          <line x1="50%" y1="220" x2="50%" y2="320" stroke="#22C55E" strokeWidth="2" />
          <line x1="75%" y1="220" x2="75%" y2="320" stroke="#22C55E" strokeWidth="2" />

          {/* Schools to Careers */}
          <line x1="25%" y1="380" x2="25%" y2="440" stroke="#F97316" strokeWidth="2" />
          <line x1="50%" y1="380" x2="50%" y2="440" stroke="#F97316" strokeWidth="2" />
          <line x1="75%" y1="380" x2="75%" y2="440" stroke="#F97316" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  )
}


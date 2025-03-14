"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  GraduationCap,
  BookOpen,
  Award,
  Briefcase,
  Building,
  Star,
  Target,
  BookMarked,
  Lightbulb,
  CheckCircle2,
  School,
} from "lucide-react"
import RoadmapNode from "./roadmap-node"
import RoadmapSection from "./roadmap-section"
import RoadmapConnector from "./roadmap-connector"
import RoadmapBadge from "./roadmap-badge"

interface DetailedRoadmapProps {
  roadmap: any
}

export default function DetailedRoadmap({ roadmap }: DetailedRoadmapProps) {
  const [expandedEducation, setExpandedEducation] = useState<number | null>(null)
  const [expandedSkills, setExpandedSkills] = useState<number | null>(null)
  const [expandedCareers, setExpandedCareers] = useState<number | null>(null)

  const toggleEducation = (index: number) => {
    setExpandedEducation(expandedEducation === index ? null : index)
  }

  const toggleSkills = (index: number) => {
    setExpandedSkills(expandedSkills === index ? null : index)
  }

  const toggleCareers = (index: number) => {
    setExpandedCareers(expandedCareers === index ? null : index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Additional Moroccan education paths based on the baccalaureate
  const moroccanPaths = [
    {
      title: "EST (École Supérieure de Technologie)",
      duration: "2 Years",
      description: "Technical diploma with practical training in various fields",
      institutions: ["EST Casablanca", "EST Fès", "EST Meknès", "EST Salé"],
      outcomes: ["Technician positions", "Continue to License Professionnelle"],
    },
    {
      title: "BTS (Brevet de Technicien Supérieur)",
      duration: "2 Years",
      description: "Specialized technical training in specific domains",
      institutions: ["Lycées techniques across Morocco"],
      outcomes: ["Specialized Technician", "Technical Assistant"],
    },
    {
      title: "OFPPT Training",
      duration: "1-2 Years",
      description: "Vocational training in practical skills and trades",
      institutions: ["OFPPT centers across Morocco"],
      outcomes: ["Qualified Professional", "Technician Specialist"],
    },
    {
      title: "CPGE (Classes Préparatoires aux Grandes Écoles)",
      duration: "2 Years",
      description: "Intensive preparation for engineering schools entrance exams",
      institutions: ["Lycée Mohammed V", "Lycée Moulay Youssef", "Other preparatory centers"],
      outcomes: ["Engineering Schools: EMI, ENSIAS, INPT, EHTP"],
    },
    {
      title: "FST (Faculté des Sciences et Techniques)",
      duration: "3+2 Years",
      description: "Technical and scientific education leading to engineering degree",
      institutions: ["FST Mohammedia", "FST Marrakech", "FST Fès"],
      outcomes: ["Engineer", "Research positions"],
    },
    {
      title: "FS (Faculté des Sciences)",
      duration: "3 Years (License)",
      description: "Scientific education with theoretical focus",
      institutions: ["FS Rabat", "FS Casablanca", "FS Marrakech"],
      outcomes: ["Continue to Master", "Entry-level scientific positions"],
    },
  ]

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Your Educational & Career Roadmap</h2>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Education Path - Left Column */}
        <div className="lg:col-span-5">
          <RoadmapSection title="Education Path" icon={<GraduationCap className="h-5 w-5" />} color="blue" index={0}>
            <div className="space-y-4">
              {roadmap.educationPath.map((stage, index) => (
                <div key={index} className="relative">
                  <RoadmapNode
                    title={stage.stage}
                    subtitle={stage.timeline}
                    icon={
                      index === 0 ? (
                        <BookMarked className="h-5 w-5 text-blue-500" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      )
                    }
                    color="blue"
                    isActive={expandedEducation === index}
                    isCompleted={index === 0}
                    onClick={() => toggleEducation(index)}
                    index={index}
                  >
                    {expandedEducation === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 mt-2 mb-3">{stage.description}</p>

                        {stage.institutions && stage.institutions.length > 0 && (
                          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                            <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                              <Building className="h-4 w-4 mr-2" />
                              Recommended Institutions
                            </h4>
                            <div className="space-y-2">
                              {stage.institutions.map((institution, idx) => (
                                <div key={idx} className="flex items-center">
                                  <Star className="h-3 w-3 text-amber-500 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{institution}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </RoadmapNode>

                  {/* Connector between education stages */}
                  {index < roadmap.educationPath.length - 1 && (
                    <div className="flex justify-center my-2">
                      <RoadmapConnector type="vertical" color="blue" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RoadmapSection>

          {/* Moroccan Education Paths */}
          <div className="mt-6">
            <RoadmapSection
              title="Moroccan Education Options"
              icon={<School className="h-5 w-5" />}
              color="green"
              index={3}
            >
              <div className="space-y-4">
                {moroccanPaths.map((path, index) => (
                  <RoadmapNode
                    key={index}
                    title={path.title}
                    subtitle={path.duration}
                    icon={<BookOpen className="h-5 w-5 text-green-500" />}
                    color="green"
                    isActive={expandedEducation === index + 100} // Using offset to avoid conflicts
                    onClick={() => toggleEducation(index + 100)}
                    index={index}
                  >
                    {expandedEducation === index + 100 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 mt-2 mb-3">{path.description}</p>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-green-50 p-3 rounded-md border border-green-100">
                            <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                              <Building className="h-4 w-4 mr-2" />
                              Key Institutions
                            </h4>
                            <div className="space-y-1">
                              {path.institutions.map((institution, idx) => (
                                <div key={idx} className="flex items-center">
                                  <Star className="h-3 w-3 text-amber-500 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{institution}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                            <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center">
                              <Briefcase className="h-4 w-4 mr-2" />
                              Career Outcomes
                            </h4>
                            <div className="space-y-1">
                              {path.outcomes.map((outcome, idx) => (
                                <div key={idx} className="flex items-center">
                                  <CheckCircle2 className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </RoadmapNode>
                ))}
              </div>
            </RoadmapSection>
          </div>
        </div>

        {/* Center Column - Career Path */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center">
          <div className="hidden lg:block h-full w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-orange-400 rounded-full mx-auto"></div>
        </div>

        {/* Right Column - Skills and Careers */}
        <div className="lg:col-span-5">
          {/* Skills Development */}
          <RoadmapSection title="Skills Development" icon={<Award className="h-5 w-5" />} color="purple" index={1}>
            <div className="space-y-4">
              {roadmap.skillsDevelopment.map((category, index) => (
                <RoadmapNode
                  key={index}
                  title={category.category}
                  icon={<Lightbulb className="h-5 w-5 text-purple-500" />}
                  color="purple"
                  isActive={expandedSkills === index}
                  onClick={() => toggleSkills(index)}
                  index={index}
                >
                  {expandedSkills === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-purple-700 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.skills.map((skill, idx) => (
                            <RoadmapBadge key={idx} text={skill} color="purple" />
                          ))}
                        </div>

                        <h4 className="text-sm font-semibold text-purple-700 mb-2">Resources:</h4>
                        <div className="space-y-2">
                          {category.resources.map((resource, idx) => (
                            <div key={idx} className="flex items-center">
                              <BookOpen className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                              <span className="text-sm">{resource}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </RoadmapNode>
              ))}
            </div>
          </RoadmapSection>

          {/* Career Opportunities */}
          <div className="mt-6">
            <RoadmapSection
              title="Career Opportunities"
              icon={<Briefcase className="h-5 w-5" />}
              color="orange"
              index={2}
            >
              <div className="space-y-4">
                {roadmap.careerOpportunities.map((career, index) => (
                  <RoadmapNode
                    key={index}
                    title={career.role}
                    subtitle={career.growthPotential ? "Growth Potential: High" : ""}
                    icon={<Target className="h-5 w-5 text-orange-500" />}
                    color="orange"
                    isActive={expandedCareers === index}
                    onClick={() => toggleCareers(index)}
                    index={index}
                  >
                    {expandedCareers === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-gray-600 mt-2 mb-3">{career.description}</p>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                            <h4 className="text-sm font-semibold text-orange-700 mb-2 flex items-center">
                              <Briefcase className="h-4 w-4 mr-2" />
                              Job Positions
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {/* Generate job positions based on the career role */}
                              {[
                                `Junior ${career.role}`,
                                `Senior ${career.role}`,
                                `${career.role} Specialist`,
                                `${career.role} Manager`,
                              ].map((position, idx) => (
                                <RoadmapBadge key={idx} text={position} color="orange" />
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-orange-700 mb-2">Growth Potential:</h4>
                            <p className="text-sm text-gray-600">{career.growthPotential}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </RoadmapNode>
                ))}
              </div>
            </RoadmapSection>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Roadmap Legend:</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">Education Path</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Moroccan Education Options</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm">Skills Development</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-sm">Career Opportunities</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm">Completed Stage</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Click on any item to expand and see more details</p>
      </div>
    </div>
  )
}


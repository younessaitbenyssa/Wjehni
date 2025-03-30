"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Target,
  Compass,
  CheckCircle2,
  School,
  BookOpenCheck,
  Clock,
  Award,
} from "lucide-react"
import RoadmapNode from "./roadmap-node"
import { Button } from "@/components/ui/button"

interface MindMapRoadmapProps {
  roadmap: any
}

export default function MindMapRoadmap({ roadmap }: MindMapRoadmapProps) {
  const [expandedNode, setExpandedNode] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(100)

  const toggleNode = (nodeId: string) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const educationPaths = [
    {
      id: "bac",
      title: "Baccalaureate",
      icon: <GraduationCap className="h-4 w-4 text-blue-500" />,
      color: "blue",
      x: 50,
      y: 20,
      paths: [
        {
          id: "est",
          title: "EST",
          subtitle: "2 Years",
          description: "École Supérieure de Technologie - Technical diploma with practical training",
          outcomes: ["Technician", "Continue to License Professionnelle"],
          color: "yellow",
          duration: "2 years",
        },
        {
          id: "bts",
          title: "BTS",
          subtitle: "2 Years",
          description: "Brevet de Technicien Supérieur - Specialized technical training",
          outcomes: ["Specialized Technician", "Continue to License"],
          color: "green",
          duration: "2 years",
        },
        {
          id: "ofppt",
          title: "OFPPT",
          subtitle: "2 Years",
          description: "Office de la Formation Professionnelle - Vocational training",
          outcomes: ["Qualified Professional", "Technician Specialist"],
          color: "orange",
          duration: "1-2 years",
        },
        {
          id: "fs",
          title: "FS",
          subtitle: "3 Years (License)",
          description: "Faculté des Sciences - Scientific education with theoretical focus",
          outcomes: ["Continue to Master", "Entry-level positions"],
          color: "purple",
          duration: "3 years",
        },
        {
          id: "cpge",
          title: "CPGE",
          subtitle: "2 Years",
          description: "Classes Préparatoires aux Grandes Écoles - Intensive preparation for engineering schools",
          outcomes: ["Engineering Schools (EMI, INPT, ENSIAS)"],
          color: "blue",
          duration: "2 years",
        },
        {
          id: "fst",
          title: "FST",
          subtitle: "3+2 Years",
          description: "Faculté des Sciences et Techniques - Technical and scientific education",
          outcomes: ["Engineer", "Research positions"],
          color: "green",
          duration: "5 years (3+2)",
        },
        {
          id: "military",
          title: "Military Schools",
          subtitle: "4-5 Years",
          description: "Royal Air Force, Royal Naval School - Military engineering education",
          outcomes: ["Military Officer", "Military Engineer"],
          color: "purple",
          duration: "4-5 years",
        },
      ],
    },
    {
      id: "license",
      title: "License/Bachelor",
      icon: <BookOpenCheck className="h-4 w-4 text-purple-500" />,
      color: "purple",
      x: 50,
      y: 60,
      paths: [
        {
          id: "master",
          title: "Master",
          subtitle: "2 Years",
          description: "Advanced specialization in your field",
          outcomes: ["Senior positions", "Research", "Teaching"],
          color: "purple",
          duration: "2 years",
        },
        {
          id: "work-license",
          title: "Professional Career",
          subtitle: "Entry Level",
          description: "Start your career with a bachelor degree",
          outcomes: ["Junior positions", "Assistant roles"],
          color: "blue",
          duration: "N/A",
        },
        {
          id: "engineering-exam",
          title: "Engineering School Entrance",
          subtitle: "Special Exam",
          description: "Entrance exam for engineering schools after License",
          outcomes: ["ENSIAS", "INPT", "INSEA"],
          color: "green",
          duration: "3 years (remaining)",
        },
      ],
    },
    {
      id: "master-phd",
      title: "Master/PhD",
      icon: <School className="h-4 w-4 text-indigo-500" />,
      color: "indigo",
      x: 80,
      y: 60,
      paths: [
        {
          id: "phd",
          title: "Doctorate",
          subtitle: "3-4 Years",
          description: "Research-focused advanced degree",
          outcomes: ["Academia", "Research", "Senior Expert"],
          color: "indigo",
          duration: "3-4 years",
        },
        {
          id: "work-master",
          title: "Professional Career",
          subtitle: "Mid-Senior Level",
          description: "Advanced career opportunities with master degree",
          outcomes: ["Manager", "Specialist", "Consultant"],
          color: "blue",
          duration: "N/A",
        },
      ],
    },
  ]

  // Career paths based on education level
  const careerPaths = {
    technical: [
      { title: "Technician", field: "Various Industries" },
      { title: "IT Support", field: "Technology" },
      { title: "Lab Assistant", field: "Research/Medical" },
      { title: "Production Assistant", field: "Manufacturing" },
    ],
    bachelor: [
      { title: "Junior Developer", field: "IT" },
      { title: "Assistant Engineer", field: "Engineering" },
      { title: "Marketing Specialist", field: "Business" },
      { title: "Financial Analyst", field: "Finance" },
    ],
    master: [
      { title: "Project Manager", field: "Various" },
      { title: "Senior Engineer", field: "Engineering" },
      { title: "Research Scientist", field: "R&D" },
      { title: "Business Consultant", field: "Consulting" },
    ],
    phd: [
      { title: "Professor", field: "Academia" },
      { title: "Research Director", field: "R&D" },
      { title: "Chief Scientist", field: "Technology/Science" },
      { title: "Senior Consultant", field: "Specialized Consulting" },
    ],
  }

  // Engineering schools after CPGE
  const engineeringSchools = [
    {
      title: "EMI",
      description: "École Mohammadia d'Ingénieurs",
      duration: "3 years",
      minRank: "Top 100 in CNC",
      specializations: [
        "Civil Engineering",
        "Computer Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
      ],
    },
    {
      title: "ENSIAS",
      description: "École Nationale Supérieure d'Informatique et d'Analyse des Systèmes",
      duration: "3 years",
      minRank: "Top 150 in CNC",
      specializations: ["Software Engineering", "Data Science", "Cybersecurity", "Networks & Systems"],
    },
    {
      title: "INPT",
      description: "Institut National des Postes et Télécommunications",
      duration: "3 years",
      minRank: "Top 200 in CNC",
      specializations: ["Telecommunications", "Networks", "Information Systems", "Data Engineering"],
    },
    {
      title: "EHTP",
      description: "École Hassania des Travaux Publics",
      duration: "3 years",
      minRank: "Top 250 in CNC",
      specializations: ["Civil Engineering", "Environmental Engineering", "Electrical Engineering"],
    },
    {
      title: "INSEA",
      description: "Institut National de Statistique et d'Économie Appliquée",
      duration: "3 years",
      minRank: "Top 300 in CNC",
      specializations: ["Statistics", "Data Science", "Actuarial Science", "Economics"],
    },
  ]

  // Detailed example pathway for a student with Bac in Math Science with 16/20
  const examplePathway = {
    profile: "Baccalaureate in Math Science with 16/20",
    options: [
      {
        path: "CPGE Path",
        description: "2 years of preparatory classes (MP, PSI, or TSI)",
        next: "National Competitive Exam (CNC)",
        outcomes: [
          "Top ranks (1-300): EMI, ENSIAS, INPT, INSEA (3 years)",
          "Mid ranks (300-1000): Other engineering schools (3 years)",
          "Lower ranks: Continue to License at university",
        ],
        details:
          "Most competitive but prestigious path. Requires excellent performance in math and physics. Intensive workload with 30-35 hours of classes per week plus homework.",
      },
      {
        path: "FST Path",
        description: "Integrated preparatory cycle (2 years) + Engineering cycle (3 years)",
        next: "Direct continuation if grades are good (13+/20)",
        outcomes: [
          "Complete 5-year engineering program",
          "Possible to attempt transfer to other engineering schools after 2 years",
        ],
        details:
          "Less competitive entry than CPGE but still requires good grades. More balanced workload. Offers direct path to engineering degree without competitive national exam.",
      },
      {
        path: "EST/BTS Path",
        description: "2-year technical diploma",
        next: "License Professionnelle (1 year) or job market",
        outcomes: [
          "Enter job market as technician",
          "Continue to License Professionnelle (1 year)",
          "Possible to attempt engineering school entrance exam after License",
        ],
        details:
          "More practical and hands-on training. Good option for those who prefer applied learning over theoretical. Faster entry to job market with option to continue studies later.",
      },
      {
        path: "Military Path",
        description: "Royal Air Force or Naval School entrance exam",
        next: "4-5 year military engineering program",
        outcomes: ["Military Officer with engineering specialization", "Long-term career in armed forces"],
        details:
          "Requires physical fitness tests in addition to academic exams. Provides salary during studies and guaranteed employment after graduation. Requires commitment to military service.",
      },
    ],
  }

  // Add a new section for detailed CPGE to Engineering Schools pathway
  const cpgeToEngineeringPathway = {
    title: "CPGE to Engineering Schools Pathway",
    description: "The most common path to top engineering schools in Morocco",
    steps: [
      {
        stage: "Baccalaureate",
        details: "Math Science or Technical Science with 14+ average",
        duration: "3 years of high school",
      },
      {
        stage: "CPGE (Classes Préparatoires)",
        details: "Intensive preparation in mathematics, physics, and engineering sciences",
        duration: "2 years",
        tracks: ["MP (Math-Physics)", "PSI (Physics-Engineering)", "TSI (Technology-Engineering)"],
      },
      {
        stage: "CNC (Concours National Commun)",
        details: "National competitive exam that determines engineering school placement",
        duration: "2-3 weeks of exams",
        components: ["Written exams", "Oral interviews", "National ranking"],
      },
      {
        stage: "Engineering Schools",
        details: "Based on CNC ranking, students choose from available schools",
        duration: "3 years",
        schools: engineeringSchools.map((school) => `${school.title}: ${school.minRank}`),
      },
    ],
  }

  // Add a new section for FST/FS to Engineering pathway
  const universityToEngineeringPathway = {
    title: "University to Engineering Pathway",
    description: "Alternative paths through university system",
    options: [
      {
        path: "FST Direct Path",
        details: "Integrated 5-year program at Faculté des Sciences et Techniques",
        stages: [
          "Years 1-2: Preparatory cycle (DEUST)",
          "Years 3-5: Engineering cycle",
          "Graduation with state engineer diploma",
        ],
      },
      {
        path: "FS to Engineering",
        details: "Start at Faculty of Sciences then transfer",
        stages: [
          "Years 1-3: License in Mathematics, Physics, or Computer Science",
          "Entrance exam for engineering schools",
          "Years 4-5: Engineering school if exam is passed",
        ],
      },
      {
        path: "DEUST to Engineering",
        details: "2-year diploma then transfer",
        stages: [
          "Years 1-2: DEUST at university",
          "Competitive exam for engineering schools",
          "Years 3-5: Engineering school if exam is passed",
        ],
      },
    ],
  }

  // Add a new section for Technical Paths (EST/BTS/OFPPT)
  const technicalPathways = {
    title: "Technical Education Pathways",
    description: "Practical and professional training options",
    options: [
      {
        path: "EST (École Supérieure de Technologie)",
        duration: "2 years",
        diploma: "DUT (Diplôme Universitaire de Technologie)",
        locations: ["Casablanca", "Fès", "Meknès", "Salé", "Oujda", "Agadir"],
        fields: ["Computer Science", "Electrical Engineering", "Business", "Mechanical Engineering"],
        nextSteps: ["Job market", "License Professionnelle (1 year)", "Engineering school entrance exam"],
      },
      {
        path: "BTS (Brevet de Technicien Supérieur)",
        duration: "2 years",
        diploma: "BTS",
        locations: ["Various high schools across Morocco"],
        fields: ["Management", "Tourism", "Agriculture", "Industrial Technology"],
        nextSteps: ["Job market", "License Professionnelle (1 year)"],
      },
      {
        path: "OFPPT (Office de Formation Professionnelle)",
        duration: "1-2 years",
        diploma: "Specialized Technician",
        locations: ["Centers throughout Morocco"],
        fields: ["Automotive", "Aeronautics", "Digital Technology", "Hospitality"],
        nextSteps: ["Job market", "Further specialization"],
      },
    ],
  }

  // Add a new section for Military Engineering Pathways
  const militaryPathways = {
    title: "Military Engineering Pathways",
    description: "Engineering education within military institutions",
    options: [
      {
        path: "Royal Air Force Academy",
        location: "Marrakech",
        duration: "5 years",
        requirements: ["Physical fitness tests", "Medical examination", "Academic entrance exam"],
        specializations: ["Aeronautical Engineering", "Electronics", "Computer Systems"],
        benefits: ["Paid education", "Guaranteed employment", "Military rank upon graduation"],
      },
      {
        path: "Royal Naval School",
        location: "Casablanca",
        duration: "5 years",
        requirements: ["Physical fitness tests", "Medical examination", "Academic entrance exam"],
        specializations: ["Naval Engineering", "Maritime Systems", "Logistics"],
        benefits: ["Paid education", "Guaranteed employment", "Military rank upon graduation"],
      },
      {
        path: "Royal Military Academy",
        location: "Meknès",
        duration: "4 years",
        requirements: ["Physical fitness tests", "Medical examination", "Academic entrance exam"],
        specializations: ["Military Engineering", "Communications", "Infrastructure"],
        benefits: ["Paid education", "Guaranteed employment", "Military rank upon graduation"],
      },
    ],
  }

  return (
    <div className="w-full py-4">
      <div className="flex justify-center mb-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
          className="h-8 px-2"
        >
          Zoom Out
        </Button>
        <span className="flex items-center text-sm text-gray-500">{zoomLevel}%</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
          className="h-8 px-2"
        >
          Zoom In
        </Button>
      </div>

      <div className="overflow-auto border rounded-lg bg-gray-50 shadow-inner" style={{ height: "750px" }}>
        <div
          className="relative min-w-[1200px] min-h-[1500px]"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center top" }}
        >
          <motion.div className="absolute inset-0" variants={containerVariants} initial="hidden" animate="visible">
            {/* Main Title */}
            <motion.div className="absolute left-1/2 top-[5%] transform -translate-x-1/2" variants={itemVariants}>
              <RoadmapNode
                title="Moroccan Education & Career Pathways"
                icon={<Compass className="h-6 w-6 text-blue-600" />}
                color="blue"
                size="lg"
                className="w-80 text-center shadow-lg"
                onClick={() => toggleNode("main")}
                isActive={expandedNode === "main"}
              >
                {expandedNode === "main" && (
                  <div className="mt-3 text-sm">
                    <p className="text-gray-600 mb-3">
                      This roadmap shows educational and career pathways in Morocco after obtaining your Baccalaureate.
                      Click on nodes to explore different options.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                      <h4 className="font-medium text-blue-700 mb-2">Example Student Profile:</h4>
                      <p className="text-gray-700">{examplePathway.profile}</p>
                      <h5 className="font-medium text-blue-700 mt-3 mb-1">Possible Pathways:</h5>
                      <ul className="space-y-2">
                        {examplePathway.options.map((option, i) => (
                          <li key={i} className="bg-white p-2 rounded border border-blue-50">
                            <div className="font-medium text-blue-800">{option.path}</div>
                            <div className="text-xs text-gray-600">{option.description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </RoadmapNode>
            </motion.div>

            {/* Education Paths */}
            {educationPaths.map((eduPath, eduIndex) => (
              <motion.div key={eduPath.id} variants={itemVariants}>
                {/* Main Education Node */}
                <div
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: `${eduPath.x}%`,
                    top: `${eduPath.y}%`,
                  }}
                >
                  <RoadmapNode
                    title={eduPath.title}
                    icon={eduPath.icon}
                    color={eduPath.color}
                    className="w-48 shadow-md"
                    onClick={() => toggleNode(eduPath.id)}
                    isActive={expandedNode === eduPath.id}
                  />
                </div>

                {/* Path Options */}
                {eduPath.paths.map((path, pathIndex) => {
                  // Calculate position based on the number of paths
                  const totalPaths = eduPath.paths.length
                  const angle = (pathIndex / totalPaths) * Math.PI - Math.PI / 2
                  const radius = 250 // Distance from parent node

                  // Calculate x and y coordinates
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <motion.div
                      key={`${eduPath.id}-${path.id}`}
                      className="absolute"
                      style={{
                        left: `${eduPath.x}%`,
                        top: `${eduPath.y}%`,
                        transform: `translate(calc(-50% + ${x}px), ${y}px)`,
                      }}
                      variants={itemVariants}
                      custom={pathIndex}
                    >
                      <RoadmapNode
                        title={path.title}
                        subtitle={path.subtitle}
                        icon={<BookOpen className="h-4 w-4 text-blue-500" />}
                        color={path.color}
                        size="sm"
                        className="w-56"
                        onClick={() => toggleNode(`${eduPath.id}-${path.id}`)}
                        isActive={expandedNode === `${eduPath.id}-${path.id}`}
                      >
                        {expandedNode === `${eduPath.id}-${path.id}` && (
                          <div className="mt-2 text-xs">
                            <p className="text-gray-600 mb-2">{path.description}</p>
                            <div className="flex items-center text-blue-600 mb-2">
                              <Clock className="h-3 w-3 mr-1" />
                              <span className="font-medium">Duration: {path.duration}</span>
                            </div>
                            <div className="font-medium text-blue-700 mb-1">Outcomes:</div>
                            <ul className="space-y-1">
                              {path.outcomes.map((outcome, i) => (
                                <li key={i} className="flex items-center">
                                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Special case for CPGE - show engineering schools */}
                            {path.id === "cpge" && (
                              <div className="mt-2">
                                <div className="font-medium text-blue-700 mb-1">Engineering Schools:</div>
                                <ul className="space-y-1">
                                  {engineeringSchools.map((school, i) => (
                                    <li key={i} className="flex items-center">
                                      <School className="h-3 w-3 text-blue-500 mr-1 flex-shrink-0" />
                                      <span>
                                        {school.title} - {school.description} ({school.duration})
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </RoadmapNode>
                    </motion.div>
                  )
                })}
              </motion.div>
            ))}

            {/* Career Opportunities Section */}
            <motion.div className="absolute left-1/2 top-[85%] transform -translate-x-1/2" variants={itemVariants}>
              <RoadmapNode
                title="Career Opportunities"
                icon={<Briefcase className="h-5 w-5 text-blue-600" />}
                color="blue"
                className="w-48 shadow-md"
                onClick={() => toggleNode("careers")}
                isActive={expandedNode === "careers"}
              />
            </motion.div>

            {/* Career Categories */}
            {Object.entries(careerPaths).map(([category, jobs], index) => {
              const positions = [
                { left: "20%", top: "92%" },
                { left: "40%", top: "92%" },
                { left: "60%", top: "92%" },
                { left: "80%", top: "92%" },
              ]

              const categoryTitles = {
                technical: "Technical Diploma Careers",
                bachelor: "Bachelor Degree Careers",
                master: "Master Degree Careers",
                phd: "PhD Careers",
              }

              return (
                <motion.div
                  key={category}
                  className="absolute"
                  style={{
                    left: positions[index].left,
                    top: positions[index].top,
                  }}
                  variants={itemVariants}
                >
                  <RoadmapNode
                    title={categoryTitles[category]}
                    icon={<Target className="h-4 w-4 text-blue-500" />}
                    color="orange"
                    size="sm"
                    className="w-56"
                    onClick={() => toggleNode(`career-${category}`)}
                    isActive={expandedNode === `career-${category}`}
                  >
                    {expandedNode === `career-${category}` && (
                      <div className="mt-2 text-xs">
                        <ul className="space-y-2">
                          {jobs.map((job, i) => (
                            <li key={i} className="bg-orange-50 p-2 rounded">
                              <div className="font-medium text-orange-700">{job.title}</div>
                              <div className="text-gray-600 text-xs">{job.field}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </RoadmapNode>
                </motion.div>
              )
            })}

            {/* Example Student Pathway - Math Science Bac with 16/20 */}
            <motion.div className="absolute left-[20%] top-[40%]" variants={itemVariants}>
              <RoadmapNode
                title="Example: Math Science Bac (16/20)"
                icon={<Award className="h-4 w-4 text-amber-500" />}
                color="yellow"
                size="sm"
                className="w-64 shadow-md"
                onClick={() => toggleNode("example-pathway")}
                isActive={expandedNode === "example-pathway"}
              >
                {expandedNode === "example-pathway" && (
                  <div className="mt-3 text-xs">
                    <p className="text-gray-700 mb-2">
                      A student with a Baccalaureate in Math Science with 16/20 has several options:
                    </p>
                    <div className="space-y-3">
                      {examplePathway.options.map((option, i) => (
                        <div key={i} className="bg-white p-2 rounded border border-yellow-100">
                          <div className="font-medium text-amber-800">{option.path}</div>
                          <div className="text-gray-600 mb-1">{option.description}</div>
                          <div className="text-gray-600 mb-1">
                            <span className="font-medium">Next:</span> {option.next}
                          </div>
                          <div className="font-medium text-amber-800 text-[10px] mt-1">Outcomes:</div>
                          <ul className="space-y-1">
                            {option.outcomes.map((outcome, j) => (
                              <li key={j} className="flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                                <span className="text-[10px]">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-1 text-[10px] text-gray-500 italic">{option.details}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </RoadmapNode>
            </motion.div>

            {/* CPGE to Engineering Detailed Pathway */}
            <motion.div className="absolute left-[75%] top-[35%]" variants={itemVariants}>
              <RoadmapNode
                title="CPGE to Engineering Path"
                icon={<School className="h-4 w-4 text-blue-500" />}
                color="blue"
                size="sm"
                className="w-56 shadow-md"
                onClick={() => toggleNode("cpge-engineering-pathway")}
                isActive={expandedNode === "cpge-engineering-pathway"}
              >
                {expandedNode === "cpge-engineering-pathway" && (
                  <div className="mt-3 text-xs">
                    <p className="text-gray-700 mb-2">{cpgeToEngineeringPathway.description}</p>
                    <div className="space-y-2">
                      {cpgeToEngineeringPathway.steps.map((step, i) => (
                        <div key={i} className="bg-white p-2 rounded border border-blue-100">
                          <div className="font-medium text-blue-800">{step.stage}</div>
                          <div className="text-gray-600 text-[10px]">{step.details}</div>
                          <div className="text-gray-600 text-[10px]">
                            <span className="font-medium">Duration:</span> {step.duration}
                          </div>
                          {step.tracks && (
                            <div className="mt-1">
                              <span className="text-[10px] font-medium">Tracks: </span>
                              <span className="text-[10px]">{step.tracks.join(", ")}</span>
                            </div>
                          )}
                          {step.components && (
                            <div className="mt-1">
                              <span className="text-[10px] font-medium">Components: </span>
                              <span className="text-[10px]">{step.components.join(", ")}</span>
                            </div>
                          )}
                          {step.schools && (
                            <div className="mt-1">
                              <span className="text-[10px] font-medium">Schools by Rank: </span>
                              <ul className="space-y-0.5 mt-0.5">
                                {step.schools.map((school, j) => (
                                  <li key={j} className="text-[10px] flex items-start">
                                    <CheckCircle2 className="h-2 w-2 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                                    <span>{school}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </RoadmapNode>
            </motion.div>

            {/* University to Engineering Pathway */}
            <motion.div className="absolute left-[30%] top-[65%]" variants={itemVariants}>
              <RoadmapNode
                title="University to Engineering"
                icon={<GraduationCap className="h-4 w-4 text-purple-500" />}
                color="purple"
                size="sm"
                className="w-56 shadow-md"
                onClick={() => toggleNode("university-engineering-pathway")}
                isActive={expandedNode === "university-engineering-pathway"}
              >
                {expandedNode === "university-engineering-pathway" && (
                  <div className="mt-3 text-xs">
                    <p className="text-gray-700 mb-2">{universityToEngineeringPathway.description}</p>
                    <div className="space-y-2">
                      {universityToEngineeringPathway.options.map((option, i) => (
                        <div key={i} className="bg-white p-2 rounded border border-purple-100">
                          <div className="font-medium text-purple-800">{option.path}</div>
                          <div className="text-gray-600 text-[10px]">{option.details}</div>
                          <ul className="space-y-0.5 mt-1">
                            {option.stages.map((stage, j) => (
                              <li key={j} className="text-[10px] flex items-start">
                                <CheckCircle2 className="h-2 w-2 text-purple-500 mr-1 flex-shrink-0 mt-0.5" />
                                <span>{stage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </RoadmapNode>
            </motion.div>

            {/* Technical Education Pathways */}
            <motion.div className="absolute left-[70%] top-[65%]" variants={itemVariants}>
              <RoadmapNode
                title="Technical Education Paths"
                icon={<BookOpen className="h-4 w-4 text-green-500" />}
                color="green"
                size="sm"
                className="w-56 shadow-md"
                onClick={() => toggleNode("technical-pathways")}
                isActive={expandedNode === "technical-pathways"}
              >
                {expandedNode === "technical-pathways" && (
                  <div className="mt-3 text-xs">
                    <p className="text-gray-700 mb-2">{technicalPathways.description}</p>
                    <div className="space-y-2">
                      {technicalPathways.options.map((option, i) => (
                        <div key={i} className="bg-white p-2 rounded border border-green-100">
                          <div className="font-medium text-green-800">{option.path}</div>
                          <div className="text-gray-600 text-[10px]">
                            <span className="font-medium">Duration:</span> {option.duration}
                          </div>
                          <div className="text-gray-600 text-[10px]">
                            <span className="font-medium">Diploma:</span> {option.diploma}
                          </div>
                          <div className="mt-1">
                            <span className="text-[10px] font-medium">Fields: </span>
                            <span className="text-[10px]">{option.fields.join(", ")}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-[10px] font-medium">Next Steps: </span>
                            <ul className="space-y-0.5 mt-0.5">
                              {option.nextSteps.map((step, j) => (
                                <li key={j} className="text-[10px] flex items-start">
                                  <CheckCircle2 className="h-2 w-2 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </RoadmapNode>
            </motion.div>

            {/* Military Engineering Pathways */}
            <motion.div className="absolute left-[15%] top-[75%]" variants={itemVariants}>
              <RoadmapNode
                title="Military Engineering Paths"
                icon={<Award className="h-4 w-4 text-orange-500" />}
                color="orange"
                size="sm"
                className="w-56 shadow-md"
                onClick={() => toggleNode("military-pathways")}
                isActive={expandedNode === "military-pathways"}
              >
                {expandedNode === "military-pathways" && (
                  <div className="mt-3 text-xs">
                    <p className="text-gray-700 mb-2">{militaryPathways.description}</p>
                    <div className="space-y-2">
                      {militaryPathways.options.map((option, i) => (
                        <div key={i} className="bg-white p-2 rounded border border-orange-100">
                          <div className="font-medium text-orange-800">{option.path}</div>
                          <div className="text-gray-600 text-[10px]">
                            <span className="font-medium">Location:</span> {option.location}
                          </div>
                          <div className="text-gray-600 text-[10px]">
                            <span className="font-medium">Duration:</span> {option.duration}
                          </div>
                          <div className="mt-1">
                            <span className="text-[10px] font-medium">Specializations: </span>
                            <span className="text-[10px]">{option.specializations.join(", ")}</span>
                          </div>
                          <div className="mt-1">
                            <span className="text-[10px] font-medium">Benefits: </span>
                            <ul className="space-y-0.5 mt-0.5">
                              {option.benefits.map((benefit, j) => (
                                <li key={j} className="text-[10px] flex items-start">
                                  <CheckCircle2 className="h-2 w-2 text-orange-500 mr-1 flex-shrink-0 mt-0.5" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </RoadmapNode>
            </motion.div>

            {/* Connector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              {/* Main to Education Paths */}
              {educationPaths.map((eduPath) => (
                <line
                  key={`main-to-${eduPath.id}`}
                  x1="50%"
                  y1="8%"
                  x2={`${eduPath.x}%`}
                  y2={`${eduPath.y}%`}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              ))}

              {/* Education Paths to their options */}
              {educationPaths.map((eduPath) =>
                eduPath.paths.map((path, pathIndex) => {
                  const totalPaths = eduPath.paths.length
                  const angle = (pathIndex / totalPaths) * Math.PI - Math.PI / 2
                  const radius = 250
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <line
                      key={`${eduPath.id}-to-${path.id}`}
                      x1={`${eduPath.x}%`}
                      y1={`${eduPath.y}%`}
                      x2={`calc(${eduPath.x}% + ${x}px)`}
                      y2={`calc(${eduPath.y}% + ${y}px)`}
                      stroke={
                        path.color === "blue"
                          ? "#3B82F6"
                          : path.color === "yellow"
                            ? "#EAB308"
                            : path.color === "green"
                              ? "#22C55E"
                              : path.color === "purple"
                                ? "#8B5CF6"
                                : path.color === "orange"
                                  ? "#F97316"
                                  : path.color === "indigo"
                                    ? "#6366F1"
                                    : "#3B82F6"
                      }
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )
                }),
              )}

              {/* Main to Careers */}
              <line x1="50%" y1="8%" x2="50%" y2="85%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />

              {/* Careers to Categories */}
              {[20, 40, 60, 80].map((left, i) => (
                <line
                  key={`career-to-category-${i}`}
                  x1="50%"
                  y1="85%"
                  x2={`${left}%`}
                  y2="92%"
                  stroke="#F97316"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              ))}

              {/* Example pathway connections */}
              <line x1="50%" y1="8%" x2="20%" y2="40%" stroke="#EAB308" strokeWidth="2" strokeDasharray="5,5" />

              {/* CPGE to Engineering Path */}
              <line x1="50%" y1="8%" x2="75%" y2="35%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="8%" x2="30%" y2="65%" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="8%" x2="70%" y2="65%" stroke="#22C55E" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="8%" x2="15%" y2="75%" stroke="#F97316" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Click on any node to see more details. Use zoom controls to adjust the view.</p>
      </div>
    </div>
  )
}


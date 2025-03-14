"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Briefcase, GraduationCap, ChevronRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Helper class for RTL text alignment
  const textAlignClass = language === "ar" ? "text-right" : "text-left"

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

          {isLoaded && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    width: Math.random() * 4 + 1 + "px",
                    height: Math.random() * 4 + 1 + "px",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                  }}
                  animate={{
                    y: [0, -30],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </>
          )}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${language === "ar" ? "md:flex-row-reverse" : ""}`}>
            <motion.div
              className={`space-y-8 ${textAlignClass}`}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <div className={`inline-block bg-gradient-to-r from-orange-500 to-pink-500 rounded-full px-4 py-1 text-sm font-medium ${language === "ar" ? "mr-0" : ""}`}>
                {t("home.hero.tagline")}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">{t("home.hero.title1")}</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
                  {t("home.hero.title2")}
                </span>
                <span className="block">{t("home.hero.title3")}</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                {t("home.hero.description")}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${language === "ar" ? "sm:flex-row-reverse" : ""}`}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 rounded-full group"
                >
                  <Link href="/ai-roadmap" className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                    {t("home.hero.button1")}
                    <ArrowRight className={`${language === "ar" ? "mr-2 rtl-flip" : "ml-2"} h-5 w-5 transition-transform group-hover:translate-x-1`} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 rounded-full"
                >
                  <Link href="/about">{t("home.hero.button2")}</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial="initial"
              animate={isLoaded ? "animate" : "initial"}
              variants={floatAnimation}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 transform -rotate-6"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform rotate-3">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Modern_Water_Drop_Mineral_Water_Logo_5-removebg-preview-mtrNyNMI9W2L02qgtceX4C82OT9PzX.png"
                    alt="WJEHNI.MA Logo"
                    className="w-full h-auto"
                  />

                  {isLoaded && (
                    <motion.div
                      className="absolute -top-6 -right-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full p-3 shadow-lg"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Sparkles className="h-6 w-6" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-blue-50 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">{t("home.stats.institutions")}</div>
            </motion.div>

            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-orange-50 border border-orange-100">
              <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-600">{t("home.stats.careerPaths")}</div>
            </motion.div>

            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-purple-50 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">{t("home.stats.studentsGuided")}</div>
            </motion.div>

            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-green-50 border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">{t("home.stats.satisfactionRate")}</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className={`text-center mb-16 ${textAlignClass}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-block bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
              {t("home.features.title")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{t("home.features.subtitle")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("home.features.description")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Feature 1 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{t("home.features.1.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.1.description")}
              </p>
              <div className="mt-6">
                <Link
                  href="/ai-roadmap"
                  className={`inline-flex items-center text-blue-600 font-medium hover:text-blue-800 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  {t("home.features.1.title")} <ChevronRight className={`h-4 w-4 ${language === "ar" ? "mr-1 rtl-flip" : "ml-1"}`} />
                </Link>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{t("home.features.2.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.2.description")}
              </p>
              <div className="mt-6">
                <Link
                  href="/ai-roadmap"
                  className={`inline-flex items-center text-orange-500 font-medium hover:text-orange-700 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  {t("home.features.2.title")} <ChevronRight className={`h-4 w-4 ${language === "ar" ? "mr-1 rtl-flip" : "ml-1"}`} />
                </Link>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{t("home.features.3.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.3.description")}
              </p>
              <div className="mt-6">
                <Link
                  href="/about"
                  className={`inline-flex items-center text-purple-600 font-medium hover:text-purple-800 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  {t("home.hero.button2")} <ChevronRight className={`h-4 w-4 ${language === "ar" ? "mr-1 rtl-flip" : "ml-1"}`} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className={`text-center mb-16 ${textAlignClass}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="inline-block bg-purple-100 text-purple-800 rounded-full px-4 py-1 text-sm font-medium mb-4">
              {t("home.howItWorks.title")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{t("home.howItWorks.title")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("home.howItWorks.description")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Step 1 */}
            <motion.div variants={fadeIn} className="relative z-10">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{t("home.howItWorks.step1.title")}</h3>
                <p className="text-gray-600">
                  {t("home.howItWorks.step1.description")}
                </p>
              </div>

              {/* Connector (visible on desktop) */}
              <div className={`hidden md:block absolute top-1/2 ${language === "ar" ? "left-0 w-full h-1 bg-gradient-to-l from-blue-500 to-purple-500 transform -translate-x-1/2" : "right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-1/2"}`}></div>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeIn} className="relative z-10">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600 font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{t("home.howItWorks.step2.title")}</h3>
                <p className="text-gray-600">
                  {t("home.howItWorks.step2.description")}
                </p>
              </div>

              {/* Connector (visible on desktop) */}
              <div className={`hidden md:block absolute top-1/2 ${language === "ar" ? "left-0 w-full h-1 bg-gradient-to-l from-purple-500 to-orange-500 transform -translate-x-1/2" : "right-0 w-full h-1 bg-gradient-to-r from-purple-500 to-orange-500 transform translate-x-1/2"}`}></div>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeIn} className="relative z-10">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600 font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{t("home.howItWorks.step3.title")}</h3>
                <p className="text-gray-600">
                  {t("home.howItWorks.step3.description")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl"></div>
            <div className="absolute inset-0 opacity-20">
              {isLoaded && (
                <svg width="100%" height="100%" className="absolute inset-0">
                  <motion.path
                    d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 C1150,200 1350,0 1500,100"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial="hidden"
                    animate="visible"
                    variants={pathVariants}
                  />
                  <motion.path
                    d="M0,150 C150,250 350,50 500,150 C650,250 850,50 1000,150 C1150,250 1350,50 1500,150"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial="hidden"
                    animate="visible"
                    variants={pathVariants}
                  />
                </svg>
              )}
            </div>

            <div className="relative p-8 md:p-12 text-white text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium mb-4">
                {t("home.cta.title")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.cta.title")}</h2>
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {t("home.cta.description")}
              </p>
              <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 rounded-full group">
                <Link href="/ai-roadmap" className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  {t("home.cta.button")}
                  <ArrowRight className={`${language === "ar" ? "mr-2 rtl-flip" : "ml-2"} h-5 w-5 transition-transform group-hover:translate-x-1`} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12 px-4 md:px-6 lg:px-8 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${language === "ar" ? "text-right" : ""}`}>
            <div className="md:col-span-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Modern_Water_Drop_Mineral_Water_Logo_5-removebg-preview-mtrNyNMI9W2L02qgtceX4C82OT9PzX.png"
                alt="WJEHNI.MA Logo"
                className={`h-16 mb-4 ${language === "ar" ? "mr-0 ml-auto" : ""}`}
              />
              <p className="text-blue-200 mb-4">
                {t("footer.description")}
              </p>
              <div className={`flex space-x-4 ${language === "ar" ? "justify-end" : ""}`}>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-\"
                      />
                    </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer> 
    </div>) }

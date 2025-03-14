"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "fr" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations for all supported languages
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.community": "Community",
    "nav.resources": "Resources",
    "nav.contact": "Contact",
    "nav.getRoadmap": "Get Your Roadmap",

    // Home page
    "home.hero.tagline": "Your Future Starts Here",
    "home.hero.title1": "Your Pathway to",
    "home.hero.title2": "Academic & Career",
    "home.hero.title3": "Success in Morocco",
    "home.hero.description":
      "Discover the perfect educational path based on your grades, interests, and career goals with our AI-powered guidance system tailored for Moroccan students.",
    "home.hero.button1": "Get Your Personalized Roadmap",
    "home.hero.button2": "Learn More",

    // Stats section
    "home.stats.institutions": "Educational Institutions",
    "home.stats.careerPaths": "Career Paths",
    "home.stats.studentsGuided": "Students Guided",
    "home.stats.satisfactionRate": "Satisfaction Rate",

    // Features section
    "home.features.title": "Our Approach",
    "home.features.subtitle": "How We Guide Your Educational Journey",
    "home.features.description":
      "Our platform combines educational expertise with AI technology to provide personalized guidance for students in Morocco.",
    "home.features.1.title": "Personalized Education Paths",
    "home.features.1.description":
      "Based on your grades and interests, we recommend the best educational institutions and programs in Morocco.",
    "home.features.2.title": "Comprehensive Roadmaps",
    "home.features.2.description":
      "Get detailed step-by-step guidance from high school to your dream career, with all the milestones in between.",
    "home.features.3.title": "Job Market Insights",
    "home.features.3.description":
      "Discover employment opportunities, salary expectations, and industry demand for different career paths in Morocco.",

    // How it works section
    "home.howItWorks.title": "How It Works",
    "home.howItWorks.description": "Get your personalized educational and career roadmap in just a few simple steps.",
    "home.howItWorks.step1.title": "Share Your Profile",
    "home.howItWorks.step1.description":
      "Tell us about your academic background, interests, strengths, and career aspirations.",
    "home.howItWorks.step2.title": "AI Analysis",
    "home.howItWorks.step2.description":
      "Our AI system analyzes your profile and matches it with educational and career opportunities in Morocco.",
    "home.howItWorks.step3.title": "Get Your Roadmap",
    "home.howItWorks.step3.description":
      "Receive a personalized roadmap with educational paths, skill recommendations, and career opportunities.",

    // CTA section
    "home.cta.title": "Ready to Find Your Path?",
    "home.cta.description":
      "Our AI-powered system will analyze your academic profile and generate a personalized roadmap to help you achieve your career goals in Morocco.",
    "home.cta.button": "Get Started Now",

    // Footer
    "footer.description": "Your trusted guide for educational and career orientation in Morocco.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",

    // Profile form
    "profile.title": "Your Profile",
    "profile.subtitle": "Tell us about yourself to get personalized educational guidance",
    "profile.age": "Age",
    "profile.regionalExam": "Regional Exam Grade",
    "profile.nationalExam": "National Exam Grade",
    "profile.baccalaureate": "Baccalaureate Major",
    "profile.interests": "Career Interests (Optional)",
    "profile.interests.description": "Tell us about your interests, strengths, and career aspirations",
    "profile.submit": "Generate My Educational Paths",

    // Roadmap
    "roadmap.title": "Your Educational Paths",
    "roadmap.subtitle": "Explore potential educational and career paths based on your profile",
    "roadmap.export": "Export Map",
    "roadmap.update": "Update Profile",
    "roadmap.questions": "Ask Questions",
    "roadmap.back": "Back to Home",
    "roadmap.details": "Path Details",
    "roadmap.details.prompt":
      "Click on a node in the mind map to see more details about that educational path, school, or career option.",
    "roadmap.legend": "Mind Map Legend",
    "roadmap.help": "Need Help?",
    "roadmap.help.description":
      'Have questions about educational paths or institutions in Morocco? Click the "Ask Questions" button to chat with our educational guide assistant.',
    "roadmap.startChat": "Start Chat",

    // Education paths
    "education.engineering": "Engineering",
    "education.engineering.subtitle": "Technical & Applied Sciences",
    "education.medicine": "Medicine",
    "education.medicine.subtitle": "Healthcare & Life Sciences",
    "education.business": "Business",
    "education.business.subtitle": "Management & Economics",

    // Schools
    "schools.ensa": "ENSA",
    "schools.ensa.full": "National School of Applied Sciences",
    "schools.ensias": "ENSIAS",
    "schools.ensias.full": "National School of Computer Science and Systems Analysis",
    "schools.emi": "EMI",
    "schools.emi.full": "Mohammadia School of Engineers",
    "schools.fmp": "FMP",
    "schools.fmp.full": "Faculty of Medicine and Pharmacy",
    "schools.encg": "ENCG",
    "schools.encg.full": "National School of Business and Management",
    "schools.iscae": "ISCAE",
    "schools.iscae.full": "Higher Institute of Commerce and Business Administration",

    // Careers
    "careers.engineering": "Engineering Careers",
    "careers.engineering.jobs": "Software Engineer, Civil Engineer, Mechanical Engineer",
    "careers.medical": "Medical Careers",
    "careers.medical.jobs": "General Practitioner, Specialist, Surgeon",
    "careers.business": "Business Careers",
    "careers.business.jobs": "Business Analyst, Marketing Manager, Financial Consultant, Entrepreneur",

    // Language selector
    language: "Language",
    "language.english": "English",
    "language.french": "French",
    "language.arabic": "Arabic",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.about": "À Propos",
    "nav.community": "Communauté",
    "nav.resources": "Ressources",
    "nav.contact": "Contact",
    "nav.getRoadmap": "Obtenez Votre Parcours",

    // Home page
    "home.hero.tagline": "Votre Avenir Commence Ici",
    "home.hero.title1": "Votre Chemin vers",
    "home.hero.title2": "la Réussite Académique",
    "home.hero.title3": "et Professionnelle au Maroc",
    "home.hero.description":
      "Découvrez le parcours éducatif idéal en fonction de vos notes, intérêts et objectifs de carrière grâce à notre système d'orientation alimenté par l'IA et adapté aux étudiants marocains.",
    "home.hero.button1": "Obtenez Votre Parcours Personnalisé",
    "home.hero.button2": "En Savoir Plus",

    // Stats section
    "home.stats.institutions": "Établissements Éducatifs",
    "home.stats.careerPaths": "Parcours Professionnels",
    "home.stats.studentsGuided": "Étudiants Guidés",
    "home.stats.satisfactionRate": "Taux de Satisfaction",

    // Features section
    "home.features.title": "Notre Approche",
    "home.features.subtitle": "Comment Nous Guidons Votre Parcours Éducatif",
    "home.features.description":
      "Notre plateforme combine l'expertise éducative avec la technologie d'IA pour fournir une orientation personnalisée aux étudiants au Maroc.",
    "home.features.1.title": "Parcours Éducatifs Personnalisés",
    "home.features.1.description":
      "En fonction de vos notes et intérêts, nous recommandons les meilleures institutions et programmes éducatifs au Maroc.",
    "home.features.2.title": "Feuilles de Route Complètes",
    "home.features.2.description":
      "Obtenez un guide détaillé étape par étape du lycée à votre carrière de rêve, avec toutes les étapes intermédiaires.",
    "home.features.3.title": "Aperçu du Marché du Travail",
    "home.features.3.description":
      "Découvrez les opportunités d'emploi, les attentes salariales et la demande du secteur pour différents parcours professionnels au Maroc.",

    // How it works section
    "home.howItWorks.title": "Comment Ça Marche",
    "home.howItWorks.description":
      "Obtenez votre feuille de route éducative et professionnelle personnalisée en quelques étapes simples.",
    "home.howItWorks.step1.title": "Partagez Votre Profil",
    "home.howItWorks.step1.description":
      "Parlez-nous de votre parcours académique, vos intérêts, vos forces et vos aspirations professionnelles.",
    "home.howItWorks.step2.title": "Analyse IA",
    "home.howItWorks.step2.description":
      "Notre système d'IA analyse votre profil et le met en correspondance avec les opportunités éducatives et professionnelles au Maroc.",
    "home.howItWorks.step3.title": "Obtenez Votre Parcours",
    "home.howItWorks.step3.description":
      "Recevez une feuille de route personnalisée avec des parcours éducatifs, des recommandations de compétences et des opportunités de carrière.",

    // CTA section
    "home.cta.title": "Prêt à Trouver Votre Voie?",
    "home.cta.description":
      "Notre système alimenté par l'IA analysera votre profil académique et générera une feuille de route personnalisée pour vous aider à atteindre vos objectifs de carrière au Maroc.",
    "home.cta.button": "Commencez Maintenant",

    // Footer
    "footer.description": "Votre guide de confiance pour l'orientation éducative et professionnelle au Maroc.",
    "footer.quickLinks": "Liens Rapides",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés.",

    // Profile form
    "profile.title": "Votre Profil",
    "profile.subtitle": "Parlez-nous de vous pour obtenir une orientation éducative personnalisée",
    "profile.age": "Âge",
    "profile.regionalExam": "Note de l'Examen Régional",
    "profile.nationalExam": "Note de l'Examen National",
    "profile.baccalaureate": "Filière du Baccalauréat",
    "profile.interests": "Intérêts Professionnels (Optionnel)",
    "profile.interests.description": "Parlez-nous de vos intérêts, forces et aspirations professionnelles",
    "profile.submit": "Générer Mes Parcours Éducatifs",

    // Roadmap
    "roadmap.title": "Vos Parcours Éducatifs",
    "roadmap.subtitle": "Explorez les parcours éducatifs et professionnels potentiels basés sur votre profil",
    "roadmap.export": "Exporter la Carte",
    "roadmap.update": "Mettre à Jour le Profil",
    "roadmap.questions": "Poser des Questions",
    "roadmap.back": "Retour à l'Accueil",
    "roadmap.details": "Détails du Parcours",
    "roadmap.details.prompt":
      "Cliquez sur un nœud dans la carte mentale pour voir plus de détails sur ce parcours éducatif, cette école ou cette option de carrière.",
    "roadmap.legend": "Légende de la Carte Mentale",
    "roadmap.help": "Besoin d'Aide?",
    "roadmap.help.description":
      'Vous avez des questions sur les parcours éducatifs ou les institutions au Maroc? Cliquez sur le bouton "Poser des Questions" pour discuter avec notre assistant d\'orientation éducative.',
    "roadmap.startChat": "Démarrer le Chat",

    // Education paths
    "education.engineering": "Ingénierie",
    "education.engineering.subtitle": "Sciences Techniques & Appliquées",
    "education.medicine": "Médecine",
    "education.medicine.subtitle": "Santé & Sciences de la Vie",
    "education.business": "Commerce",
    "education.business.subtitle": "Gestion & Économie",

    // Schools
    "schools.ensa": "ENSA",
    "schools.ensa.full": "École Nationale des Sciences Appliquées",
    "schools.ensias": "ENSIAS",
    "schools.ensias.full": "École Nationale Supérieure d'Informatique et d'Analyse des Systèmes",
    "schools.emi": "EMI",
    "schools.emi.full": "École Mohammadia d'Ingénieurs",
    "schools.fmp": "FMP",
    "schools.fmp.full": "Faculté de Médecine et de Pharmacie",
    "schools.encg": "ENCG",
    "schools.encg.full": "École Nationale de Commerce et de Gestion",
    "schools.iscae": "ISCAE",
    "schools.iscae.full": "Institut Supérieur de Commerce et d'Administration des Entreprises",

    // Careers
    "careers.engineering": "Carrières d'Ingénierie",
    "careers.engineering.jobs": "Ingénieur Logiciel, Ingénieur Civil, Ingénieur Mécanique",
    "careers.medical": "Carrières Médicales",
    "careers.medical.jobs": "Médecin Généraliste, Spécialiste, Chirurgien",
    "careers.business": "Carrières Commerciales",
    "careers.business.jobs": "Analyste d'Affaires, Responsable Marketing, Consultant Financier, Entrepreneur",

    // Language selector
    language: "Langue",
    "language.english": "Anglais",
    "language.french": "Français",
    "language.arabic": "Arabe",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "حول",
    "nav.community": "المجتمع",
    "nav.resources": "الموارد",
    "nav.contact": "اتصل بنا",
    "nav.getRoadmap": "احصل على خارطة الطريق",

    // Home page
    "home.hero.tagline": "مستقبلك يبدأ هنا",
    "home.hero.title1": "طريقك نحو",
    "home.hero.title2": "النجاح الأكاديمي",
    "home.hero.title3": "والمهني في المغرب",
    "home.hero.description":
      "اكتشف المسار التعليمي المثالي بناءً على درجاتك واهتماماتك وأهدافك المهنية من خلال نظام التوجيه المدعوم بالذكاء الاصطناعي المصمم خصيصًا للطلاب المغاربة.",
    "home.hero.button1": "احصل على خارطة الطريق الشخصية",
    "home.hero.button2": "اعرف المزيد",

    // Stats section
    "home.stats.institutions": "المؤسسات التعليمية",
    "home.stats.careerPaths": "المسارات المهنية",
    "home.stats.studentsGuided": "الطلاب الموجهين",
    "home.stats.satisfactionRate": "معدل الرضا",

    // Features section
    "home.features.title": "نهجنا",
    "home.features.subtitle": "كيف نوجه رحلتك التعليمية",
    "home.features.description":
      "تجمع منصتنا بين الخبرة التعليمية وتكنولوجيا الذكاء الاصطناعي لتوفير توجيه مخصص للطلاب في المغرب.",
    "home.features.1.title": "مسارات تعليمية مخصصة",
    "home.features.1.description": "بناءً على درجاتك واهتماماتك، نوصي بأفضل المؤسسات والبرامج التعليمية في المغرب.",
    "home.features.2.title": "خرائط طريق شاملة",
    "home.features.2.description":
      "احصل على توجيه مفصل خطوة بخطوة من المدرسة الثانوية إلى مهنة أحلامك، مع جميع المراحل الرئيسية بينهما.",
    "home.features.3.title": "رؤى سوق العمل",
    "home.features.3.description":
      "اكتشف فرص العمل وتوقعات الرواتب والطلب في الصناعة لمختلف المسارات المهنية في المغرب.",

    // How it works section
    "home.howItWorks.title": "كيف يعمل",
    "home.howItWorks.description": "احصل على خارطة طريق تعليمية ومهنية مخصصة في بضع خطوات بسيطة.",
    "home.howItWorks.step1.title": "شارك ملفك الشخصي",
    "home.howItWorks.step1.description": "أخبرنا عن خلفيتك الأكاديمية واهتماماتك ونقاط قوتك وتطلعاتك المهنية.",
    "home.howItWorks.step2.title": "تحليل الذكاء الاصطناعي",
    "home.howItWorks.step2.description":
      "يحلل نظام الذكاء الاصطناعي لدينا ملفك الشخصي ويطابقه مع الفرص التعليمية والمهنية في المغرب.",
    "home.howItWorks.step3.title": "احصل على خارطة الطريق",
    "home.howItWorks.step3.description": "احصل على خارطة طريق مخصصة مع مسارات تعليمية وتوصيات المهارات وفرص مهنية.",

    // CTA section
    "home.cta.title": "هل أنت مستعد لإيجاد طريقك؟",
    "home.cta.description":
      "سيقوم نظام الذكاء الاصطناعي لدينا بتحليل ملفك الأكاديمي وإنشاء خارطة طريق مخصصة لمساعدتك على تحقيق أهدافك المهنية في المغرب.",
    "home.cta.button": "ابدأ الآن",

    // Footer
    "footer.description": "دليلك الموثوق للتوجيه التعليمي والمهني في المغرب.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة.",

    // Profile form
    "profile.title": "ملفك الشخصي",
    "profile.subtitle": "أخبرنا عن نفسك للحصول على توجيه تعليمي مخصص",
    "profile.age": "العمر",
    "profile.regionalExam": "درجة الامتحان الجهوي",
    "profile.nationalExam": "درجة الامتحان الوطني",
    "profile.baccalaureate": "تخصص البكالوريا",
    "profile.interests": "الاهتمامات المهنية (اختياري)",
    "profile.interests.description": "أخبرنا عن اهتماماتك ونقاط قوتك وتطلعاتك المهنية",
    "profile.submit": "إنشاء مساراتي التعليمية",

    // Roadmap
    "roadmap.title": "مساراتك التعليمية",
    "roadmap.subtitle": "استكشف المسارات التعليمية والمهنية المحتملة بناءً على ملفك الشخصي",
    "roadmap.export": "تصدير الخريطة",
    "roadmap.update": "تحديث الملف الشخصي",
    "roadmap.questions": "طرح الأسئلة",
    "roadmap.back": "العودة إلى الرئيسية",
    "roadmap.details": "تفاصيل المسار",
    "roadmap.details.prompt":
      "انقر على عقدة في خريطة العقل لمعرفة المزيد من التفاصيل حول هذا المسار التعليمي أو المدرسة أو خيار المهنة.",
    "roadmap.legend": "مفتاح خريطة العقل",
    "roadmap.help": "بحاجة إلى مساعدة؟",
    "roadmap.help.description":
      'هل لديك أسئلة حول المسارات التعليمية أو المؤسسات في المغرب؟ انقر على زر "طرح الأسئلة" للدردشة مع مساعد التوجيه التعليمي.',
    "roadmap.startChat": "بدء الدردشة",

    // Education paths
    "education.engineering": "الهندسة",
    "education.engineering.subtitle": "العلوم التقنية والتطبيقية",
    "education.medicine": "الطب",
    "education.medicine.subtitle": "الرعاية الصحية وعلوم الحياة",
    "education.business": "الأعمال",
    "education.business.subtitle": "الإدارة والاقتصاد",

    // Schools
    "schools.ensa": "ENSA",
    "schools.ensa.full": "المدرسة الوطنية للعلوم التطبيقية",
    "schools.ensias": "ENSIAS",
    "schools.ensias.full": "المدرسة الوطنية العليا للمعلوماتية وتحليل النظم",
    "schools.emi": "EMI",
    "schools.emi.full": "مدرسة المحمدية للمهندسين",
    "schools.fmp": "FMP",
    "schools.fmp.full": "كلية الطب والصيدلة",
    "schools.encg": "ENCG",
    "schools.encg.full": "المدرسة الوطنية للتجارة والتسيير",
    "schools.iscae": "ISCAE",
    "schools.iscae.full": "المعهد العالي للتجارة وإدارة المؤسسات",

    // Careers
    "careers.engineering": "المهن الهندسية",
    "careers.engineering.jobs": "مهندس برمجيات، مهندس مدني، مهندس ميكانيكي",
    "careers.medical": "المهن الطبية",
    "careers.medical.jobs": "طبيب عام، أخصائي، جراح",
    "careers.business": "مهن الأعمال",
    "careers.business.jobs": "محلل أعمال، مدير تسويق، مستشار مالي، رائد أعمال",

    // Language selector
    language: "اللغة",
    "language.english": "الإنجليزية",
    "language.french": "الفرنسية",
    "language.arabic": "العربية",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
      document.documentElement.lang = savedLanguage
      if (savedLanguage === "ar") {
        document.documentElement.dir = "rtl"
      } else {
        document.documentElement.dir = "ltr"
      }
    }
  }, [])

  // Function to set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
    document.documentElement.lang = newLanguage

    // Set RTL direction for Arabic
    if (newLanguage === "ar") {
      document.documentElement.dir = "rtl"
    } else {
      document.documentElement.dir = "ltr"
    }
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Award, GraduationCap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">About WJEHNI.MA</h1>
              <p className="text-lg md:text-xl opacity-90">
                Guiding Moroccan students toward successful educational and career paths through personalized AI-powered
                recommendations.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Modern_Water_Drop_Mineral_Water_Logo_5-removebg-preview-mtrNyNMI9W2L02qgtceX4C82OT9PzX.png"
                  alt="WJEHNI.MA Logo"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are dedicated to empowering Moroccan students with the knowledge and guidance they need to make
              informed decisions about their education and career paths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Educational Guidance</h3>
              <p className="text-gray-600">
                Providing personalized recommendations for educational institutions and programs based on students'
                profiles and goals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Skills Development</h3>
              <p className="text-gray-600">
                Identifying key skills and competencies needed for success in various career paths within the Moroccan
                job market.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Career Opportunities</h3>
              <p className="text-gray-600">
                Connecting students with real-world career opportunities and insights into the Moroccan job market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How Our AI Roadmap Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our advanced AI system analyzes your academic profile and preferences to generate a personalized
              educational and career roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="AI Roadmap Process"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Input Your Information</h3>
                  <p className="text-gray-600">
                    Share your academic background, grades, interests, and career goals through our user-friendly form.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">AI Analysis</h3>
                  <p className="text-gray-600">
                    Our AI system analyzes your profile against our comprehensive database of Moroccan educational
                    institutions and job market data.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Personalized Roadmap</h3>
                  <p className="text-gray-600">
                    Receive a detailed roadmap outlining educational paths, skill development opportunities, and career
                    options tailored to your profile.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Take Action</h3>
                  <p className="text-gray-600">
                    Use your roadmap to make informed decisions about your education and career, with specific
                    institutions and resources to explore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are a dedicated team of educators, career counselors, and technology experts committed to helping
              Moroccan students succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-1">Mohammed Alami</h3>
              <p className="text-orange-500 font-medium mb-3">Founder & Education Expert</p>
              <p className="text-gray-600 text-sm">
                Former professor with 15+ years of experience in the Moroccan education system.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-1">Fatima Benali</h3>
              <p className="text-orange-500 font-medium mb-3">Career Counselor</p>
              <p className="text-gray-600 text-sm">
                Specialized in career development with extensive knowledge of the Moroccan job market.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-1">Youssef Kabbaj</h3>
              <p className="text-orange-500 font-medium mb-3">AI & Technology Lead</p>
              <p className="text-gray-600 text-sm">
                Expert in AI and machine learning with a passion for educational technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-blue-900 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Journey Today</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Discover the educational and career path that's right for you with our AI-powered roadmap generator.
            </p>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/ai-roadmap">Get Your Personalized Roadmap</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


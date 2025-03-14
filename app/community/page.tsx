"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MessageSquare,
  ThumbsUp,
  Calendar,
  Tag,
  Filter,
  PlusCircle,
  BookOpen,
  GraduationCap,
  Briefcase,
  School,
  Building,
  Award,
} from "lucide-react"

// Sample data for questions
const sampleQuestions = [
  {
    id: 1,
    title: "What are the requirements to join ENSIAS after CPGE?",
    content:
      "I'm currently in my first year of CPGE (MP) and I want to know what grades I need to aim for to get into ENSIAS. Also, what's the competition like?",
    author: {
      name: "Ahmed Benali",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Engineering",
    tags: ["CPGE", "ENSIAS", "Engineering Schools"],
    votes: 24,
    answers: 8,
    views: 342,
    createdAt: "2 days ago",
    solved: true,
  },
  {
    id: 2,
    title: "Is it possible to transfer from FST to an engineering school?",
    content:
      "I'm currently in my second year at FST Mohammedia (MIPC). I want to know if it's possible to transfer to an engineering school like EMI or INPT without going through the full concours.",
    author: {
      name: "Salma Tazi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Transfers",
    tags: ["FST", "Engineering", "Transfer"],
    votes: 18,
    answers: 5,
    views: 276,
    createdAt: "1 week ago",
    solved: false,
  },
  {
    id: 3,
    title: "Scholarship opportunities for medical students?",
    content:
      "I've been accepted to the Faculty of Medicine in Rabat, but I need financial assistance. Are there any scholarships specifically for medical students in Morocco?",
    author: {
      name: "Karim Alaoui",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Financial Aid",
    tags: ["Medicine", "Scholarships", "Financial Aid"],
    votes: 32,
    answers: 12,
    views: 520,
    createdAt: "3 days ago",
    solved: true,
  },
  {
    id: 4,
    title: "How to prepare for ENCG entrance exam?",
    content:
      "I'm planning to apply to ENCG next year. Can anyone share tips, resources, or experiences about the entrance exam? What subjects should I focus on?",
    author: {
      name: "Yasmine Berrada",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Business Schools",
    tags: ["ENCG", "Entrance Exam", "Preparation"],
    votes: 15,
    answers: 7,
    views: 298,
    createdAt: "5 days ago",
    solved: false,
  },
  {
    id: 5,
    title: "Career prospects after EST diploma?",
    content:
      "I'm about to graduate with a DUT in Computer Science from EST Casablanca. What are the job prospects like? Should I continue to a License Professionnelle or look for work?",
    author: {
      name: "Mehdi Chraibi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Career Advice",
    tags: ["EST", "DUT", "Computer Science", "Jobs"],
    votes: 21,
    answers: 9,
    views: 387,
    createdAt: "1 day ago",
    solved: false,
  },
  {
    id: 6,
    title: "Military engineering schools admission process?",
    content:
      "I'm interested in joining the Royal Air Force Engineering School or the Royal Naval School. What's the admission process like? Do they accept students after Bac or CPGE?",
    author: {
      name: "Omar Benjelloun",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Military",
    tags: ["Military", "Air Force", "Naval School", "Engineering"],
    votes: 28,
    answers: 6,
    views: 412,
    createdAt: "4 days ago",
    solved: true,
  },
]

// Sample categories with icons
const categories = [
  { name: "Engineering", icon: <Building className="h-4 w-4" /> },
  { name: "Medicine", icon: <BookOpen className="h-4 w-4" /> },
  { name: "Business", icon: <Briefcase className="h-4 w-4" /> },
  { name: "CPGE", icon: <School className="h-4 w-4" /> },
  { name: "Universities", icon: <GraduationCap className="h-4 w-4" /> },
  { name: "Financial Aid", icon: <Award className="h-4 w-4" /> },
  { name: "Career Advice", icon: <Briefcase className="h-4 w-4" /> },
  { name: "Military", icon: <Award className="h-4 w-4" /> },
  { name: "Transfers", icon: <MessageSquare className="h-4 w-4" /> },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAskDialogOpen, setIsAskDialogOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  // Filter questions based on search query and category
  const filteredQuestions = sampleQuestions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || question.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleAskQuestion = (e) => {
    e.preventDefault()
    // In a real app, this would submit the question to a database
    alert("Your question has been submitted! In a real app, this would be saved to a database.")
    setNewQuestion({ title: "", content: "", category: "", tags: "" })
    setIsAskDialogOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Student Community</h1>
          <p className="text-muted-foreground mt-1">
            Ask questions, share experiences, and get advice from fellow students
          </p>
        </div>
        <Dialog open={isAskDialogOpen} onOpenChange={setIsAskDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Ask a Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ask a Question</DialogTitle>
              <DialogDescription>
                Share your question with the community. Be specific to get better answers.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAskQuestion}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Question Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., How to prepare for ENSIAS entrance exam?"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Details
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Provide more details about your question..."
                    rows={5}
                    value={newQuestion.content}
                    onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select
                      value={newQuestion.category}
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            <div className="flex items-center">
                              {category.icon}
                              <span className="ml-2">{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Tags (comma separated)
                    </label>
                    <Input
                      id="tags"
                      placeholder="e.g., CPGE, Engineering, Scholarship"
                      value={newQuestion.tags}
                      onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Post Question
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search questions..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 px-4 pb-4">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    selectedCategory === "all" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  <span>All Categories</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      selectedCategory === category.name ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("CPGE")}
                >
                  CPGE
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("Engineering")}
                >
                  Engineering
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("Medicine")}
                >
                  Medicine
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("Scholarship")}
                >
                  Scholarship
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("ENSIAS")}
                >
                  ENSIAS
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("FST")}
                >
                  FST
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("EST")}
                >
                  EST
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchQuery("Military")}
                >
                  Military
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions</span>
                  <span className="font-medium">1,245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Answers</span>
                  <span className="font-medium">3,872</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Members</span>
                  <span className="font-medium">5,629</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="latest">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                <TabsTrigger value="solved">Solved</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </div>
            </div>

            <TabsContent value="latest" className="mt-0">
              <div className="space-y-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => <QuestionCard key={question.id} question={question} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No questions found matching your criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="space-y-4">
                {filteredQuestions
                  .sort((a, b) => b.votes - a.votes)
                  .map((question) => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="unanswered" className="mt-0">
              <div className="space-y-4">
                {filteredQuestions
                  .filter((q) => q.answers === 0)
                  .map((question) => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="solved" className="mt-0">
              <div className="space-y-4">
                {filteredQuestions
                  .filter((q) => q.solved)
                  .map((question) => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Question Card Component
function QuestionCard({ question }) {
  return (
    <Card className="hover:border-blue-200 transition-colors">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Votes */}
          <div className="flex flex-col items-center space-y-1 min-w-[60px]">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <span className="font-medium text-lg">{question.votes}</span>
            <span className="text-xs text-gray-500">votes</span>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <Link href={`/community/question/${question.id}`} className="group">
              <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                {question.title}
                {question.solved && (
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Solved</Badge>
                )}
              </h3>
            </Link>
            <p className="text-gray-600 mt-2 line-clamp-2">{question.content}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {question.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={question.author.avatar} alt={question.author.name} />
                  <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{question.author.name}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{question.answers} answers</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{question.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


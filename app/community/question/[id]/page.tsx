"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Share2,
  Bookmark,
  Flag,
  MessageCircle,
} from "lucide-react"

// Sample question data
const questionData = {
  id: 1,
  title: "What are the requirements to join ENSIAS after CPGE?",
  content:
    "I'm currently in my first year of CPGE (MP) and I want to know what grades I need to aim for to get into ENSIAS. Also, what's the competition like? I've heard it's one of the most competitive engineering schools in Morocco.\n\nDoes anyone have experience with the CNC exam for ENSIAS? What subjects should I focus on the most? Are there any specific resources or past papers that would be helpful for preparation?\n\nI'm particularly interested in the Computer Science program. Any advice would be greatly appreciated!",
  author: {
    name: "Ahmed Benali",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Student",
    joined: "Member since 2022",
  },
  category: "Engineering",
  tags: ["CPGE", "ENSIAS", "Engineering Schools"],
  votes: 24,
  views: 342,
  createdAt: "2 days ago",
  solved: true,
  answers: [
    {
      id: 1,
      content:
        "I got into ENSIAS last year after completing CPGE (MP). Here's what you need to know:\n\n1. **Grades**: You need to aim for at least 16/20 in your CPGE classes, especially in Math and Physics. The higher, the better.\n\n2. **CNC Exam**: The national competitive exam (CNC) is what matters most. For ENSIAS, you need to rank in the top 100-150 nationally to have a good chance.\n\n3. **Focus Areas**: For Computer Science at ENSIAS, focus heavily on Mathematics (especially algebra and analysis), Physics, and Computer Science (algorithms and data structures).\n\n4. **Resources**: Get past CNC papers from your CPGE professors. Also, join preparation groups with other students.\n\n5. **Competition**: It's very competitive - ENSIAS is one of the top 3 engineering schools in Morocco along with EMI and INPT.\n\nGood luck with your preparation! Feel free to ask if you have more specific questions.",
      author: {
        name: "Youssef Kadiri",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "ENSIAS Student",
      },
      votes: 18,
      createdAt: "1 day ago",
      isAccepted: true,
    },
    {
      id: 2,
      content:
        "To add to what Youssef said, here are some more details about the ENSIAS admission process after CPGE:\n\n- The CNC exam has written tests followed by oral interviews for those who pass the written part\n- For Computer Science at ENSIAS, the math oral exam is particularly important\n- Your CPGE type matters - MP students have a slight advantage for Computer Science at ENSIAS\n- The competition ratio is usually around 10-15 candidates per available spot\n\nI'd recommend getting the 'Tout en Un' preparation books for MP students and focusing on problem-solving speed. Time management during the CNC exam is crucial.\n\nAlso, don't neglect the French language component - it's not heavily weighted but can make a difference in close rankings.",
      author: {
        name: "Leila Mansouri",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "ENSIAS Graduate",
      },
      votes: 12,
      createdAt: "1 day ago",
      isAccepted: false,
    },
    {
      id: 3,
      content:
        "I'm a professor who has been involved in the ENSIAS admission process. One thing students often overlook is that there are multiple paths to ENSIAS:\n\n1. The main path is through CPGE and CNC as others mentioned\n\n2. You can also enter through the direct admission process if you have a License (Bachelor's) in Computer Science, Mathematics, or related fields with excellent grades\n\n3. There's a special admission track for international students\n\nFor the CPGE path, remember that your ranking in the CNC is what matters most. The actual cutoff varies each year depending on the performance of all candidates.\n\nFor the Computer Science program specifically, strong performance in algorithms, data structures, and discrete mathematics will serve you well both in the admission process and in your studies if admitted.",
      author: {
        name: "Dr. Rachid Benmokhtar",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Professor",
      },
      votes: 21,
      createdAt: "2 days ago",
      isAccepted: false,
    },
  ],
}

export default function QuestionPage({ params }) {
  const [newAnswer, setNewAnswer] = useState("")
  const { id } = params

  const handleSubmitAnswer = (e) => {
    e.preventDefault()
    // In a real app, this would submit the answer to a database
    alert("Your answer has been submitted! In a real app, this would be saved to a database.")
    setNewAnswer("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/community" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Question */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Votes */}
                <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-lg">{questionData.votes}</span>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Question Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{questionData.category}</Badge>
                    {questionData.solved && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Solved</Badge>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold mb-4">{questionData.title}</h1>

                  <div className="prose max-w-none mb-4">
                    {questionData.content.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {questionData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={questionData.author.avatar} alt={questionData.author.name} />
                        <AvatarFallback>{questionData.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{questionData.author.name}</div>
                        <div className="text-sm text-gray-500">{questionData.author.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{questionData.createdAt}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{questionData.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  <span>Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Answers */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">{questionData.answers.length} Answers</h2>

            {questionData.answers.map((answer) => (
              <Card key={answer.id} className={`mb-4 ${answer.isAccepted ? "border-green-300 bg-green-50" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Votes */}
                    <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="font-medium text-lg">{answer.votes}</span>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      {answer.isAccepted && <CheckCircle className="h-6 w-6 text-green-600 mt-2" />}
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1">
                      <div className="prose max-w-none">
                        {answer.content.split("\n\n").map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                            <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{answer.author.name}</div>
                            <div className="text-sm text-gray-500">{answer.author.role}</div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{answer.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Answer */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Answer</h2>
            <form onSubmit={handleSubmitAnswer}>
              <Textarea
                placeholder="Write your answer here..."
                className="min-h-[200px] mb-4"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Post Your Answer
              </Button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">About the Author</h3>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={questionData.author.avatar} alt={questionData.author.name} />
                  <AvatarFallback>{questionData.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{questionData.author.name}</div>
                  <div className="text-xs text-gray-500">{questionData.author.joined}</div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Related Questions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    How to prepare for the CNC exam for engineering schools?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    ENSIAS vs INPT: Which is better for Computer Science?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    What are the job prospects after graduating from ENSIAS?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    Can I transfer to ENSIAS from another engineering school?
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">Have more questions about educational paths in Morocco?</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Advisor</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


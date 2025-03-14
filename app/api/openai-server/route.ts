import { streamText } from "ai"
import { type NextRequest, NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai-edge"
import { openai } from "@ai-sdk/openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})


const openai_old = new OpenAIApi(configuration)

export const runtime = "edge" 

export async function POST(request: NextRequest) {
  try {
    const { formData } = await request.json()

    console.log("Using OpenAI Edge client in Edge runtime")

    const prompt = `
      Generate a detailed educational and career roadmap for a student in Morocco with the following profile:
      
      Name: ${formData.name}
      Age: ${formData.age}
      Current Education Level: ${formData.currentEducation}
      Current/Desired Major: ${formData.major}
      Academic Performance: ${formData.grades}
      Interests: ${formData.interests}
      Career Goals: ${formData.careerGoals}
      Strengths: ${formData.strengths}
      
      Please provide a comprehensive roadmap with the following sections:
      
      1. EDUCATIONAL PATH: Recommended educational institutions in Morocco, degree programs, specializations, and timeline.
      2. SKILLS DEVELOPMENT: Essential skills to develop, certifications to pursue, and extracurricular activities.
      3. CAREER OPPORTUNITIES: Potential job roles, industries, companies in Morocco that hire for these positions, and salary ranges.
      4. ALTERNATIVE PATHS: Other viable educational and career options based on the profile.
      
      Format the response as JSON with the following structure:
      {
        "educationPath": [
          { "stage": "...", "timeline": "...", "description": "...", "institutions": ["..."] }
        ],
        "skillsDevelopment": [
          { "category": "...", "skills": ["..."], "resources": ["..."] }
        ],
        "careerOpportunities": [
          { "role": "...", "description": "...", "companies": ["..."], "salaryRange": "...", "growthPotential": "..." }
        ],
        "alternativePaths": [
          { "path": "...", "description": "..." }
        ]
      }
    `

    // const response = await openai.createChatCompletion({
    //   model: "gpt-4o",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are an expert educational and career counselor in Morocco with deep knowledge of the Moroccan education system, universities, and job market. Provide detailed, accurate, and personalized guidance based on the student's profile."
    //     },
    //     { role: "user", content: prompt }
    //   ],
    //   temperature: 0.7,
    //   max_tokens: 4096,
    //   top_p: 1
    // });

    // const data = await response.json();

    // // Return the response
    // return NextResponse.json({
    //   roadmap: JSON.parse(data.choices[0].message.content)
    // });

    const result = streamText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content:
            "You are an expert educational and career counselor in Morocco with deep knowledge of the Moroccan education system, universities, and job market. Provide detailed, accurate, and personalized guidance based on the student's profile.",
        },
        { role: "user", content: prompt },
      ],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error generating roadmap with edge runtime:", error)
    return NextResponse.json(
      {
        error: "Failed to generate roadmap with edge runtime",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}


import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: NextRequest) {
  try {
    const { formData } = await request.json()

    // Get the GitHub token from environment variables
    const token = process.env.OPENAI_API_KEY

    if (!token) {
      console.error("OPENAI_API_KEY is not set in environment variables")
      return NextResponse.json({ error: "API token not configured" }, { status: 500 })
    }

    // Create the OpenAI client with the API key
    const client = new OpenAI({
      apiKey: token,
      baseURL: "https://models.inference.ai.azure.com"
    })

    const prompt = `
      Generate a detailed educational and career roadmap for a student in Morocco based on the following profile:

    - **Age:** ${formData.age}
    - **Baccalaureate Major:** ${formData.major}
    - **National Exam Grade:** ${formData.nationalExamGrade}
    - **Regional Exam Grade:** ${formData.regionalExamGrade}
    - **Interests:** ${formData.interests}

    ### **Instructions for the AI:**  
    1. **Understand the Profile Deeply**  
      - Calculate the **final Baccalaureate grade** using the formula:  
        \[
        \text{Final Grade} = (0.75 \times \text{National Exam Grade}) + (0.25 \times \text{Regional Exam Grade})
        \]  
      - Identify paths based on the **student's major, grades, and interests.**  
      - Ensure recommendations **match the student's academic strengths** (e.g., Sciences Mathématiques students should get recommendations for engineering, computer science, and mathematics programs).  

    2. **Provide a Comprehensive Moroccan Educational Roadmap**  
      - Include **ALL possible educational paths** based on the profile, covering:  
        - **CPGE (Prépas) Path** → Engineering Schools  
        - **Direct University Path** → Faculties of Science, Technology, and Engineering  
        - **Vocational/Professional Path** → Specialized Institutes & Short Programs  
        - **Military & Paramilitary Path** → Royal Air School, Royal Military Academy, etc.  
        - **Alternative Paths** → Private Schools, International Studies, Online Certifications  

    3. **Format the Response as a Valid JSON Object**  
      - Each **path** should have:  
        - A **clear name** (e.g., "CPGE Path", "University Path")  
        - A **detailed description**  
        - A list of **specific Moroccan institutions** with admission requirements  
        - The **next steps** after each institution (e.g., from CPGE to engineering schools)  
        - **Career outcomes** for each path  

    ### **Output Format:**  
    {
      "educationalPaths": [
        {
          "pathName": "CPGE Path",
          "description": "Preparatory Classes for Engineering Schools",
          "institutions": [
            {
              "name": "CPGE MP",
              "description": "Mathematics and Physics track",
              "requirements": "Minimum final Baccalaureate grade: 16/20",
              "duration": "2 years",
              "nextSteps": [
                {
                  "name": "ENSIAS",
                  "description": "National School of Computer Science",
                  "requirements": "Pass CNC exam with high ranking",
                  "duration": "3 years",
                  "careers": ["Software Engineer", "Data Scientist", "IT Consultant"]
                },
                {
                  "name": "EMI",
                  "description": "Mohammadia School of Engineers",
                  "requirements": "Pass CNC exam with high ranking",
                  "duration": "3 years",
                  "careers": ["Civil Engineer", "Mechanical Engineer"]
                }
              ]
            }
          ]
        },
        {
          "pathName": "Direct University Path",
          "description": "Direct enrollment in university faculties",
          "institutions": [
            {
              "name": "FST",
              "description": "Faculty of Sciences and Technology",
              "requirements": "Minimum final Baccalaureate grade: 14/20",
              "duration": "3 years (Bachelor) + 2 years (Master)",
              "nextSteps": [
                {
                  "name": "Master's Degree",
                  "description": "Specialized Master's programs",
                  "requirements": "Bachelor's degree with good standing",
                  "duration": "2 years",
                  "careers": ["Researcher", "University Professor", "Industry Specialist"]
                }
              ]
            }
          ]
        }
      ]
    }

    Ensure the response is in **valid JSON format** without any extra explanations or markdown syntax.
    `

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert educational counselor in Morocco with deep knowledge of the Moroccan education system, universities, competitive exams, and job market. Provide detailed, accurate, and personalized guidance based on the student's profile. Your response must be a valid JSON object without any markdown formatting, code blocks, or backticks.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      response_format: { type: "json_object" },
    })

    // Get the content from the response
    const content = response.choices[0].message.content || "{}"

    // Clean the content to remove any markdown formatting
    const cleanedContent = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    let parsedData
    try {
      parsedData = JSON.parse(cleanedContent)
      console.log("Successfully parsed API response")
    } catch (parseError) {
      console.error("Error parsing API response:", parseError)
      console.error("Raw content:", content)
      return NextResponse.json(
        {
          error: "Failed to parse API response",
          details: parseError instanceof Error ? parseError.message : String(parseError),
          rawContent: content,
        },
        { status: 500 },
      )
    }

    // Return the response
    return NextResponse.json({
      roadmap: parsedData,
    })
  } catch (error) {
    console.error("Error generating roadmap:", error)
    return NextResponse.json(
      {
        error: "Failed to generate roadmap",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}


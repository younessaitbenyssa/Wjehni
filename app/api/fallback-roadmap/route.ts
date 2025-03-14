import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: NextRequest) {
  try {
    const { formData } = await request.json()

    // Get the GitHub token from environment variables
    const token = process.env.OPENAI_API_KEY;
    
    if (!token) {
      console.error("GITHUB_TOKEN is not set in environment variables");
      return NextResponse.json(
        { error: "API token not configured" },
        { status: 500 }
      );
    }

    // Create the OpenAI client with the GitHub token
    const client = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: token
    });

    const prompt = `
      Generate a detailed educational and career roadmap for a student in Morocco with the following profile:
      
      Age: ${formData.age || "18"}
      Baccalaureate Major: ${formData.major || "Sciences Mathématiques"}
      National Exam Grade: ${formData.nationalExamGrade || "16/20"}
      Regional Exam Grade: ${formData.regionalExamGrade || "16/20"}
      Interests: ${formData.interests || "Technology, Mathematics"}
      
      I need a comprehensive roadmap showing ALL possible educational paths in Morocco based on this profile.
      
      Important guidelines:
      1. DO NOT use generic categories like "undergraduate" or "graduate". Instead, show SPECIFIC Moroccan institutions and programs.
      2. For each educational path, show the next steps (e.g., after CPGE, show engineering schools like ENSIAS, EMI, INPT)
      3. Show multiple parallel paths (e.g., CPGE path, direct university path, vocational path, military path)
      4. Include admission requirements and competitive exam details for each institution
      5. Show career opportunities for each educational path
      
      Format the response as a valid JSON object with the following structure (DO NOT include any markdown formatting, code blocks, or backticks in your response, just pure JSON):
      {
        "educationalPaths": [
          {
            "pathName": "CPGE",
            "description": "Preparatory Classes for Engineering Schools",
            "institutions": [
              {
                "name": "CPGE MP",
                "description": "Mathematics and Physics track",
                "requirements": "Minimum grade: 16/20 in Baccalaureate",
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
                "requirements": "Minimum grade: 14/20 in Baccalaureate",
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
      response_format: { type: "json_object" }
    });

    
    const content = response.choices[0].message.content || "{}";
    
    
    const cleanedContent = content
      .replace(/\`\`\`json/g, '')
      .replace(/\`\`\`/g, '')
      .trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedContent);
      console.log("Successfully parsed API response");
    } catch (parseError) {
      console.error("Error parsing API response:", parseError);
      console.error("Raw content:", content);
      return NextResponse.json(
        { 
          error: "Failed to parse API response", 
          details: parseError instanceof Error ? parseError.message : String(parseError),
          rawContent: content
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      roadmap: parsedData
    });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      {
        error: "Failed to generate roadmap",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    

    
    const formattedMessages = [
      {
        role: "system",
        content:
          "You are a Moroccan career guide assistant. Provide helpful information about Moroccan universities, educational paths, admission requirements, and career opportunities in Morocco. Be concise, accurate, and supportive. Structure your responses in a clear, organized manner with proper paragraphs. Use bullet points for lists when appropriate. Avoid using markdown formatting like '**' or '###'. Present information in a professional, easy-to-read format with logical flow.",
      },
      ...messages,
    ]

    const response = await fetch("https://api.hyperbolic.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "",
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V3",
        messages: formattedMessages,
        max_tokens: 512,
        temperature: 0.1,
        top_p: 0.9,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    
    const cleanedContent = data.choices[0].message.content
      .replace(/\*\*/g, "") 
      .replace(/###/g, "") // Remove header formatting
      .replace(/\n#{1,6}\s/g, "\n") // Remove any other header levels
      .trim()

    return NextResponse.json({
      role: "assistant",
      content: cleanedContent,
      id: Date.now().toString(),
    })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}


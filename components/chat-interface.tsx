"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { JSX } from "react/jsx-runtime"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatInterfaceProps {
  onClose: () => void
}

const formatMessageContent = (content: string): JSX.Element => {

  const paragraphs = content.split("\n").filter((p) => p.trim() !== "")

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        
        if (paragraph.trim().startsWith("-") || paragraph.trim().startsWith("•")) {
          return (
            <p key={index} className="mb-2 ml-2">
              {paragraph}
            </p>
          )
        }
        return (
          <p key={index} className={index < paragraphs.length - 1 ? "mb-2" : ""}>
            {paragraph}
          </p>
        )
      })}
    </>
  )
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Moroccan career guide assistant. I can provide information about universities, educational paths, and career opportunities in Morocco. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      
      const apiMessages = messages.concat(userMessage).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      
      const messagesToSend = apiMessages.slice(1)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesToSend,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      
      const cleanedContent = data.content
        .replace(/\*\*/g, "")
        .replace(/###/g, "")
        .replace(/\n#{1,6}\s/g, "\n")
        .trim()

      const botMessage: Message = {
        id: Date.now().toString() + "-response",
        content: cleanedContent,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error getting response:", error)

      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          content: "Sorry, I couldn't process your request. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Card
          className={`w-80 md:w-96 shadow-lg border-blue-100 overflow-hidden ${isMinimized ? "h-auto" : "h-[500px]"}`}
        >
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-medium">Moroccan Career Guide</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-blue-700 rounded-full"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-blue-700 rounded-full"
                onClick={onClose}
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="p-3 h-[380px] overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white border border-gray-200 rounded-tl-none"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === "bot" ? (
                          <Bot size={16} className="text-blue-600" />
                        ) : (
                          <User size={16} className="text-white" />
                        )}
                        <span className={`text-xs ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.sender === "user" ? "You" : "Assistant"}
                        </span>
                      </div>
                      <div className="text-sm">
                        {message.sender === "bot" ? formatMessageContent(message.content) : message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot size={16} className="text-blue-600" />
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about Moroccan education..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </form>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}


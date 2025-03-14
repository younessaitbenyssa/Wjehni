"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfileFormProps {
  onSubmit: (data: any) => void
}

export default function ProfileForm({ onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    age: "",
    regionalExamGrade: "",
    nationalExamGrade: "",
    baccalaureateMajor: "",
    careerInterests: "",
  })
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setFormError("")
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.age || !formData.regionalExamGrade || !formData.nationalExamGrade || !formData.baccalaureateMajor) {
      setFormError("Please fill in all required fields")
      return
    }

    setLoading(true)
    onSubmit(formData)
    // Note: You'll need to set loading back to false when the map generation is complete
    // This would typically be done in the parent component that handles the onSubmit callback
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Tell us about yourself to get personalized educational guidance</p>
      </div>

      {formError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">{formError}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="age">
            Age <span className="text-red-500">*</span>
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleInputChange}
            className="mt-1"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="regionalExamGrade">
              Regional Exam Grade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="regionalExamGrade"
              name="regionalExamGrade"
              placeholder="e.g., 16.5/20"
              value={formData.regionalExamGrade}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Your grade on the regional exam (out of 20)</p>
          </div>

          <div>
            <Label htmlFor="nationalExamGrade">
              National Exam Grade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nationalExamGrade"
              name="nationalExamGrade"
              placeholder="e.g., 17.2/20"
              value={formData.nationalExamGrade}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Your grade on the national exam (out of 20)</p>
          </div>
        </div>

        <div>
          <Label htmlFor="baccalaureateMajor">
            Baccalaureate Major <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.baccalaureateMajor}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, baccalaureateMajor: value }))
              setFormError("")
            }}
            required
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your baccalaureate major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sciences Math A">Sciences Math A</SelectItem>
              <SelectItem value="Sciences Math B">Sciences Math B</SelectItem>
              <SelectItem value="Sciences Physics">Sciences Physics</SelectItem>
              <SelectItem value="Life and Earth Sciences">Life and Earth Sciences</SelectItem>
              <SelectItem value="Economic Sciences">Economic Sciences</SelectItem>
              <SelectItem value="Literature">Literature</SelectItem>
              <SelectItem value="human sciences">human sciences</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="careerInterests">Career Interests (Optional)</Label>
          <Textarea
            id="careerInterests"
            name="careerInterests"
            placeholder="Describe your career goals and interests..."
            value={formData.careerInterests}
            onChange={handleInputChange}
            className="mt-1 h-32"
          />
          <p className="text-sm text-gray-500 mt-1">Tell us about your interests, strengths, and career aspirations</p>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate My Educational Paths"
          )}
        </Button>
      </form>
    </div>
  )
}


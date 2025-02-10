"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getFortuneTelling } from "./actions"

export function BirthDataForm() {
  const router = useRouter()
  const [year, setYear] = useState("1985")
  const [month, setMonth] = useState("1")
  const [day, setDay] = useState("1")
  const [hour, setHour] = useState("0")
  const [gender, setGender] = useState("male")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await getFortuneTelling({
        year: Number.parseInt(year),
        month: Number.parseInt(month),
        day: Number.parseInt(day),
        hour: Number.parseFloat(hour),
        gender,
      })
      router.push(`/result?analysis=${encodeURIComponent(result)}`)
    } catch (error) {
      console.error(error)
      router.push(`/result?error=${encodeURIComponent(error.message)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label>阳历：</Label>
          <div className="flex items-center gap-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 100 }, (_, i) => 1950 + i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>年</span>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem key={month} value={month.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>月</span>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>日</span>
            <Select value={hour} onValueChange={setHour}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 48 }, (_, i) => i / 2).map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {`${Math.floor(hour).toString().padStart(2, "0")}:${hour % 1 === 0 ? "00" : "30"}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>时</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>性别：</Label>
          <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">男性</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">女性</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
          {isLoading ? "计算中..." : "开始算命"}
        </Button>
      </div>
    </form>
  )
}


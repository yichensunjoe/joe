"use server"

import { solarToLunar } from "./utils/lunarConverter"

interface BirthData {
  year: number
  month: number
  day: number
  hour: number
  gender: string
}

const API_URL = "https://api.deepseek.com/v1/chat/completions"
const API_KEY = "sk-d201e78ec60a447d91a02d2caac28c49"

export async function getFortuneTelling(birthData: BirthData) {
  try {
    const lunarDate = solarToLunar(birthData.year, birthData.month, birthData.day)

    const prompt = `基于中国传统命理学，如《三命通会》和《滴天髓阐微》等经典著作，为以下出生信息的人提供八字算命分析：

    阳历生日：${birthData.year}年${birthData.month}月${birthData.day}日 ${Math.floor(birthData.hour)}:${birthData.hour % 1 === 0 ? "00" : "30"}
    农历生日：${lunarDate.year}年${lunarDate.month}月${lunarDate.day}日
    性别：${birthData.gender === "male" ? "男" : "女"}

    请提供以下详细分析：

    1. 八字命盘：
       - 八字分析
       - 五行分析
       - 五行相克
       - 五行之性
       - 六十日论
       - 格物致语

    2. 命格性格

    3. 财运玄机

    4. 爱情姻缘

    5. 工作事业

    6. 先天健康

    7. 开运秘法

    请用中文回答，并确保每个部分的分析都详细且有见地。`

    console.log("Sending request to DeepSeek API...")
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 20000,
      }),
    })

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("API Error Response:", errorBody)
      throw new Error(`API request failed with status ${response.status}: ${errorBody}`)
    }

    const data = await response.json()
    console.log("API Response:", JSON.stringify(data, null, 2))

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
      throw new Error("Unexpected API response format")
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error("Detailed error in getFortuneTelling:", error)
    throw new Error(`无法生成分析结果，请稍后再试。错误详情: ${error.message}`)
  }
}


const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// 直接从 process.env 获取 API key
const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY || '',  // 添加默认值
    baseURL: "https://api.deepseek.com"
});

app.post('/api/analyze', async (req, res) => {
    try {
        // 检查 API key 是否存在
        if (!process.env.DEEPSEEK_API_KEY) {
            throw new Error('API key not configured');
        }

        const { prompt } = req.body;
        console.log('Received prompt:', prompt);
        
        const response = await client.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    "role": "system",
                    "content": "你是一位精通《三命通会》和《滴天髓阐微》的命理大师，擅长八字命理分析。你会先将阳历准确转换为阴历，然后根据阴历时间进行八字排盘和分析。"
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            top_p: 0.95,
            stream: false
        });

        console.log('API Response:', response);
        res.json({
            analysis: response.choices[0].message.content
        });
    } catch (error) {
        console.error('Error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
        });

        res.status(500).json({
            error: 'API请求失败',
            details: error.response?.data || error.message,
            status: error.response?.status
        });
    }
});

// 添加一个健康检查端点
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});

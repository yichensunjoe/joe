const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
// 修改为正确的 API 端点
const DEEPSEEK_API_URL = 'https://api.deepseek.com';

app.post('/api/analyze', async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log('Received prompt:', prompt);
        
        const response = await axios({
            method: 'post',
            url: DEEPSEEK_API_URL,
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
                model: "deepseek-chat",
                messages: [
                    {
                        "role": "system",
                        "content": "你是一位精通《三命通会》和《滴天髓阐微》的命理大师，擅长八字命理分析。"
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 5000,
                top_p: 0.95,
                stream: false
            }
        });

        console.log('API Response:', response.data);
        res.json({
            analysis: response.data.choices[0].message.content
        });
    } catch (error) {
        // 添加更详细的错误日志
        console.error('Error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
            config: error.config
        });

        res.status(500).json({
            error: 'API请求失败',
            details: error.response?.data || error.message,
            status: error.response?.status
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});

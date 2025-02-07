document.getElementById('baziForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const birthdate = new Date(document.getElementById('birthdate').value);
    await generateAndDisplayResult(birthdate);
});

async function generateAndDisplayResult(birthdate) {
    const baziResult = document.getElementById('baziResult');
    try {
        baziResult.innerHTML = '<div class="loading">正在生成命理分析，请稍候...</div>';

        const prompt = generatePrompt(birthdate);
        const analysis = await callDeepSeekAPI(prompt);
        
        displayResult(analysis);
    } catch (error) {
        console.error('Error:', error);
        baziResult.innerHTML = `
            <div class="error">
                <p>生成分析时出现错误，请稍后重试。</p>
                <p>错误详情：${error.message}</p>
            </div>
        `;
    }
}

function generatePrompt(birthdate) {
    return `作为一位精通《三命通会》和《滴天髓阐微》的命理大师，请根据以下阳历出生时间进行八字命理分析。
请先将阳历转换为阴历，再根据阴历时间排八字：

阳历出生时间：${birthdate.toLocaleString()}

请提供以下内容：
1. 阴历出生时间
2. 完整八字（年柱、月柱、日柱、时柱）
3. 八字五行属性分析
4. 八字总论
5. 性格特点
6. 事业发展
7. 财运分析
8. 感情姻缘
9. 健康提醒
10. 2024年运势预测
11. 吉凶方位与建议

请用专业但通俗易懂的语言进行分析，分析时要考虑：
1. 日主强弱
2. 十神配置
3. 五行生克制化
4. 大运流年
5. 命局喜忌

请确保先将阳历准确转换为阴历后再进行八字排盘和分析。`;
}

async function callDeepSeekAPI(prompt) {
    try {
        console.log('Sending request to backend...');
        // 修改为相对路径
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.analysis) {
            throw new Error('No analysis data received');
        }

        return data.analysis;
    } catch (error) {
        console.error('API Error:', {
            message: error.message,
            stack: error.stack
        });
        throw new Error(`请求失败: ${error.message}`);
    }
}

function displayResult(analysis) {
    const baziResult = document.getElementById('baziResult');
    baziResult.innerHTML = `
        <div class="joe">
            <div class="analysis-content">
                ${formatAnalysis(analysis)}
            </div>
        </div>
    `;
}

function formatAnalysis(analysis) {
    return analysis
        .split('\n')
        .map(line => {
            if (line.trim().startsWith('#')) {
                return `<h4>${line.replace('#', '')}</h4>`;
            }
            return `<p>${line}</p>`;
        })
        .join('');
}

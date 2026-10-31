import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

const SAUDI_ROBOT_SYSTEM_INSTRUCTION = `
أنت مساعدة متجر حنان ناصر الشهراني للعسل الطبيعي في المملكة العربية السعودية.
تتحدثين بصوت وشخصية امرأة سعودية أصيلة، ودودة، كريمة، ومرحبة جداً (مثال: يا هلا والله ومسهلا فيكم، حياكم الله وبياكم، ابشروا بسعدكم، تامرون أمر، سمّوا، على خشمي، عسلنا بلدي مفحوص ومضمون مخبرياً).

معلومات المتجر والملكية النظامية:
- مديرة التطبيق والمتجر: حنان ناصر الشهراني.
- ترخيص رسمي: تعمل بموجب وثيقة/شهادة عمل حر معتمدة صادرة من منصة العمل الحر التابعة لوزارة الموارد البشرية والتنمية الاجتماعية بالمملكة العربية السعودية.
- حقوق الملكية الفكرية: جميع حقوق الملكية الفكرية والعلامة التجارية محفوظة بموجب وثيقة العمل الحر لحنان ناصر الشهراني.
- رقم الجوال والواتساب المعتمد للطلب من جميع أنحاء المملكة: 0507199883.
- الشحن: شحن مبرد وسريع لجميع مدن ومحافظات وقرى المملكة العربية السعودية (مجاني للطلبات فوق 299 ر.س).
- الضمان الذهبي لحنان: استرجاع 3 أضعاف قيمة الطلب فوراً إذا أثبت أي فحص مخبري عدم نقاء العسل.

المهام الأساسية:
1. الترحيب بالعملاء بلطف ونبرة نسائية سعودية دافئة وواثقة ومحترمة.
2. شرح خطوات طلب العسل للعملاء بالتفصيل وباللهجة السعودية:
   - اختيار العسل والوزن (كيلو، نصف كيلو، ربع كيلو).
   - الضغط على "أضف للسلة" ثم فتح السلة وإتمام الطلب وتحديد العنوان.
   - أو إمكانية إصدار فاتورة إلكترونية معتمدة، أو الطلب المباشر عبر الاتصال أو الواتساب على جوال حنان: 0507199883.
3. مساعدة العميل في اختيار العسل الملائم لحالته الصحية (السدر للمناعة والطاقة، الطلح للصدر والبلغم ومناسب للسكر، السمر لفقر الدم والمعدة، المجرى الأبيض قشدي نادر مهدئ ومقوي، المانوكا لجرثومة المعدة).
4. الحفاظ على إجابات لطيفة ومختصرة ومشجعة ومريحة للعميل.
`;

// API route for the Saudi Assistant
app.post('/api/robot/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if API key is not configured in environment
      res.json({
        reply: 'يا هلا ومسهلا بك في متجر حنان ناصر الشهراني! آمر وتدلل، تقدر تطلب مباشرة بالضغط على "أضف للسلة" ثم إتمام الطلب، أو اتصلي فيني وراسليني واتساب على جوالي: 0507199883 وأبشري بسعدك لجميع أنحاء المملكة بموجب شهادة العمل الحر المعتمدة!'
      });
      return;
    }

    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach(h => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: SAUDI_ROBOT_SYSTEM_INSTRUCTION
      }
    });

    const reply = response.text || 'يا هلا وغلا! تامرون أمر، تقدرون تطلبون العسل بكل سهولة من المتجر أو عبر الاتصال المباشر على 0507199883.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini Assistant Chat error:', error);
    res.json({
      reply: 'يا هلا والله ومسهلا فيكم بمتجر حنان الشهراني للعسل! لطلب العسل بكل سهولة: اختاروا نوع العسل والوزن واضغطوا أضف للسلة، أو كلموني مباشرة أو واتساب على 0507199883 وأبشروا بسعدكم!'
    });
  }
});

// API route for Real Female Saudi Voice Text-To-Speech (TTS)
app.post('/api/robot/tts', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.json({ audioBase64: null });
      return;
    }

    // Clean text and keep concise for natural high-fidelity speech
    const cleanText = text.replace(/[*_#•\n]/g, ' ').slice(0, 350);

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Gentle, warm, natural female Saudi voice with polite welcoming hospitality'
              }
            }
          ]
        }
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' } // High-fidelity female voice
          }
        }
      }
    });

    const part = ttsResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    const base64Audio = part?.inlineData?.data || null;
    const mimeType = part?.inlineData?.mimeType || 'audio/wav';
    res.json({ audioBase64: base64Audio, mimeType });
  } catch (err: any) {
    console.warn('Gemini TTS warning (client fallback will handle):', err?.message || err);
    res.json({ audioBase64: null, mimeType: null });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();

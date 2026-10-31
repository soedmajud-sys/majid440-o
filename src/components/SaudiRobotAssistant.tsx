import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Send, Phone, X, ShieldCheck, ChevronDown, ChevronUp, Mic, Square, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'robot';
  text: string;
}

interface SaudiRobotAssistantProps {
  onOpenCatalog: () => void;
  onOpenCart: () => void;
  onOpenTracker?: () => void;
}

export const SaudiRobotAssistant: React.FC<SaudiRobotAssistantProps> = ({
  onOpenCatalog,
  onOpenCart,
  onOpenTracker
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOrderGuide, setShowOrderGuide] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'robot',
      text: 'يا هلا والله ومسهلا فيكم! أنا مساعدتكم حنان بصوت نسائي سعودي طبيعي، آمروا وتدللوا تبوني أشرح لكم خطوات طلب العسل وكيف تختارونه، أو ترغبون بالتواصل المباشر معي أنا حنان ناصر الشهراني على الجوال 0507199883؟ أنا هنا في خدمتكم دائماً!'
    }
  ]);

  // Stop any ongoing audio (Gemini TTS audio element or Web Speech API)
  const stopSpeaking = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsAudioLoading(false);
  };

  // High-fidelity Saudi Female Voice TTS with graceful browser fallback
  const speakText = async (text: string) => {
    if (!voiceEnabled) return;
    stopSpeaking();

    const cleanText = text.replace(/[*_#•\n]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 320);
    if (!cleanText) return;

    setIsAudioLoading(true);

    try {
      // 1. Try Gemini Real Saudi Female Voice TTS via Server
      const res = await fetch('/api/robot/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          const mimeType = data.mimeType || 'audio/wav';
          const audio = new Audio(`data:${mimeType};base64,${data.audioBase64}`);
          currentAudioRef.current = audio;

          audio.onplay = () => {
            setIsAudioLoading(false);
            setIsSpeaking(true);
          };
          audio.onended = () => {
            setIsSpeaking(false);
            currentAudioRef.current = null;
          };
          audio.onerror = () => {
            setIsSpeaking(false);
            setIsAudioLoading(false);
            fallbackWebSpeech(cleanText);
          };

          await audio.play();
          return;
        }
      }
    } catch (err) {
      console.warn('Backend TTS failed, falling back to Web Speech API:', err);
    }

    // 2. Fallback to Browser Web Speech API specifically selecting Saudi/Arabic female voice
    setIsAudioLoading(false);
    fallbackWebSpeech(cleanText);
  };

  const fallbackWebSpeech = (cleanText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ar-SA';
      // Pitch 1.15 and rate 0.92 gives a warm, feminine, hospitable Saudi cadence
      utterance.pitch = 1.15;
      utterance.rate = 0.92;

      const voices = window.speechSynthesis.getVoices();
      // Search for Arabic female voices
      const femaleArVoice = voices.find(v => {
        const name = v.name.toLowerCase();
        const isAr = v.lang.startsWith('ar') || v.lang.includes('SA');
        return isAr && (
          name.includes('female') ||
          name.includes('zari') ||
          name.includes('fatima') ||
          name.includes('laila') ||
          name.includes('salma') ||
          name.includes('noura') ||
          name.includes('zeina') ||
          name.includes('hoda') ||
          name.includes('muna') ||
          name.includes('maryam')
        );
      }) || voices.find(v => v.lang.startsWith('ar') || v.lang.includes('SA'));

      if (femaleArVoice) {
        utterance.voice = femaleArVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    stopSpeaking();

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/robot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      const data = await response.json();
      const replyText = data.reply || 'يا هلا وغلا! تامرون أمر، تقدرون تطلبون العسل مباشرة من المتجر أو بالاتصال على جوالي 0507199883.';

      const robotMsg: Message = {
        id: `rob-${Date.now()}`,
        sender: 'robot',
        text: replyText
      };

      setMessages(prev => [...prev, robotMsg]);
      speakText(replyText);
    } catch (err) {
      console.error('Robot chat request failed:', err);
      const fallbackReply = 'يا هلا فيك! خطوات طلب العسل سهلة جداً: اختر نوع العسل والوزن ثم اضغط أضف للسلة، أو تواصل فوراً واتساب أو اتصال على جوالي 0507199883 وأبشر بسعدك والتوصيل مبرد لكافة مدن المملكة!';
      const robotMsg: Message = {
        id: `rob-${Date.now()}`,
        sender: 'robot',
        text: fallbackReply
      };
      setMessages(prev => [...prev, robotMsg]);
      speakText(fallbackReply);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const quickPrompts = [
    'كيف أطلب العسل خطوة بخطوة؟',
    'كيف تصدر الفاتورة الإلكترونية المعتمدة؟',
    'وين وصل طلبي؟ (تتبع الشحنة)',
    'أبغى أطلب على الجوال والواتساب (0507199883)',
    'إيش أفضل عسل للصدر والكحة؟',
    'إيش العسل المناسب لجرثومة المعدة؟',
    'ما هي شروط الضمان الذهبي وترخيص حنان؟'
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        <button
          onClick={() => {
            const nextState = !isOpen;
            setIsOpen(nextState);
            if (nextState && messages.length === 1 && voiceEnabled) {
              speakText(messages[0].text);
            } else if (!nextState) {
              stopSpeaking();
            }
          }}
          className="relative group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-bold rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer border border-amber-300"
          aria-label="تحدث مع المساعدة الذكية حنان - بصوت امرأة سعودية حقيقي"
        >
          <div className="relative">
            <span className="w-10 h-10 rounded-xl bg-amber-950 text-amber-300 flex items-center justify-center text-xl shadow-inner border border-amber-400/40">
              👩🏻‍💼
            </span>
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-stone-950 flex items-center gap-1.5">
              <span>مساعدتكم حنان</span>
              <span className="text-[10px] bg-amber-950 text-amber-200 px-1.5 py-0.5 rounded font-bold">
                صوت نسائي سعودي 🇸🇦
              </span>
            </div>
            <div className="text-[10px] text-stone-900 font-medium flex items-center gap-1">
              {isSpeaking ? (
                <span className="text-emerald-900 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  تتحدث الآن بصوت نسائي طبيعي...
                </span>
              ) : (
                <span>تشرح لك طريقة طلب العسل صوتياً</span>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Robot Dialogue Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-end sm:items-center justify-start sm:justify-start p-3 sm:p-6 overflow-hidden">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-amber-900/15 flex flex-col max-h-[92vh] text-right overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white flex items-center justify-between border-b border-amber-800/40">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-2xl shadow-md border border-amber-200">
                  👩🏻‍💼
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-bold text-sm text-amber-200 font-amiri">
                      المساعدة الذكية حنان
                    </h3>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40 font-bold">
                      صوت امرأة سعودية حقيقي 🇸🇦
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    تشرح لك طريقة الطلب وتساعدك باختيار العسل البلدي المفحوص
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Voice toggle button */}
                <button
                  onClick={() => {
                    if (voiceEnabled) {
                      stopSpeaking();
                      setVoiceEnabled(false);
                    } else {
                      setVoiceEnabled(true);
                      if (messages.length > 0) {
                        speakText(messages[messages.length - 1].text);
                      }
                    }
                  }}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    voiceEnabled
                      ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                  title={voiceEnabled ? 'كتم الصوت النسائي' : 'تشغيل الصوت النسائي السعودي'}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Stop speech button if speaking */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white border border-red-500 transition-colors cursor-pointer"
                    title="إيقاف الصوت حالاً"
                  >
                    <Square className="w-4 h-4 fill-current" />
                  </button>
                )}

                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Speaking Status Bar & Sound Waves Indicator */}
            {(isSpeaking || isAudioLoading) && (
              <div className="px-4 py-2 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border-b border-amber-200/80 flex items-center justify-between text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 h-4">
                    <span className="w-1 bg-amber-600 rounded-full animate-[bounce_0.8s_infinite_100ms] h-4"></span>
                    <span className="w-1 bg-amber-500 rounded-full animate-[bounce_0.8s_infinite_300ms] h-6"></span>
                    <span className="w-1 bg-amber-600 rounded-full animate-[bounce_0.8s_infinite_150ms] h-3"></span>
                    <span className="w-1 bg-amber-700 rounded-full animate-[bounce_0.8s_infinite_250ms] h-5"></span>
                  </div>
                  <span className="font-bold text-[11px]">
                    {isAudioLoading ? 'جاري تجهيز نبرة الصوت السعودي...' : 'حنان تتحدث الآن بصوت نسائي سعودي طبيعي 🇸🇦'}
                  </span>
                </div>
                <button
                  onClick={stopSpeaking}
                  className="text-[10px] bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold px-2 py-0.5 rounded cursor-pointer transition-colors"
                >
                  إيقاف الصوت ⏹️
                </button>
              </div>
            )}

            {/* Manager & Licensing Banner */}
            <div className="p-3 bg-amber-50 border-b border-amber-200/60 text-xs text-stone-800 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 font-bold text-amber-950">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                  <span>مديرة التطبيق: حنان ناصر الشهراني</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  وثيقة عمل حر معتمدة
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-tight">
                تعمل بموجب شهادة عمل حر من منصة الموارد البشرية · حقوق الملكية محفوظة لحنان الشهراني
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-stone-500">جوال وواتساب الطلبات بالمملكة:</span>
                <a
                  href="tel:0507199883"
                  className="font-mono font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded flex items-center gap-1 hover:bg-amber-300/70 transition-colors"
                >
                  <Phone className="w-3 h-3 text-amber-800" />
                  <span>0507199883</span>
                </a>
              </div>
            </div>

            {/* Voice Audio Sample Quick Play Banner */}
            <div className="px-3 py-1.5 bg-amber-100/60 border-b border-amber-200 flex items-center justify-between text-[11px]">
              <span className="text-stone-700 font-medium">تجربة نبرة الصوت النسائي السعودي:</span>
              <button
                onClick={() => speakText('يا هلا ومسهلا فيكم بمتجر حنان ناصر الشهراني للعسل البلدي الفاخر! أبشروا بسعدكم وتوصيلنا مبرد لباب بيتك.')}
                className="px-2.5 py-0.5 bg-amber-950 hover:bg-stone-900 text-amber-300 font-bold rounded-md flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              >
                <Volume2 className="w-3 h-3 text-amber-400" />
                <span>جرّب صوت حنان الآن 🔊</span>
              </button>
            </div>

            {/* Quick Interactive Order Guide Accordion */}
            <div className="border-b border-stone-200">
              <button
                onClick={() => setShowOrderGuide(!showOrderGuide)}
                className="w-full p-2.5 bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-xs font-bold text-stone-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📋</span>
                  <span>دليل طلب العسل السريع (5 خطوات سهلة)</span>
                </div>
                {showOrderGuide ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
              </button>

              {showOrderGuide && (
                <div className="p-3 bg-stone-50/60 text-[11px] text-stone-700 space-y-1.5 border-t border-stone-200">
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-900 shrink-0">1.</span>
                    <span>اختر نوع العسل والوزن المناسب (1 كجم، 500 جم، 250 جم).</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-900 shrink-0">2.</span>
                    <span>اضغط على زر <strong className="text-amber-950 font-bold">"أضف للسلة"</strong>.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-900 shrink-0">3.</span>
                    <span>افتح السلة واضغط <strong className="text-amber-950 font-bold">"إتمام الطلب"</strong>.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-900 shrink-0">4.</span>
                    <span>سجل اسمك ومدينتك ورقم جوالك لشحن الطلب مبرداً لباب بيتك.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-900 shrink-0">5.</span>
                    <span>اختر الدفع (مدى، Apple Pay، كاش عند الاستلام، أو تابي وتمارا).</span>
                  </div>
                  <div className="pt-1.5 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-stone-500">أو تبي تطلب فوراً عبر الهاتف؟</span>
                    <a
                      href="https://wa.me/966507199883?text=السلام%20عليكم،%20أرغب%20في%20طلب%20عسل%20من%20متجر%20حنان"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-bold flex items-center gap-1"
                    >
                      <span>واتساب مباشر 0507199883</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Messages Chat Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FCFAF7] min-h-[200px] max-h-[300px]">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-900 text-white rounded-br-xs'
                        : 'bg-white text-stone-900 border border-amber-900/10 shadow-sm rounded-bl-xs'
                    }`}
                  >
                    {msg.sender === 'robot' && (
                      <div className="flex items-center justify-between gap-2 mb-1 border-b border-stone-100 pb-1">
                        <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                          <span>👩🏻‍💼 حنان الشهراني (صوت سعودي)</span>
                        </span>
                        <button
                          onClick={() => speakText(msg.text)}
                          className="text-stone-400 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                          title="استمع للرد بصوت نسائي سعودي"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>استماع</span>
                        </button>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-end">
                  <div className="bg-white rounded-2xl p-3 text-xs border border-stone-200 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce delay-100"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-700 animate-bounce delay-200"></span>
                    <span className="text-stone-500 text-[11px]">حنان تجهز لك الشرح بصوتها السعودي...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Pills */}
            <div className="p-2.5 bg-stone-100 border-t border-stone-200 overflow-x-auto flex gap-1.5 text-xs">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-stone-200 hover:border-amber-400 rounded-lg text-[11px] text-stone-700 whitespace-nowrap cursor-pointer transition-all shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex gap-2"
            >
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
                aria-label="إرسال"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>

              <input
                type="text"
                placeholder="اسأل حنان باللهجة السعودية عن طريقة الطلب أو نوع العسل..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

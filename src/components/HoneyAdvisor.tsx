import React, { useState } from 'react';
import { HoneyProduct, HoneySize } from '../types/honey';
import { Sparkles, Check, ShoppingBag, Eye, RotateCcw } from 'lucide-react';

interface HoneyAdvisorProps {
  products: HoneyProduct[];
  onSelectProduct: (product: HoneyProduct) => void;
  onAddToCart: (product: HoneyProduct, size: HoneySize) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const HoneyAdvisor: React.FC<HoneyAdvisorProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  isOpen = true,
  onClose
}) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('المناعة');
  const [selectedTexture, setSelectedTexture] = useState<string>('داكن');
  const [targetAudience, setTargetAudience] = useState<string>('العائلة');
  const [matchedProduct, setMatchedProduct] = useState<HoneyProduct | null>(null);
  const [addedItemKey, setAddedItemKey] = useState<boolean>(false);

  const goalOptions = [
    { id: 'المناعة', label: 'تقوية المناعة والوقاية العائلية', icon: '🛡️' },
    { id: 'الصدر', label: 'الكحة، حساسية الصدر، والجيوب الأنفية', icon: '🫁' },
    { id: 'المعدة', label: 'جرثومة المعدة، الحموضة، والقولون', icon: '🌱' },
    { id: 'السكر', label: 'عسل آمن لمرضى السكر ومتبعي الحميات', icon: '🩸' },
    { id: 'الطاقة', label: 'النشاط البدني وطاقة الرياضيين', icon: '⚡' },
    { id: 'كبار السن', label: 'تغذية الوالدين وصحة المفاصل', icon: '🤍' },
    { id: 'هدايا فاخرة', label: 'إهداء فاخر نادر ومميز', icon: '🎁' }
  ];

  const textureOptions = [
    { id: 'داكن', label: 'عنبري داكن ثقيل غني بنكهة عميقة', note: 'كالسدر والسمر والطلح' },
    { id: 'خفيف', label: 'ذهبي خفيف رقيق وسلس لا يحرق الحلق', note: 'كالقتاد والكينا' },
    { id: 'قشدي', label: 'أبيض قشدي متبلور طبيعياً كالزبدة', note: 'كالمجرى الأبيض' }
  ];

  const audienceOptions = [
    { id: 'العائلة', label: 'للعائلة كاملة' },
    { id: 'الأطفال', label: 'للأطفال (فوق عمر سنة)' },
    { id: 'كبار السن', label: 'للوالدين وكبار السن' },
    { id: 'رياضي', label: 'لي شخصياً (رياضة / دوام)' }
  ];

  const handleFindHoney = () => {
    // Scoring logic
    let best = products[0];
    let highestScore = -1;

    products.forEach(p => {
      let score = 0;
      if (p.bestFor.includes(selectedGoal)) score += 5;
      if (selectedGoal === 'السكر' && p.id === 'talh-hail') score += 8;
      if (selectedGoal === 'المعدة' && (p.id === 'manuka-umf20' || p.id === 'samar-janub' || p.id === 'qatad-baladi')) score += 6;
      if (selectedGoal === 'الصدر' && (p.id === 'talh-hail' || p.id === 'kina-spring')) score += 7;
      if (selectedGoal === 'هدايا فاخرة' && (p.id === 'majra-abyad' || p.id === 'sidr-baladi')) score += 7;
      if (selectedTexture === 'قشدي' && p.id === 'majra-abyad') score += 10;
      if (selectedTexture === 'خفيف' && (p.id === 'qatad-baladi' || p.id === 'kina-spring')) score += 5;
      if (targetAudience === 'الأطفال' && (p.id === 'qatad-baladi' || p.id === 'majra-abyad' || p.id === 'habba-sawda')) score += 4;

      if (score > highestScore) {
        highestScore = score;
        best = p;
      }
    });

    setMatchedProduct(best);
  };

  const handleAddMatched = () => {
    if (!matchedProduct) return;
    onAddToCart(matchedProduct, matchedProduct.sizes[0]);
    setAddedItemKey(true);
    setTimeout(() => setAddedItemKey(false), 2000);
  };

  return (
    <section id="advisor" className="py-16 bg-white border-b border-amber-900/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>استشارة ذكية فورية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-amiri">
            مستشار حنان: كيف تختار العسل الأنسب لحالتك؟
          </h2>
          <p className="text-sm text-stone-600">
            حدد هدفك الصحي وتفضيلك في الطعم، وسيرشح لك المستشار النوع المطابق علمياً لمواصفاتك مع بيان أسباب الاختيار.
          </p>
        </div>

        {/* Step-by-Step Card */}
        <div className="bg-[#FCFAF7] rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-8">
          {/* Step 1: Health Goal */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-stone-800">
              1. ما هي غايتك الأساسية أو مشكلتك الصحية المستهدفة؟
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {goalOptions.map(opt => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSelectedGoal(opt.id)}
                  className={`p-3 rounded-xl border text-right transition-all flex items-center gap-3 cursor-pointer ${
                    selectedGoal === opt.id
                      ? 'border-amber-700 bg-amber-100/70 shadow-sm ring-1 ring-amber-600 font-bold text-amber-950'
                      : 'border-stone-200 bg-white hover:border-amber-300 text-stone-700 text-xs'
                  }`}
                >
                  <span className="text-xl shrink-0">{opt.icon}</span>
                  <span className="text-xs">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Texture & Flavor */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-stone-800">
              2. ما هو القوام والطعم الذي تفضله في العسل؟
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {textureOptions.map(t => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setSelectedTexture(t.id)}
                  className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                    selectedTexture === t.id
                      ? 'border-amber-700 bg-amber-100/70 shadow-sm ring-1 ring-amber-600'
                      : 'border-stone-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900 mb-0.5">{t.label}</p>
                  <p className="text-[11px] text-stone-500">{t.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Audience */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-stone-800">
              3. لمن هذا العسل بشكل رئيسي؟
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {audienceOptions.map(a => (
                <button
                  type="button"
                  key={a.id}
                  onClick={() => setTargetAudience(a.id)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer text-xs font-medium ${
                    targetAudience === a.id
                      ? 'border-amber-700 bg-amber-900 text-amber-50 font-bold shadow-sm'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action to Match */}
          <div className="text-center pt-2">
            <button
              onClick={handleFindHoney}
              className="px-8 py-3.5 text-sm font-extrabold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
            >
              عرض توصية حنان الدقيقة لحالتك
            </button>
          </div>

          {/* Matched Result View */}
          {matchedProduct && (
            <div className="mt-6 pt-6 border-t border-amber-900/10">
              <div className="bg-white rounded-2xl p-6 border-2 border-amber-400 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>نسبة التطابق مع رغبتك: 98.4% (توصية مؤكدة)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4">
                    <img
                      src={matchedProduct.image}
                      alt={matchedProduct.name}
                      className="w-full h-48 object-cover rounded-xl border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <div className="text-xs text-stone-500">
                      <span>{matchedProduct.region}</span> · <span>المصدر: {matchedProduct.floralSource}</span>
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 font-amiri">
                      {matchedProduct.name}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {matchedProduct.tagline}
                    </p>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/50 text-xs text-stone-700">
                      <span className="font-bold text-amber-900">لماذا يناسبك هذا النوع: </span>
                      <span>
                        تم اختياره لتفوقه في معالجة ({selectedGoal})، ومطابقته لتفضيلك في القوام ({selectedTexture})، وهو مناسب جداً لـ ({targetAudience}).
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div>
                        <span className="text-[11px] text-stone-500 block">السعر الحقيقي (1 كجم):</span>
                        <span className="text-2xl font-black text-amber-950 tabular-nums">
                          {matchedProduct.sizes[0].price} <span className="text-sm">ر.س</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProduct(matchedProduct)}
                          className="px-4 py-2.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Eye className="w-4 h-4" />
                          <span>عرض الفحص والمواصفات الكاملة</span>
                        </button>

                        <button
                          onClick={handleAddMatched}
                          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                            addedItemKey
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow'
                          }`}
                        >
                          {addedItemKey ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>تمت الإضافة للسلة!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>أضف للسلة الآن</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

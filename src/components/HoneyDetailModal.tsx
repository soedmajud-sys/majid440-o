import React, { useState } from 'react';
import { HoneyProduct, HoneySize } from '../types/honey';
import { X, ShieldCheck, Check, ShoppingBag, Award, FileText, Sparkles } from 'lucide-react';

interface HoneyDetailModalProps {
  product: HoneyProduct | null;
  onClose: () => void;
  onAddToCart: (product: HoneyProduct, size: HoneySize) => void;
}

export const HoneyDetailModal: React.FC<HoneyDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'lab' | 'usage'>('specs');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const currentSize = product.sizes[selectedSizeIndex] || product.sizes[0];

  const handleAdd = () => {
    onAddToCart(product, currentSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-200 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-900 font-semibold mb-1">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.region}</span>
              {product.badge && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                    {product.badge}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-amiri">
              {product.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media & Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] px-2.5 py-1 rounded-md">
                موسم الجني: {product.harvestSeason}
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px]">المصدر الزهري:</span>
                <span className="font-bold text-stone-800 line-clamp-2">{product.floralSource}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60">
                <span className="text-stone-400 block text-[10px]">اللون والقوام:</span>
                <span className="font-bold text-stone-800">{product.colorName}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>إيحاءات ونكهة التذوق:</span>
              </div>
              <p className="text-stone-700 leading-relaxed text-[11px]">{product.tasteNotes}</p>
            </div>

            {/* Weight Switcher & Price Display */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs mb-1.5 font-bold text-stone-700">
                <span>الوزن والعبوة:</span>
                <span className="text-amber-900 tabular-nums">
                  {currentSize.price} ر.س ({currentSize.weight})
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((s, idx) => (
                  <button
                    key={s.weight}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                      selectedSizeIndex === idx
                        ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.weight.split(' ')[0]}</div>
                    <div className="text-[11px] tabular-nums opacity-90">{s.price} ر.س</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 mb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            المواصفات والفوائد الصحية
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'lab'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>شهادة الفحص المخبري SASO</span>
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'usage'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            طريقة الاستخدام العلاجي
          </button>
        </div>

        {/* Tab 1: Specs & Benefits */}
        {activeTab === 'specs' && (
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-stone-900 mb-2">أبرز الفوائد الصحية المستهدفة:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.healthBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/50">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-stone-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-stone-900 mb-1.5">الفئات الأكثر استفادة من هذا النوع:</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.bestFor.map((tag, i) => (
                  <span key={i} className="bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SASO Lab Certificate View */}
        {activeTab === 'lab' && (
          <div className="bg-stone-50 border border-stone-300 rounded-2xl p-5 text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <div>
                  <h4 className="font-bold text-stone-900">شهادة الفحص المخبري المعتمدة</h4>
                  <p className="text-[10px] text-stone-500">مختبر جودة الأغذية والعسل - المملكة العربية السعودية</p>
                </div>
              </div>
              <div className="text-left">
                <span className="text-[10px] text-stone-400 block">رقم الشهادة:</span>
                <span className="font-mono text-xs font-bold text-stone-800">{product.labCertificateNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">نسبة السكروز المتبقي:</span>
                <span className="font-bold text-stone-900 text-sm">{product.labSpecs.sucrose}</span>
                <p className="text-[10px] text-emerald-700 mt-0.5">مطابق تماماً لمواصفات SASO القياسية</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">نشاط إنزيم الدياستيز:</span>
                <span className="font-bold text-stone-900 text-sm">{product.labSpecs.diastase}</span>
                <p className="text-[10px] text-emerald-700 mt-0.5">يدل على نشاط الإنزيمات الحية وعدم تعرضه للحرارة</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">نسبة الرطوبة المائية:</span>
                <span className="font-bold text-stone-900 text-sm">{product.labSpecs.moisture}</span>
                <p className="text-[10px] text-emerald-700 mt-0.5">نسبة مثالية تضمن حفظ العسل لسنوات دون تخمر</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">قيمة H.M.F (الهيدروكسي ميثيل فورفورال):</span>
                <span className="font-bold text-stone-900 text-sm">{product.labSpecs.hmf}</span>
                <p className="text-[10px] text-emerald-700 mt-0.5">أقل بكثير من الحد الأقصى، طازج ومحفوظ بعناية</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>النتيجة النهائية: عسل طبيعي خام 100% نقي وخالٍ من أي تغذية صناعية أو شوائب.</span>
            </div>
          </div>
        )}

        {/* Tab 3: Usage Instructions */}
        {activeTab === 'usage' && (
          <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-5 text-xs space-y-3">
            <h4 className="font-bold text-stone-900">إرشادات حنان لتناول العسل وتحقيق أقصى فائدة:</h4>
            <p className="text-stone-700 leading-relaxed text-xs">
              {product.usageInstructions}
            </p>
            <div className="space-y-1.5 pt-2 text-[11px] text-stone-600 border-t border-amber-200/50">
              <p>• تجنب استخدام الملاعق المعدنية، واستخدم الملاعق الخشبية أو البلاستيكية للحفاظ على الإنزيمات الحية.</p>
              <p>• لا تخلط العسل مع سوائل تغلي حتى لا تتكسر الإنزيمات ومضادات الأكسدة الحيوية.</p>
              <p>• يحفظ في درجة حرارة الغرفة (20 - 25 درجة مئوية) في مكان جاف ومظلم بعيداً عن أشعة الشمس المباشرة.</p>
            </div>
          </div>
        )}

        {/* Bottom Bar: Price & Add to Cart */}
        <div className="pt-6 mt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-stone-500 block">الإجمالي للوزن المختار:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-950 tabular-nums">
                {currentSize.price} <span className="text-sm font-bold">ر.س</span>
              </span>
              <span className="text-xs text-stone-500">({currentSize.weight})</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              إغلاق
            </button>

            <button
              onClick={handleAdd}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-md active:scale-98'
              }`}
            >
              {isAdded ? (
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
  );
};

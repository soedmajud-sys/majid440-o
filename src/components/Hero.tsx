import React from 'react';
import { ShieldCheck, Truck, Sparkles, Award } from 'lucide-react';

interface HeroProps {
  onOpenAdvisor: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor, onExploreCatalog }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-[#FCFAF7] to-[#FCFAF7] pt-8 pb-16 border-b border-amber-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900/80 bg-amber-100/70 border border-amber-200/60 rounded-full px-3.5 py-1">
              <span>مناحل حنان الطبيعية</span>
              <span aria-hidden="true">·</span>
              <span>مفحوصة مخبرياً 100% SASO</span>
              <span aria-hidden="true">·</span>
              <span>شحن لكافة مدن المملكة</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.25] font-amiri [text-wrap:balance]">
              أجود أنواع العسل الطبيعي في السعودية <br className="hidden sm:inline" />
              <span className="text-amber-800">بإدارة حنان ناصر الشهراني</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              أهلاً بكم في متجر حنان ناصر الشهراني، المرخص رسمياً بموجب شهادة عمل حر من منصة الموارد البشرية. نوفر لكم تشكيلة شاملة من أعسال المملكة البرية والجبلية (السدر البلدي، الطلح، السمر، والمجرى الأبيض النادر)، عسل خام غير مبستر مع شهادة فحص مخبرية موثقة لكل قطرة، وضمان استرجاع 3 أضعاف القيمة.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 text-sm font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                تصفح جميع أنواع العسل والأسعار
              </button>

              <a
                href="https://wa.me/966507199883?text=السلام%20عليكم،%20أرغب%20في%20طلب%20عسل%20طبيعي%20من%20متجر%20حنان%20الشهراني"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
              >
                <span>طلب سريع واتساب / اتصال:</span>
                <span className="font-mono text-xs underline">0507199883</span>
              </a>

              <button
                onClick={onOpenAdvisor}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-amber-50/70 border border-amber-900/15 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>مستشار العسل الذكي</span>
              </button>
            </div>

            {/* Quick Pricing note */}
            <div className="text-xs text-stone-500 pt-2 flex items-center gap-2">
              <span className="font-semibold text-stone-700">ملاحظة الشفافية:</span>
              <span>الأسعار تبدأ من 65 ر.س لربع الكيلو حتى 490 ر.س لكيلو المجرى النادر، مع شحن مجاني للطلبات فوق 299 ر.س.</span>
            </div>
          </div>

          {/* Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-900/10 bg-amber-100/30 aspect-[4/3] lg:aspect-auto lg:h-[460px]">
              <img
                src="/src/assets/images/hero_honey_boutique_1793479795301.jpg"
                alt="عسل حنان الطبيعي الفاخر"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent"></div>

              {/* Float Card on Hero */}
              <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200/60 shadow-lg text-right">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-xs text-amber-900 font-bold">عسل سدر بلدي ومجرى أبيض وطلح</p>
                    <p className="text-xs text-stone-500">مفحوصة بنسبة سكروز أقل من 1.5% وإنزيمات نشطة</p>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-stone-400 block line-through">440 ر.س</span>
                    <span className="text-base font-extrabold text-amber-900 tabular-nums">390 ر.س</span>
                    <span className="text-[10px] text-stone-500 block">للكيلو الصافي</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Full-Width Value Strip below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-amber-900/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/40">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">فحص مخبري موثق</h4>
              <p className="text-[11px] text-stone-500">مطابق لمواصفات هيئة SASO</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/40">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">الضمان الذهبي لحنان</h4>
              <p className="text-[11px] text-stone-500">استرداد 3 أضعاف القيمة إذا لم يكن طبيعياً</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/40">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">شحن مبرد وسريع</h4>
              <p className="text-[11px] text-stone-500">توصيل آمن لجميع مدن المملكة</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-200/40">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-700 shrink-0">
              <span className="text-lg">🌿</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">100% خام غير مبستر</h4>
              <p className="text-[11px] text-stone-500">محتفظ بكامل الإنزيمات الحية</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

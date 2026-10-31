import React from 'react';
import { Award, ShieldAlert, CheckCircle2, PhoneCall } from 'lucide-react';

export const GoldenGuarantee: React.FC = () => {
  return (
    <section id="golden-guarantee" className="py-16 bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="bg-amber-900/30 border border-amber-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden backdrop-blur-sm">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/30">
                <Award className="w-4 h-4 text-amber-400" />
                <span>الضمان الذهبي الصارم لمتجر حنان</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-amiri leading-snug">
                عسل طبيعي 100% أو استرجاع <span className="text-amber-400">3 أضعاف قيمته فوراً</span>
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                نثق في نقاء مناحلنا وخلو عسلنا من أي تسخين تجاري أو تغذية صناعية. إذا قمت بفحص العسل في أي مختبر رسمي معتمد داخل المملكة العربية السعودية وثبت عكس ذلك، نلتزم بإعادة ثلاثة أضعاف المبلغ الذي دفعته، مع تحمل كافة تكاليف الفحص المخبري.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>شهادة فحص مخبرية معتمدة لكل دفعة</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>شحن مبرد يحمي الإنزيمات الحية من حرارة الطقس</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>برطمانات زجاجية معتمة تمنع تفاعل الضوء</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>ملعقة خشبية خاصة مجاناً مع كل شحنة</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto text-2xl font-black">
                3X
              </div>
              <h4 className="text-base font-bold text-amber-100">ضمان النقاء الثلاثي</h4>
              <p className="text-[11px] text-stone-300">
                راحة بال تامة وصحة مستدامة لك ولعائلتك الكريمة.
              </p>
              <a
                href="#catalog"
                className="inline-block w-full py-2.5 px-4 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow cursor-pointer"
              >
                اطلب الآن بثقة وأمان
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

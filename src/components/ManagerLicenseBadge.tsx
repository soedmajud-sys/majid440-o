import React, { useState } from 'react';
import { ShieldCheck, Phone, CheckCircle2, Award, FileText, X } from 'lucide-react';

export const ManagerLicenseBadge: React.FC = () => {
  const [showDocModal, setShowDocModal] = useState<boolean>(false);

  return (
    <>
      <div className="bg-gradient-to-r from-amber-900/10 via-amber-50 to-amber-900/10 border-y border-amber-900/15 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-800 text-right">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span className="font-bold text-stone-900">
              مديرة التطبيق والمناحل: <span className="text-amber-950 font-black">حنان ناصر الشهراني</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">|</span>
            <span className="text-stone-600">
              مرخصة بموجب <strong className="text-emerald-800 font-bold">شهادة عمل حر</strong> من منصة العمل الحر - وزارة الموارد البشرية والتنمية الاجتماعية
            </span>
            <button
              onClick={() => setShowDocModal(true)}
              className="text-amber-800 underline font-semibold hover:text-amber-950 cursor-pointer text-[11px]"
            >
              (معاينة وثيقة الترخيص والملكية)
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-[11px] text-stone-600 font-medium hidden sm:inline">
              للطلب من جميع أنحاء المملكة:
            </div>
            <a
              href="tel:0507199883"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="font-mono text-sm tracking-wide">0507199883</span>
            </a>
            <a
              href="https://wa.me/966507199883?text=السلام%20عليكم%20ورحمة%20الله،%20أرغب%20في%20طلب%20عسل%20طبيعي%20من%20متجر%20حنان%20ناصر%20الشهراني"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer text-xs"
            >
              <span>واتساب سريع</span>
            </a>
          </div>
        </div>
      </div>

      {/* Official Freelance Certificate Modal */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <button
                onClick={() => setShowDocModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-bold text-stone-900 font-amiri">
                  وثيقة العمل الحر وحقوق الملكية النظامية
                </h3>
              </div>
            </div>

            {/* Certificate Styled Display */}
            <div className="bg-[#FCFAF7] border-2 border-emerald-600/30 rounded-2xl p-6 text-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div>
                  <p className="text-[10px] text-stone-400">المملكة العربية السعودية</p>
                  <p className="font-bold text-stone-800 text-xs">منصة العمل الحر - وزارة الموارد البشرية</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                  معتمد
                </div>
              </div>

              <div className="space-y-2 pt-1 text-stone-800">
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-500">اسم الممارس / مديرة التطبيق:</span>
                  <span className="font-bold text-stone-900 text-sm">حنان ناصر الشهراني</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-500">النشاط المرخص:</span>
                  <span className="font-bold text-stone-900">إنتاج وبيع العسل الطبيعي والمشتقات الغذائية</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-500">رقم الاتصال والطلبات المعتمد:</span>
                  <span className="font-mono font-bold text-amber-950 text-sm">0507199883</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-500">نطاق الخدمة والشحن:</span>
                  <span className="font-bold text-stone-900">كافة مدن ومحافظات المملكة العربية السعودية</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-500">حقوق الملكية الفكرية:</span>
                  <span className="font-semibold text-emerald-800">محفوظة بموجب شهادة العمل الحر لحنان ناصر الشهراني</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  هذا المتجر نظامي ومسجل بالكامل بموجب لوائح التجارة الإلكترونية وضوابط العمل الحر المعتمدة بالمملكة العربية السعودية، ومشمول بضمان الجودة والفحص المخبري.
                </span>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => setShowDocModal(false)}
                className="px-6 py-2.5 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

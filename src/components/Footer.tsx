import { ShieldCheck, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 text-right pt-12 pb-8 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-xl font-bold font-amiri text-amber-400 block">
              متجر حنان للعسل الفاخر
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              مديرة التطبيق والمناحل: <strong className="text-white">حنان ناصر الشهراني</strong>.
              متجر سعودي رسمي متخصص في جمع وإنتاج أفخر أنواع العسل البري والجبلي من مراعي المملكة، موثق ومفحوص مخبرياً.
            </p>
            <div className="text-[11px] text-amber-300 bg-stone-800/80 p-2 rounded-lg border border-stone-700/60 space-y-1">
              <div>✓ تعمل بموجب <strong>شهادة عمل حر</strong> من منصة الموارد البشرية</div>
              <div>✓ حقوق الملكية الفكرية محفوظة لحنان ناصر الشهراني</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">
              أنواع العسل في المملكة
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">عسل السدر الجبلي البلدي</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">عسل الطلح الحائلي البري</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">عسل السمر البلدي الجنوبي</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">عسل المجرى الأبيض النادر</a></li>
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">عسل القتاد والضهيان والكينا</a></li>
            </ul>
          </div>

          {/* Trust & Certifications */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">
              الجودة والاعتماد
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>شهادة عمل حر - منصة الموارد البشرية</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>فحص مخبري دوري معتمد SASO</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>شحن مبرد لكافة مدن ومحافظات المملكة</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>الضمان الذهبي (استرجاع 3 أضعاف)</span>
              </li>
            </ul>
          </div>

          {/* Contact & Saudi Shipping */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">
              الطلب من جميع أنحاء المملكة
            </h4>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              توصيل مبرد سريع لجميع مدن ومحافظات المملكة العربية السعودية عبر سمسا وأرامكس خلال 24 - 48 ساعة.
            </p>
            <div className="bg-stone-800 p-3.5 rounded-xl border border-stone-700 text-xs space-y-1.5">
              <div className="text-stone-400 text-[11px]">جوال وواتساب الطلبات المباشر:</div>
              <a
                href="tel:0507199883"
                className="font-mono text-sm font-bold text-amber-300 block hover:underline"
              >
                0507199883
              </a>
              <a
                href="https://wa.me/966507199883?text=السلام%20عليكم،%20أرغب%20في%20طلب%20عسل%20من%20متجر%20حنان%20ناصر%20الشهراني"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[11px] font-bold"
              >
                مراسلة واتساب فورية
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div className="flex flex-wrap items-center gap-3">
            <p>© {new Date().getFullYear()} متجر حنان للعسل الفاخر. جميع الحقوق محفوظة في المملكة العربية السعودية.</p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-stone-500 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <Lock className="w-3 h-3 text-amber-500" />
                <span>بوابة الإدارة والفواتير</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span>مدى</span>
            <span aria-hidden="true">·</span>
            <span>Apple Pay</span>
            <span aria-hidden="true">·</span>
            <span>تابي</span>
            <span aria-hidden="true">·</span>
            <span>تمارا</span>
            <span aria-hidden="true">·</span>
            <span>الدفع عند الاستلام</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

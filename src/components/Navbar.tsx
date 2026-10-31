import { ShoppingBag, Sparkles, Lock } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdvisor: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenAdvisor, onOpenTracker, onOpenAdmin }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-amber-950 font-amiri whitespace-nowrap shrink-0 group"
          >
            <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
              🍯
            </span>
            <span>متجر حنان للعسل</span>
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            <a
              href="#catalog"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              أنواع العسل في السعودية
            </a>
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer font-bold text-amber-950"
            >
              <span>🚚 تتبع شحنتك</span>
            </button>
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>مستشار العسل</span>
            </button>
            <a
              href="#customer-reviews"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              تجارب العملاء
            </a>
            <a
              href="#golden-guarantee"
              className="hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              الضمان الذهبي
            </a>
          </nav>

          {/* Zone 3: 1 primary action & Phone */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:0507199883"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors border border-amber-300"
              title="اتصل مباشرة للطلب"
            >
              <span>📞</span>
              <span className="font-mono text-xs">0507199883</span>
            </a>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">سلة المشتريات</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center text-xs font-bold bg-amber-950 text-amber-100 rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hidden Admin Portal Trigger */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-stone-400 hover:text-amber-950 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-stone-200"
              title="بوابة الإدارة والفواتير (رقم سري)"
              aria-label="بوابة الإدارة"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

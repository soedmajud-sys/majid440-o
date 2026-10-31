import React, { useState, useEffect } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, PackageCheck, ThermometerSnowflake, Phone, ExternalLink } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOrderNumber?: string;
}

interface ShipmentStatus {
  orderId: string;
  customerName: string;
  city: string;
  district: string;
  carrier: 'سمسا إكسبريس (SMSA)' | 'أرامكس (Aramex)' | 'أسطول حنان المبرد المباشر';
  carrierTrackingNumber: string;
  carrierPhone: string;
  orderDate: string;
  estimatedArrival: string;
  packageDescription: string;
  tempControlled: string;
  currentStepIndex: number;
  timeline: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
}

const SAMPLE_ORDERS: Record<string, ShipmentStatus> = {
  'HN-284910': {
    orderId: 'HN-284910',
    customerName: 'عبد الله السبيعي',
    city: 'الرياض',
    district: 'حي الملقا',
    carrier: 'أسطول حنان المبرد المباشر',
    carrierTrackingNumber: 'HN-COLD-9982',
    carrierPhone: '0507199883',
    orderDate: 'اليوم، 10:30 صباحاً',
    estimatedArrival: 'اليوم بين الساعة 4:00 عصراً و 7:00 مساءً (توصيل نفس اليوم)',
    packageDescription: 'عسل السدر الجبلي البلدي (1 كجم) + ملعقة خشبية خاصة',
    tempControlled: '19.5°C - شحن مبرد محمي ضد أشعة الشمس',
    currentStepIndex: 3,
    timeline: [
      { title: 'تأكيد الطلب والاعتماد المالي', description: 'تم استلام وتوثيق طلبك في نظام مناحل حنان', time: '10:30 ص', completed: true },
      { title: 'التعبئة والتغليف الآمن', description: 'تعبئة في عبوة زجاجية معتمة مقاومة للصدمات مع شهادة SASO', time: '11:15 ص', completed: true },
      { title: 'التحميل في سيارات النقل المبرد', description: 'تم تسليم الشحنة لأسطول حنان المزود بوحدات تبريد مخصصة للعسل', time: '12:30 م', completed: true },
      { title: 'المندوب في طريقه إلى حي الملقا', description: 'الشحنة مع مندوب التوصيل المباشر بالرياض', time: '02:15 م', completed: true },
      { title: 'التسليم لباب العميل', description: 'التسليم النهائي والفحص أمام العميل', time: 'متوقع 05:30 م', completed: false }
    ]
  },
  'HN-441290': {
    orderId: 'HN-441290',
    customerName: 'د. سارة آل الشيخ',
    city: 'جدة',
    district: 'حي الروضة',
    carrier: 'سمسا إكسبريس (SMSA)',
    carrierTrackingNumber: 'SMSA-928174112',
    carrierPhone: '920009999',
    orderDate: 'أمس، 03:00 مساءً',
    estimatedArrival: 'غداً الأحد خلال الفترة الصباحية (قبل 1:00 ظهراً)',
    packageDescription: 'عسل المجرى الأبيض النادر (500 جم) + عسل حبة البركة (1 كجم)',
    tempControlled: '20.0°C - سيارات مبردة معتمدة لهيئة الغذاء والدواء',
    currentStepIndex: 2,
    timeline: [
      { title: 'تم استلام الطلب', description: 'توثيق الطلب وإصدار بوليصة سمسا للشحن المبرد', time: 'أمس 03:00 م', completed: true },
      { title: 'فحص الجودة والتغليف', description: 'فحص الأختام والتغليف في كرتون حراري عازل', time: 'أمس 05:20 م', completed: true },
      { title: 'الوصول لمركز فرز سمسا بجدة', description: 'وصلت الشحنة لمركز التوزيع الإقليمي بجدة وجاري الفرز للتوزيع', time: 'اليوم 08:40 ص', completed: true },
      { title: 'خروج الشحنة للتوصيل مع المندوب', description: 'تسليم الشحنة لسائق التوزيع في قطاع الروضة', time: 'غداً صباحاً', completed: false },
      { title: 'تم التوصيل بنجاح', description: 'استلام العميل للشحنة والتوقيع الرقمي', time: 'غداً ظهراً', completed: false }
    ]
  },
  'HN-712850': {
    orderId: 'HN-712850',
    customerName: 'م. خالد القحطاني',
    city: 'الدمام',
    district: 'حي الشاطئ',
    carrier: 'أرامكس (Aramex)',
    carrierTrackingNumber: 'ARMX-551029841',
    carrierPhone: '920027447',
    orderDate: 'أمس، 11:00 صباحاً',
    estimatedArrival: 'غداً الأحد بين الساعة 12:00 ظهراً و 4:00 عصراً',
    packageDescription: 'بكج العسل الثلاثي الملكي (سدر بلدي، طلح حائل، سمر الجنوب)',
    tempControlled: '21.0°C - نقل حراري محمي',
    currentStepIndex: 2,
    timeline: [
      { title: 'تأكيد الطلب وبوليصة الشحن', description: 'تم ربط الشحنة بحساب أرامكس برقم التتبع ARMX-551029841', time: 'أمس 11:00 ص', completed: true },
      { title: 'التجهيز في المناحل', description: 'إرفاق شهادة الفحص المخبري والملاعق الخشبية', time: 'أمس 01:30 م', completed: true },
      { title: 'في الطريق إلى المنطقة الشرقية', description: 'الشاحنة المبردة في مسارها بين الرياض والدمام', time: 'اليوم 09:15 ص', completed: true },
      { title: 'الفرز بمركز الدمام', description: 'تجهيز الشحنة لتسليمها لسيارة التوصيل المحلية', time: 'متوقع اليوم مساءً', completed: false },
      { title: 'تم التسليم لباب المنزل', description: 'استلام الشحنة وتأكيد الرضا', time: 'غداً 02:00 م', completed: false }
    ]
  }
};

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  defaultOrderNumber
}) => {
  const [searchId, setSearchId] = useState<string>(defaultOrderNumber || 'HN-284910');
  const [shipment, setShipment] = useState<ShipmentStatus | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (defaultOrderNumber) {
      setSearchId(defaultOrderNumber);
      handleSearch(defaultOrderNumber);
    } else {
      handleSearch('HN-284910');
    }
  }, [defaultOrderNumber, isOpen]);

  const handleSearch = (idToSearch?: string) => {
    const query = (idToSearch || searchId).trim().toUpperCase();
    if (!query) return;

    // Check pre-set orders
    if (SAMPLE_ORDERS[query]) {
      setShipment(SAMPLE_ORDERS[query]);
      setNotFound(false);
      return;
    }

    // Dynamic generated generator for newly placed orders (starts with HN-)
    if (query.startsWith('HN-') || query.length >= 5) {
      const generated: ShipmentStatus = {
        orderId: query,
        customerName: 'عميل متجر حنان',
        city: 'المملكة العربية السعودية',
        district: 'العنوان المحدد في الطلب',
        carrier: 'سمسا إكسبريس (SMSA)',
        carrierTrackingNumber: `SMSA-${Math.floor(100000000 + Math.random() * 900000000)}`,
        carrierPhone: '920009999',
        orderDate: 'اليوم',
        estimatedArrival: 'خلال 24 إلى 48 ساعة كحد أقصى (شحن مبرد سريع)',
        packageDescription: 'عسل طبيعي فاخر مفحوص مخبرياً + عبوة زجاجية آمنة',
        tempControlled: '20°C - نقل مبرد مطابق لمواصفات SASO',
        currentStepIndex: 1,
        timeline: [
          { title: 'تم تأكيد الطلب بنجاح', description: 'توثيق عملية الشراء وإصدار الفاتورة الضريبية', time: 'اليوم', completed: true },
          { title: 'التجهيز والفحص المخبري', description: 'تغليف آمن في عبوة زجاجية وإرفاق شهادة الفحص والملاعق الخشبية', time: 'جاري الآن', completed: true },
          { title: 'تسليم الشحنة لشركة النقل المبرد', description: 'تجهيز التحميل في سيارات سمسا المجهزة للتوصيل بين المدن', time: 'قيد الإجراء', completed: false },
          { title: 'الشحنة في طريقها لمدينتك', description: 'الانتقال إلى مركز التوزيع المحلي', time: 'غداً', completed: false },
          { title: 'خروج المندوب والتسليم', description: 'اتصال المندوب والتسليم لباب المنزل', time: 'خلال 24-48 ساعة', completed: false }
        ]
      };
      setShipment(generated);
      setNotFound(false);
    } else {
      setShipment(null);
      setNotFound(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-200 my-8 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-md mb-1">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              <span>تتبع شحنة العسل المبردة</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-amiri">
              حالة شحنتك وتوقع موعد الوصول
            </h2>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="space-y-2 mb-6">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-sm active:scale-98 flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>تتبع الشحنة</span>
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="أدخل رقم الطلب (مثال: HN-284910)"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-mono"
              />
            </div>
          </form>

          {/* Quick Click Samples */}
          <div className="flex items-center gap-2 overflow-x-auto text-[11px] text-stone-500 pt-1">
            <span className="whitespace-nowrap shrink-0">نماذج شحنات جاهزة:</span>
            <div className="flex gap-1.5 flex-nowrap">
              {Object.keys(SAMPLE_ORDERS).map(id => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSearchId(id);
                    handleSearch(id);
                  }}
                  className={`px-2 py-0.5 rounded font-mono text-[10px] cursor-pointer transition-colors ${
                    searchId === id ? 'bg-amber-900 text-amber-100 font-bold' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {notFound ? (
          <div className="py-12 text-center space-y-3 bg-stone-50 rounded-2xl border border-stone-200 p-6">
            <p className="text-base font-bold text-stone-800">لم يتم العثور على طلب بهذا الرقم</p>
            <p className="text-xs text-stone-500">
              تأكد من كتابة رقم الطلب بالشكل الصحيح مثل <span className="font-mono font-bold text-stone-700">HN-284910</span> أو تواصل مباشرة مع جوال حنان <span className="font-mono font-bold text-amber-900">0507199883</span>.
            </p>
          </div>
        ) : shipment ? (
          <div className="space-y-6">
            {/* Carrier & Estimated Delivery Banner */}
            <div className="bg-gradient-to-br from-amber-50 via-amber-100/40 to-stone-50 p-5 rounded-2xl border border-amber-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                <div>
                  <span className="text-[10px] text-stone-500 block">شركة الشحن المعتمدة:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">{shipment.carrier}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      شحن مبرد ❄️
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-left">
                  <span className="text-[10px] text-stone-500 block">رقم بوليصة الشحن:</span>
                  <span className="font-mono text-xs font-bold text-amber-950 bg-white/80 px-2 py-0.5 rounded border border-amber-200 inline-block">
                    {shipment.carrierTrackingNumber}
                  </span>
                </div>
              </div>

              {/* Arrival Highlight */}
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-amber-200">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-stone-500 block">الموعد المتوقع لوصول شحنة العسل:</span>
                  <span className="text-sm font-extrabold text-amber-950 block mt-0.5">
                    {shipment.estimatedArrival}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    الوجهة: {shipment.city} - {shipment.district}
                  </span>
                </div>
              </div>

              {/* Cold Chain Guarantee */}
              <div className="flex items-center gap-2 text-xs text-stone-700 pt-1">
                <ThermometerSnowflake className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px] text-stone-600">
                  <strong className="text-stone-900 font-bold">الحفاظ على الجودة:</strong> {shipment.tempControlled}
                </span>
              </div>
            </div>

            {/* Shipment Items Summary */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-1">
              <div className="flex items-center justify-between text-stone-500 text-[11px]">
                <span>محتويات الشحنة:</span>
                <span>تاريخ التجهيز: {shipment.orderDate}</span>
              </div>
              <p className="font-bold text-stone-900">{shipment.packageDescription}</p>
            </div>

            {/* Interactive Timeline Stepper */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-amber-700" />
                <span>مراحل مسار الشحنة خطوة بخطوة:</span>
              </h4>

              <div className="space-y-4 relative border-r-2 border-stone-200 mr-2 pr-6">
                {shipment.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step Icon Indicator */}
                    <div
                      className={`absolute -right-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                        step.completed
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                          : idx === shipment.currentStepIndex
                          ? 'bg-amber-500 text-stone-950 font-bold ring-4 ring-amber-100 animate-pulse'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    {/* Step Content */}
                    <div className="text-xs">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${step.completed ? 'text-stone-900' : 'text-stone-500'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Support & Call Options */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-stone-500 text-[11px] text-center sm:text-right">
                لديك استفسار حول الشحنة أو ترغب في تعديل موعد الاستلام؟
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:0507199883`}
                  className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال بحنان: 0507199883</span>
                </a>
                <a
                  href={`https://wa.me/966507199883?text=السلام%20عليكم،%20أستفسر%20عن%20شحنة%20العسل%20رقم%20${shipment.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>واتساب الشحنة</span>
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

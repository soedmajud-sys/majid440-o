import React, { useState } from 'react';
import { CartItem } from '../types/honey';
import { SAUDI_CITIES } from '../data/honeyData';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercent: number;
  onOrderCompleted: (newOrderData?: any) => void;
  onTrackOrder?: (orderNumber: string) => void;
  onOpenElectronicInvoice?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercent,
  onOrderCompleted,
  onTrackOrder,
  onOpenElectronicInvoice
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('الرياض');
  const [district, setDistrict] = useState<string>('');
  const [addressNotes, setAddressNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'applepay' | 'cod' | 'tabby' | 'tamara'>('mada');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 299 ? 0 : 28;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderNum = `HN-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsSubmitting(false);
      setOrderSuccess(true);
      
      const itemsText = cartItems.map(i => `${i.product.name} (${i.selectedSize.weight}) × ${i.quantity}`).join('، ');
      const taxVal = Math.round((grandTotal * 15) / 115);

      onOrderCompleted({
        id: generatedOrderNum,
        customerName,
        phoneNumber,
        city: selectedCity,
        district,
        itemsSummary: itemsText,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod === 'mada' ? 'مدى' : paymentMethod === 'applepay' ? 'Apple Pay' : paymentMethod === 'cod' ? 'عند الاستلام' : paymentMethod === 'tabby' ? 'تابي' : 'تمارا',
        taxAmount: taxVal
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-200 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-amiri">
              {orderSuccess ? 'تم تأكيد طلبك بنجاح!' : 'إتمام الطلب وتأكيد الشحن'}
            </h3>
            <p className="text-xs text-stone-500">
              {orderSuccess ? 'شكراً لثقتكم في متجر حنان' : 'شحن مبرد آمن لكافة مناطق المملكة'}
            </p>
          </div>
        </div>

        {orderSuccess ? (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-stone-900 font-amiri">
                تم استلام طلبك رقم: <span className="text-amber-800 font-mono">{orderNumber}</span>
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                سعداء جداً بخدمتك يا {customerName}. تم إرسال رسالة نصية (SMS) إلى جوالك ({phoneNumber}) تحتوي على رابط تتبع الشحنة المبردة وفاتورة الشراء الضريبية.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-right max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">المدينة والتوصيل:</span>
                <span className="font-bold text-stone-900">{selectedCity} - {district || 'وسط المدينة'}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">طريقة الدفع المختارة:</span>
                <span className="font-bold text-stone-900">
                  {paymentMethod === 'mada' && 'مدى (Mada)'}
                  {paymentMethod === 'applepay' && 'Apple Pay'}
                  {paymentMethod === 'cod' && 'الدفع نقداً عند الاستلام'}
                  {paymentMethod === 'tabby' && 'تابي (4 دفعات)'}
                  {paymentMethod === 'tamara' && 'تمارا (4 دفعات)'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1">
                <span className="text-stone-700">المبلغ الإجمالي المدفوع:</span>
                <span className="text-amber-950 tabular-nums">{grandTotal} ر.س</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              <span>مشمول بالضمان الذهبي لحنان: استرداد 3 أضعاف القيمة إذا لم يكن طبيعياً 100%.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onTrackOrder && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTrackOrder(orderNumber);
                  }}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  <span>🚚 تتبع مسار شحنتك المبردة الآن</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer"
              >
                العودة للمتجر
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="space-y-6 text-xs text-right">
            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-1.5">
                1. بيانات المستلم وعنوان التوصيل:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">الاسم الثلاثي:</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="مثال: محمد بن سعد العتيبي"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">رقم الجوال (للتوصيل والتأكيد):</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-left focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">المدينة بالمملكة:</label>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 cursor-pointer"
                  >
                    {SAUDI_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">الحي / الشارع:</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    placeholder="مثال: حي النرجس، شارع الأمير فيصل"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">ملاحظات التوصيل (اختياري):</label>
                <input
                  type="text"
                  value={addressNotes}
                  onChange={e => setAddressNotes(e.target.value)}
                  placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-1.5">
                2. طريقة الدفع الآمنة:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mada')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'mada'
                      ? 'border-amber-700 bg-amber-50/80 ring-1 ring-amber-600 font-bold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-900" />
                  <span className="text-xs">بطاقة مدى (Mada)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-amber-700 bg-amber-50/80 ring-1 ring-amber-600 font-bold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-base"></span>
                  <span className="text-xs">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-amber-700 bg-amber-50/80 ring-1 ring-amber-600 font-bold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-900" />
                  <span className="text-xs">الدفع عند الاستلام</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('tamara')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'tamara'
                      ? 'border-amber-700 bg-amber-50/80 ring-1 ring-amber-600 font-bold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-xs font-bold text-amber-800">tamara</span>
                  <span className="text-[10px] text-stone-500">قسمها على 4 دفعات</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('tabby')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'tabby'
                      ? 'border-amber-700 bg-amber-50/80 ring-1 ring-amber-600 font-bold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-xs font-bold text-emerald-700">tabby</span>
                  <span className="text-[10px] text-stone-500">4 دفعات بدون فوائد</span>
                </button>
              </div>
            </div>

            {/* Order Summary Strip */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/50 space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-600">المجموع الفرعي ({cartItems.length} منتجات):</span>
                <span className="font-bold text-stone-900 tabular-nums">{subtotal} ر.س</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>كوبون الخصم ({discountPercent}%):</span>
                  <span className="tabular-nums">-{discountAmount} ر.س</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-600">الشحن والتوصيل المبرد:</span>
                <span className="font-bold text-stone-900">
                  {shippingFee === 0 ? 'مجاني 🎁' : `${shippingFee} ر.س`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-amber-950 border-t border-amber-200/80 pt-2">
                <span>المبلغ الإجمالي المستحق:</span>
                <span className="tabular-nums">{grandTotal} ر.س</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div>
                {onOpenElectronicInvoice && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenElectronicInvoice();
                    }}
                    className="text-xs text-amber-800 underline font-semibold hover:text-amber-950 cursor-pointer"
                  >
                    📄 هل ترغب بإصدار وتخصيص فاتورة إلكترونية معتمدة أولاً؟
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                >
                  تعديل السلة
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 text-sm font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-md cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'جارٍ تأكيد الطلب...' : `تأكيد الطلب ودفع ${grandTotal} ر.س`}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

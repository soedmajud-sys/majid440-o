import React, { useState } from 'react';
import { CartItem } from '../types/honey';
import { SAUDI_CITIES } from '../data/honeyData';
import { FileText, CheckCircle2, ShieldCheck, Printer, Send, MessageCircle, Download, X, Building, User, Phone, MapPin, QrCode } from 'lucide-react';

interface ElectronicInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercent: number;
  onInvoiceApproved: (invoiceData: any) => void;
}

export const ElectronicInvoiceModal: React.FC<ElectronicInvoiceModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercent,
  onInvoiceApproved
}) => {
  if (!isOpen) return null;

  // Step 1: Customer enters/verifies details; Step 2: System issues and approves the invoice; Step 3: Invoice sent to customer
  const [step, setStep] = useState<'form' | 'approving' | 'approved'>('form');
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [nationalAddress, setNationalAddress] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('الرياض');
  const [invoiceType, setInvoiceType] = useState<'individual' | 'business'>('individual');
  const [vatNumber, setVatNumber] = useState<string>('');
  const [invoiceNotes, setInvoiceNotes] = useState<string>('يرجى إرفاق الملاعق الخشبية المجانية وشهادة فحص SASO');
  
  // Generated Invoice Data
  const [invoiceId, setInvoiceId] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<string>('');
  const [invoiceTime, setInvoiceTime] = useState<string>('');
  const [sentSuccessNotice, setSentSuccessNotice] = useState<string>('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 299 ? 0 : 28;
  const grandTotal = subtotal - discountAmount + shippingFee;
  const taxRate = 0.15;
  const taxAmount = Math.round((grandTotal * 15) / 115);
  const taxableAmount = grandTotal - taxAmount;

  const handleApproveAndIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim()) return;

    setStep('approving');

    setTimeout(() => {
      const generatedNum = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();
      const dateStr = now.toLocaleDateString('ar-SA');
      const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

      setInvoiceId(generatedNum);
      setInvoiceDate(dateStr);
      setInvoiceTime(timeStr);
      setStep('approved');

      const invoicePayload = {
        id: generatedNum,
        customerName,
        phoneNumber,
        city: selectedCity,
        district: nationalAddress || 'العنوان الوطني',
        itemsSummary: cartItems.map(i => `${i.product.name} (${i.selectedSize.weight}) × ${i.quantity}`).join('، '),
        totalAmount: grandTotal,
        paymentMethod: 'فاتورة إلكترونية معتمدة',
        paymentStatus: 'مدفوع',
        shippingStatus: 'قيد التجهيز',
        date: dateStr,
        time: timeStr,
        carrier: 'سمسا إكسبريس (SMSA)',
        trackingNumber: `SMSA-${Math.floor(100000000 + Math.random() * 900000000)}`,
        taxAmount: taxAmount
      };

      onInvoiceApproved(invoicePayload);
    }, 1200);
  };

  const handleSendToCustomerWhatsApp = () => {
    const cleanPhone = phoneNumber.replace(/\D/g, '').replace(/^0/, '');
    const message = encodeURIComponent(
      `مرحباً ${customerName}،\nيسعدنا إرسال فاتورتك الإلكترونية المعتمدة من متجر حنان ناصر الشهراني للعسل الطبيعي.\n\n` +
      `📄 رقم الفاتورة: ${invoiceId}\n` +
      `🍯 المنتجات: ${cartItems.map(i => `${i.product.name} (${i.selectedSize.weight})`).join(', ')}\n` +
      `💰 المبلغ الإجمالي شامل الضريبة (15%): ${grandTotal} ريال سعودي\n` +
      `🚚 الشحن: مبرد وسريع إلى ${selectedCity}\n` +
      `🛡️ الضمان: الضمان الذهبي لحنان 100% طبيعي مفحوص SASO.\n\n` +
      `لأي استفسار جوال مديرة التطبيق: 0507199883`
    );
    window.open(`https://wa.me/966${cleanPhone}?text=${message}`, '_blank');
    setSentSuccessNotice('تم فتح الواتساب لإرسال الفاتورة إلى جوال العميل بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-200 my-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  نظام الفوترة الإلكترونية المعتمد
                </span>
                <h3 className="text-xl font-bold text-stone-900 font-amiri">
                  إصدار فاتورة إلكترونية معتمدة
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                متجر حنان ناصر الشهراني للعسل · موثقة بموجب وثيقة العمل الحر
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-lg">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Step 1: Form to enter customer details and customize invoice */}
        {step === 'form' && (
          <form onSubmit={handleApproveAndIssue} className="space-y-5 text-xs text-right">
            <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-2xl text-[11px] text-amber-950 space-y-1">
              <span className="font-bold block">مرحلة إعداد الفاتورة:</span>
              <p className="text-stone-700">
                يقوم العميل بإدخال بياناته وعنوانه، ثم تُحال الفاتورة فوراً للاعتماد والتوثيق الرسمي من تطبيق حنان ناصر الشهراني، لتصل إلى جوالك بصيغة إلكترونية موثقة برمز الاستجابة السريع (QR Code).
              </p>
            </div>

            {/* Invoice Type Toggle */}
            <div className="space-y-2">
              <label className="block font-bold text-stone-800">نوع الفاتورة المطلوبة:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInvoiceType('individual')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    invoiceType === 'individual'
                      ? 'border-amber-800 bg-amber-100/70 font-bold text-amber-950 ring-1 ring-amber-700'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  <User className="w-4 h-4 text-amber-800" />
                  <span>فاتورة ضريبية مبسطة (للأفراد)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInvoiceType('business')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    invoiceType === 'business'
                      ? 'border-amber-800 bg-amber-100/70 font-bold text-amber-950 ring-1 ring-amber-700'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  <Building className="w-4 h-4 text-amber-800" />
                  <span>فاتورة ضريبية للمنشآت والشركات</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {invoiceType === 'business' ? 'اسم المنشأة / الشركة:' : 'اسم العميل المشتري:'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="مثال: فهد بن عبد العزيز العتيبي"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">رقم الجوال لإرسال الفاتورة:</label>
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
                <label className="block font-semibold text-stone-700 mb-1">العنوان الوطني / الحي السكني:</label>
                <input
                  type="text"
                  value={nationalAddress}
                  onChange={e => setNationalAddress(e.target.value)}
                  placeholder="مثال: الرياض، حي الصحافة، شارع العليا"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900"
                />
              </div>
            </div>

            {invoiceType === 'business' && (
              <div>
                <label className="block font-semibold text-stone-700 mb-1">الرقم الضريبي للمنشأة (إن وجد):</label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={e => setVatNumber(e.target.value)}
                  placeholder="30XXXXXXXXXXXXX"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 font-mono"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-stone-700 mb-1">ملاحظات وطلبات خاصة في الفاتورة:</label>
              <textarea
                rows={2}
                value={invoiceNotes}
                onChange={e => setInvoiceNotes(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs"
              />
            </div>

            {/* Items Summary in Invoice */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 border-b border-stone-200 pb-1.5 flex justify-between">
                <span>أصناف العسل المختارة ({cartItems.length}):</span>
                <span className="text-amber-950 font-mono tabular-nums">{grandTotal} ر.س</span>
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-stone-600">
                    <span>• {item.product.name} ({item.selectedSize.weight}) × {item.quantity}</span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      {item.selectedSize.price * item.quantity} ر.س
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-xs">
                <span>شامل ضريبة القيمة المضافة 15%:</span>
                <span className="font-bold text-emerald-800 tabular-nums">{taxAmount} ر.س</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 text-sm font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98 flex items-center gap-2"
              >
                <span>إحالة الفاتورة للاعتماد والحفظ</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Approving Animation */}
        {step === 'approving' && (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto animate-spin">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-stone-900 font-amiri">
              جاري اعتماد وتوثيق الفاتورة الإلكترونية...
            </h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              يقوم نظام تطبيق حنان الشهراني بحفظ بيانات الفاتورة وتوليد الرمز المشفر المعتمد (QR Code).
            </p>
          </div>
        )}

        {/* Step 3: Approved & Official Printable Tax Invoice */}
        {step === 'approved' && (
          <div className="space-y-6 text-right">
            {/* Approved Badge */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold block">تم اعتماد وتوثيق الفاتورة بنجاح!</span>
                  <span className="text-[11px] text-emerald-800">
                    رقم الاعتماد: <strong className="font-mono">{invoiceId}</strong>
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-200/60 font-bold px-2 py-0.5 rounded">
                معتمدة رسميًا ✓
              </span>
            </div>

            {/* Official Tax Invoice Container */}
            <div id="printable-tax-invoice" className="bg-[#FCFAF7] border-2 border-stone-300 rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-stone-900 relative shadow-sm">
              {/* Invoice Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-stone-200 pb-5">
                <div className="space-y-1 text-center sm:text-right">
                  <span className="text-xl font-black font-amiri text-amber-950 block">
                    متجر حنان للعسل الطبيعي الفاخر
                  </span>
                  <p className="text-xs font-semibold text-stone-700">مديرة التطبيق: حنان ناصر الشهراني</p>
                  <p className="text-[11px] text-stone-500">
                    وثيقة عمل حر معتمدة من وزارة الموارد البشرية والتنمية الاجتماعية
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono">
                    هاتف الطلبات بالمملكة: 0507199883
                  </p>
                </div>

                {/* ZATCA QR Code Representation */}
                <div className="flex flex-col items-center bg-white p-2.5 rounded-2xl border border-stone-200 shadow-xs">
                  <div className="w-24 h-24 bg-stone-950 p-2 rounded-xl flex items-center justify-center text-white">
                    <QrCode className="w-20 h-20 text-white" />
                  </div>
                  <span className="text-[9px] text-stone-400 mt-1 font-mono">رمز الفاتورة الإلكترونية</span>
                </div>
              </div>

              {/* Invoice Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 text-[11px]">
                <div>
                  <span className="text-stone-400 block text-[10px]">رقم الفاتورة:</span>
                  <span className="font-mono font-bold text-amber-950 text-xs">{invoiceId}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">تاريخ ووقت الإصدار:</span>
                  <span className="font-bold text-stone-800">{invoiceDate} - {invoiceTime}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">طبيعة الشحنة:</span>
                  <span className="font-bold text-emerald-800">شحن مبرد ومحمي ❄️</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">حالة الاعتماد:</span>
                  <span className="font-bold text-emerald-700">معتمدة ومحفوظة</span>
                </div>
              </div>

              {/* Customer Details Box */}
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 block text-[11px] border-b border-stone-100 pb-1">
                  بيانات العميل المستلم:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-stone-400 block">الاسم:</span>
                    <span className="font-bold text-stone-900">{customerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">رقم الجوال:</span>
                    <span className="font-mono font-bold text-stone-900">{phoneNumber}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">مدينة التوصيل:</span>
                    <span className="font-bold text-stone-900">{selectedCity} - {nationalAddress || 'وسط المدينة'}</span>
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <tr>
                      <th className="p-3">صنف العسل</th>
                      <th className="p-3 text-center">الوزن</th>
                      <th className="p-3 text-center">الكمية</th>
                      <th className="p-3 text-left">السعر (ر.س)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {cartItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-bold text-stone-900">{item.product.name}</td>
                        <td className="p-3 text-center font-semibold text-stone-600">{item.selectedSize.weight}</td>
                        <td className="p-3 text-center font-mono font-bold">{item.quantity}</td>
                        <td className="p-3 text-left font-mono font-bold text-amber-950 tabular-nums">
                          {item.selectedSize.price * item.quantity} ر.س
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tally & Tax Summary */}
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-600">المجموع الفرعي الخاضع للضريبة:</span>
                  <span className="font-bold text-stone-900 tabular-nums">{taxableAmount} ر.س</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-bold">
                    <span>خصم الكوبون ({discountPercent}%):</span>
                    <span className="tabular-nums">-{discountAmount} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-600">الشحن والتوصيل المبرد:</span>
                  <span className="font-bold text-stone-900">{shippingFee === 0 ? 'مجاني 🎁' : `${shippingFee} ر.س`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">ضريبة القيمة المضافة (15%):</span>
                  <span className="font-bold text-emerald-800 tabular-nums">{taxAmount} ر.س</span>
                </div>
                <div className="flex justify-between text-base font-black text-amber-950 border-t border-amber-300 pt-2">
                  <span>المبلغ الإجمالي النهائي للفاتورة:</span>
                  <span className="tabular-nums">{grandTotal} ر.س</span>
                </div>
              </div>

              {/* Hanan Guarantee Seal */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    الضمان الذهبي لحنان: عسل طبيعي 100% مفحوص مخبرياً SASO أو استرجاع 3 أضعاف القيمة فوراً.
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  ZATCA-VERIFIED
                </div>
              </div>
            </div>

            {/* Notification alert if WhatsApp clicked */}
            {sentSuccessNotice && (
              <div className="p-3 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl text-center">
                {sentSuccessNotice}
              </div>
            )}

            {/* Action Buttons to Send to Customer or Print */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 rounded-xl cursor-pointer"
              >
                إغلاق
              </button>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none px-4 py-3 text-xs font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-stone-700" />
                  <span>طباعة الفاتورة</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendToCustomerWhatsApp}
                  className="flex-1 sm:flex-none px-6 py-3 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الفاتورة للعميل عبر الواتساب</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

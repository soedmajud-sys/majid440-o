import React, { useState } from 'react';
import { Lock, KeyRound, X, ShieldAlert, CheckCircle2, FileText, Users, DollarSign, Truck, Search, Eye, Printer, LogOut, ArrowUpDown } from 'lucide-react';

export interface AdminOrder {
  id: string;
  customerName: string;
  phoneNumber: string;
  city: string;
  district: string;
  itemsSummary: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'مدفوع' | 'عند الاستلام' | 'قيد الدفع';
  shippingStatus: 'قيد التجهيز' | 'تم الشحن' | 'تم التوصيل';
  date: string;
  time: string;
  carrier: string;
  trackingNumber: string;
  taxAmount: number;
}

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: AdminOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: 'قيد التجهيز' | 'تم الشحن' | 'تم التوصيل') => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'invoices' | 'customers' | 'shipments' | 'license'>('invoices');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInvoice, setSelectedInvoice] = useState<AdminOrder | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.trim() === '0055166') {
      setIsAuthenticated(true);
      setErrorMessage('');
      setPinCode('');
    } else {
      setErrorMessage('الرمز السري غير صحيح! الدخول مقتصر على إدارة متجر حنان فقط.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinCode('');
    setSelectedInvoice(null);
  };

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.includes(searchQuery) ||
    o.phoneNumber.includes(searchQuery) ||
    o.city.includes(searchQuery)
  );

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalTax = orders.reduce((acc, o) => acc + o.taxAmount, 0);

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-300 my-6 max-h-[94vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[11px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                  سري ومحمي برمز الإدارة
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-amiri">
                  بوابة الإدارة وسجل فواتير وبيانات العملاء
                </h2>
              </div>
              <p className="text-xs text-stone-500">
                إدارة متجر حنان ناصر الشهراني · وثيقة العمل الحر المعتمدة
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-900 text-amber-200 flex items-center justify-center text-lg">
              <Lock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="py-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto shadow-inner">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-900 font-amiri">
                الوصول المحمي لبيانات العملاء والفواتير
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                بموجب سياسة الخصوصية وحماية البيانات، لا يسمح بالاطلاع على فواتير المتجر أو تفاصيل العملاء وأرقامهم وعناوينهم إلا للإدارة المصرح لها بإدخال الرقم السري.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  maxLength={12}
                  autoFocus
                  placeholder="أدخل الرمز السري المخفي للإدارة..."
                  value={pinCode}
                  onChange={e => setPinCode(e.target.value)}
                  className="w-full py-3 px-4 text-center tracking-[0.3em] font-mono text-lg bg-stone-50 border-2 border-stone-300 rounded-2xl focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-stone-900 placeholder:tracking-normal placeholder:text-xs"
                />
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 text-sm font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl cursor-pointer shadow transition-all active:scale-98"
              >
                تحقق وتأكيد الدخول
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            {/* Top Bar with Logout & Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-stone-700">
                  <span className="text-[10px] text-stone-400 block">إجمالي مبيعات المتجر:</span>
                  <span className="text-sm font-black text-amber-950 tabular-nums">{totalRevenue} ر.س</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-stone-700">
                  <span className="text-[10px] text-stone-400 block">ضريبة القيمة المضافة (15%):</span>
                  <span className="text-sm font-bold text-stone-800 tabular-nums">{totalTax} ر.س</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-stone-700">
                  <span className="text-[10px] text-stone-400 block">عدد فواتير العملاء:</span>
                  <span className="text-sm font-bold text-stone-800 tabular-nums">{orders.length} طلب</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-lg">
                  ✓ مسجل دخول: حنان الشهراني
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-stone-600 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>قفل البوابة</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab('invoices')}
                className={`py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'invoices'
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>سجل الفواتير الرسمية ({orders.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'customers'
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>بيانات العملاء وأرقام التواصل</span>
              </button>
              <button
                onClick={() => setActiveTab('shipments')}
                className={`py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'shipments'
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>إدارة الشحنات المبردة</span>
              </button>
            </div>

            {/* Search Filter Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="ابحث برقم الفاتورة، اسم العميل، رقم الجوال (05...)، أو المدينة..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Tab 1: Invoices View */}
            {activeTab === 'invoices' && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-2xl border border-stone-200">
                  <table className="w-full text-right text-xs bg-white">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500">
                      <tr>
                        <th className="p-3">رقم الفاتورة</th>
                        <th className="p-3">اسم العميل</th>
                        <th className="p-3">التاريخ والوقت</th>
                        <th className="p-3">أصناف العسل</th>
                        <th className="p-3">المبلغ الإجمالي</th>
                        <th className="p-3">طريقة الدفع</th>
                        <th className="p-3">حالة الشحن</th>
                        <th className="p-3 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                          <td className="p-3 font-mono font-bold text-amber-950">{order.id}</td>
                          <td className="p-3 font-semibold text-stone-900">{order.customerName}</td>
                          <td className="p-3 text-stone-500 text-[11px]">{order.date} - {order.time}</td>
                          <td className="p-3 text-stone-700 text-[11px] max-w-[200px] truncate">{order.itemsSummary}</td>
                          <td className="p-3 font-black text-amber-950 tabular-nums">{order.totalAmount} ر.س</td>
                          <td className="p-3">
                            <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              order.shippingStatus === 'تم التوصيل'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.shippingStatus === 'تم الشحن'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.shippingStatus}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setSelectedInvoice(order)}
                              className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-lg cursor-pointer transition-colors"
                            >
                              عرض الفاتورة
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Confidential Customer Profiles */}
            {activeTab === 'customers' && (
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                  <span>تنبيه أمان: هذه البيانات خاصة بالعملاء ومحفوظة بموجب نظام حماية البيانات الشخصية بالمملكة.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <span className="font-bold text-stone-900 text-sm">{order.customerName}</span>
                        <span className="font-mono text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                          {order.id}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-stone-400 block">رقم الجوال:</span>
                          <a href={`tel:${order.phoneNumber}`} className="font-mono font-bold text-amber-900 dir-ltr inline-block hover:underline">
                            {order.phoneNumber}
                          </a>
                        </div>
                        <div>
                          <span className="text-stone-400 block">المدينة والحي:</span>
                          <span className="font-bold text-stone-800">{order.city} - {order.district}</span>
                        </div>
                      </div>
                      <div className="pt-1 text-[11px] border-t border-stone-200/60">
                        <span className="text-stone-500">الأصناف المشتراة: </span>
                        <span className="font-semibold text-stone-800">{order.itemsSummary}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-stone-500">القيمة: <strong className="text-amber-950 font-mono">{order.totalAmount} ر.س</strong></span>
                        <a
                          href={`https://wa.me/966${order.phoneNumber.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold"
                        >
                          مراسلة واتساب العميل
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Shipment Operations */}
            {activeTab === 'shipments' && (
              <div className="space-y-4 text-xs">
                <div className="overflow-x-auto rounded-2xl border border-stone-200">
                  <table className="w-full text-right text-xs bg-white">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500">
                      <tr>
                        <th className="p-3">رقم الطلب</th>
                        <th className="p-3">العميل</th>
                        <th className="p-3">المدينة</th>
                        <th className="p-3">شركة الشحن</th>
                        <th className="p-3">رقم البوليصة</th>
                        <th className="p-3">تحديث حالة الشحن</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredOrders.map(order => (
                        <tr key={order.id}>
                          <td className="p-3 font-mono font-bold text-stone-900">{order.id}</td>
                          <td className="p-3 font-semibold text-stone-800">{order.customerName}</td>
                          <td className="p-3 text-stone-600">{order.city}</td>
                          <td className="p-3 font-bold text-amber-950">{order.carrier}</td>
                          <td className="p-3 font-mono text-[11px] text-stone-700">{order.trackingNumber}</td>
                          <td className="p-3">
                            <select
                              value={order.shippingStatus}
                              onChange={e => onUpdateOrderStatus(order.id, e.target.value as any)}
                              className="p-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-800 cursor-pointer"
                            >
                              <option value="قيد التجهيز">قيد التجهيز</option>
                              <option value="تم الشحن">تم الشحن المبرد</option>
                              <option value="تم التوصيل">تم التوصيل للعميل</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Official Tax Invoice Printable Modal */}
            {selectedInvoice && (
              <div className="fixed inset-0 z-60 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <button
                      onClick={() => setSelectedInvoice(null)}
                      className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
                    >
                      ✕
                    </button>
                    <div className="text-left">
                      <span className="text-[10px] text-stone-400 block">رقم الفاتورة الضريبية المبسطة:</span>
                      <span className="font-mono text-sm font-bold text-amber-950">{selectedInvoice.id}</span>
                    </div>
                  </div>

                  {/* Printable Invoice Header */}
                  <div className="text-center space-y-1 border-b border-stone-200 pb-4">
                    <h3 className="text-xl font-bold font-amiri text-amber-950">متجر حنان للعسل الطبيعي الفاخر</h3>
                    <p className="text-xs text-stone-600">الممارس: حنان ناصر الشهراني</p>
                    <p className="text-[10px] text-stone-500">مرخصة بموجب شهادة عمل حر من منصة الموارد البشرية</p>
                    <p className="text-[10px] text-stone-500 font-mono">هاتف الطلبات: 0507199883 | المملكة العربية السعودية</p>
                  </div>

                  {/* Bill to */}
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-500">فاتورة إلى:</span>
                      <span className="font-bold text-stone-900">{selectedInvoice.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">رقم الجوال:</span>
                      <span className="font-mono font-bold text-stone-900">{selectedInvoice.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">العنوان:</span>
                      <span className="text-stone-800">{selectedInvoice.city} - {selectedInvoice.district}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">تاريخ الإصدار:</span>
                      <span className="text-stone-800">{selectedInvoice.date} ({selectedInvoice.time})</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-right">
                      <thead className="bg-stone-100 text-stone-600">
                        <tr>
                          <th className="p-2.5">الوصف</th>
                          <th className="p-2.5 text-center">الكمية</th>
                          <th className="p-2.5 text-left">المبلغ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-stone-100">
                          <td className="p-2.5 font-bold text-stone-800">{selectedInvoice.itemsSummary}</td>
                          <td className="p-2.5 text-center">1</td>
                          <td className="p-2.5 text-left font-mono font-bold text-stone-900">{selectedInvoice.totalAmount} ر.س</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Financials Tally */}
                  <div className="space-y-1.5 text-xs text-stone-700 bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                    <div className="flex justify-between">
                      <span>المجموع غير شامل الضريبة:</span>
                      <span className="tabular-nums font-bold">{selectedInvoice.totalAmount - selectedInvoice.taxAmount} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ضريبة القيمة المضافة (15%):</span>
                      <span className="tabular-nums font-bold text-amber-900">{selectedInvoice.taxAmount} ر.س</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-amber-950 border-t border-amber-200 pt-1.5">
                      <span>المبلغ الإجمالي المستحق:</span>
                      <span className="tabular-nums">{selectedInvoice.totalAmount} ر.س</span>
                    </div>
                  </div>

                  {/* Guarantee Note */}
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[10px] text-emerald-900 text-center font-medium">
                    ✓ مشمول بالضمان الذهبي لحنان: عسل طبيعي مفحوص SASO أو استرجاع 3 أضعاف القيمة.
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl cursor-pointer flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>طباعة الفاتورة</span>
                    </button>
                    <button
                      onClick={() => setSelectedInvoice(null)}
                      className="px-4 py-2 text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl cursor-pointer"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

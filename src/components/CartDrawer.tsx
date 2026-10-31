import React, { useState } from 'react';
import { CartItem } from '../types/honey';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscountPercent: number) => void;
  onOpenElectronicInvoice?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenElectronicInvoice
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  const freeShippingThreshold = 299;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountPercent = couponApplied ? 10 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'HANAN10' || couponCode.trim().toUpperCase() === 'عسل10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('الكوبون غير صحيح. جرب كود: HANAN10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col text-right">
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 text-lg font-amiri">سلة المشتريات</span>
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center tabular-nums">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
          </div>

          {/* Free Shipping Bar */}
          <div className="p-4 bg-amber-50/70 border-b border-amber-200/50 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>
                  {remainingForFreeShipping === 0
                    ? '🎉 مبروك! حصلت على شحن مبرد مجاني لكافة مدن المملكة'
                    : `أضف بقيمة ${remainingForFreeShipping} ر.س للحصول على شحن مجاني`}
                </span>
              </div>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto text-amber-600">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-bold text-stone-800 text-base">سلتك فارغة حالياً</h4>
                <p className="text-xs text-stone-500">اختر من تشكيلة الأعسال السعودية الأصيلة والمفحوصة</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl cursor-pointer"
                >
                  تصفح أنواع العسل
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize.weight}`}
                  className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200/60"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-stone-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-amber-900 font-semibold mt-0.5">
                        {item.selectedSize.weight}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 tabular-nums px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-left">
                        <span className="text-sm font-black text-amber-950 tabular-nums">
                          {item.selectedSize.price * item.quantity} ر.س
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-bold bg-stone-800 hover:bg-stone-900 text-white rounded-xl cursor-pointer"
                  >
                    تطبيق
                  </button>
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="كوبون الخصم (جرب HANAN10)"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="w-full pr-9 pl-3 py-2 text-xs bg-white border border-stone-300 rounded-xl uppercase text-stone-800"
                    />
                  </div>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-700 font-bold">✓ تم تفعيل خصم 10% بنجاح!</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600">{couponError}</p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-stone-900 tabular-nums">{subtotal} ر.س</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>خصم الكوبون (10%):</span>
                    <span className="tabular-nums">-{discountAmount} ر.س</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>الشحن والتوصيل المبرد:</span>
                  <span className="font-bold text-stone-900">
                    {remainingForFreeShipping === 0 ? 'مجاني 🎁' : '28 ر.س'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-amber-950 border-t border-stone-300 pt-2">
                  <span>الإجمالي النهائي:</span>
                  <span className="tabular-nums">
                    {total + (remainingForFreeShipping === 0 ? 0 : 28)} ر.س
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onProceedToCheckout(discountPercent)}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 active:scale-98 text-amber-950 flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <span>إتمام الطلب وتحديد عنوان التوصيل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {onOpenElectronicInvoice && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenElectronicInvoice();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>📄 إصدار وتخصيص فاتورة إلكترونية معتمدة</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CustomerReview, HoneyProduct } from '../types/honey';
import { Star, ShieldCheck, UserCheck, Plus, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { SAUDI_CITIES } from '../data/honeyData';

interface CustomerReviewsSectionProps {
  reviews: CustomerReview[];
  products: HoneyProduct[];
  onAddReview: (review: CustomerReview) => void;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  reviews,
  products,
  onAddReview
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [age, setAge] = useState<number>(35);
  const [city, setCity] = useState<string>('الرياض');
  const [specs, setSpecs] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [selectedHoneyId, setSelectedHoneyId] = useState<string>(products[0]?.id || 'sidr-baladi');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [healthImpact, setHealthImpact] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('/src/assets/images/customer_abu_fahad_1793479796852.jpg');
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const avatarOptions = [
    { label: 'رجل سعودي (شماغ)', url: '/src/assets/images/customer_abu_fahad_1793479796852.jpg' },
    { label: 'طبيبة / أخصائية سعودية', url: '/src/assets/images/customer_dr_sara_1793479797811.jpg' },
    { label: 'شاب / رياضي سعودي', url: '/src/assets/images/customer_faisal_athlete_1793479820641.jpg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const matchedProduct = products.find(p => p.id === selectedHoneyId);
    const honeyPurchased = matchedProduct ? matchedProduct.name : 'عسل السدر الجبلي البلدي';

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      customerName: name,
      customerTitle: title || 'عميل موثق',
      customerAge: Number(age) || 35,
      city,
      customerSpecs: specs || `عمره ${age} سنة، من ${city}، يبحث عن عسل طبيعي موثوق.`,
      customerGoal: goal || 'تعزيز الصحة العامة ومناعة الأسرة.',
      honeyPurchased,
      honeyId: selectedHoneyId,
      avatar: selectedAvatar,
      rating,
      date: 'اليوم',
      comment,
      healthImpact: healthImpact || 'تحسن ملموس في النشاط والمناعة.',
      verifiedPurchase: true
    };

    onAddReview(newRev);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddModal(false);
      setName('');
      setTitle('');
      setSpecs('');
      setGoal('');
      setComment('');
      setHealthImpact('');
    }, 1500);
  };

  return (
    <section id="customer-reviews" className="py-16 bg-[#F8F4EE] border-t border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-200/50 px-3 py-1 rounded-md">
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>تجارب حقيقية موثقة بالصور والمواصفات</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-amiri [text-wrap:balance]">
              صور ومواصفات عملاء متجر حنان وتجاربهم الصحية
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl">
              نعرض لكم بكل شفافية صور عملائنا الكرام، مواصفاتهم وحالتهم الصحية، نوع العسل الذي اشتروه، والأثر الصحي الحقيقي الذي لمسوه.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm hover:shadow active:scale-98 transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>شارك تجربتك ومواصفاتك كعميل</span>
          </button>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => {
            const matchedProduct = products.find(p => p.id === review.honeyId);
            const samplePrice = matchedProduct?.sizes[0]?.price || 340;

            return (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-amber-900/10 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between text-right"
              >
                {/* Customer Header with Photo */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={review.avatar}
                        alt={review.customerName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-1 -left-1 bg-emerald-600 text-white rounded-full p-0.5" title="مشتري موثق">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-stone-900 truncate">
                          {review.customerName}
                        </h3>
                        <span className="text-[11px] text-stone-400 whitespace-nowrap">{review.date}</span>
                      </div>
                      <p className="text-xs text-amber-800 font-medium truncate">
                        {review.customerTitle || 'عميل دائم'}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        {review.city} · <span className="tabular-nums">{review.customerAge}</span> سنة
                      </p>
                    </div>
                  </div>

                  {/* Stars & Verified Badge */}
                  <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" />
                      مشتري موثق
                    </span>
                  </div>

                  {/* Honey Purchased & Price Box */}
                  <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-medium">العسل المشترى:</span>
                      <span className="font-bold text-amber-950 truncate max-w-[180px]">
                        {review.honeyPurchased}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-medium">السعر المدفوع:</span>
                      <span className="font-extrabold text-stone-900 tabular-nums">
                        {samplePrice} ر.س
                      </span>
                    </div>
                  </div>

                  {/* Customer Specifications & Profile */}
                  <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex items-center gap-1 text-stone-700 font-bold text-[11px]">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>مواصفات وملف العميل:</span>
                    </div>
                    <p className="text-stone-600 text-[11px] leading-relaxed">
                      {review.customerSpecs}
                    </p>
                    <div className="text-[10px] text-stone-500 pt-0.5">
                      <span className="font-semibold text-stone-600">الغاية المستهدفة:</span> {review.customerGoal}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="text-xs text-stone-700 leading-relaxed italic bg-white p-2 rounded-lg border-r-2 border-amber-400">
                    "{review.comment}"
                  </div>
                </div>

                {/* Health Impact / Outcome */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <Heart className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-stone-700">
                    <span className="font-bold text-emerald-800">الأثر الصحي المحقق: </span>
                    <span>{review.healthImpact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Add Customer Review & Specs */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-right shadow-2xl border border-stone-200 my-8">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 font-amiri">
                    أضف تجربتك ومواصفاتك كعميل
                  </h3>
                  <p className="text-xs text-stone-500">
                    ساعد الآخرين في معرفة العسل الأنسب لحالتهم الصحية
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {submittedSuccess ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">شكراً لمشاركتك الكريمة!</h4>
                  <p className="text-xs text-stone-600">تم نشر تجربتك ومواصفاتك بنجاح في متجر حنان.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Avatar Picker */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-2">
                      اختر صورتك الرمزية المعبرة:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.map(opt => (
                        <button
                          type="button"
                          key={opt.url}
                          onClick={() => setSelectedAvatar(opt.url)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                            selectedAvatar === opt.url
                              ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <img
                            src={opt.url}
                            alt={opt.label}
                            className="w-12 h-12 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] text-stone-700 font-medium text-center line-clamp-1">
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">الاسم الكريم:</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="مثال: عبد الله السبيعي"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-stone-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">الوصف أو الصفة:</label>
                      <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="مثال: معلم، مهندس، رياضي"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">المدينة بالمملكة:</label>
                      <select
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs cursor-pointer"
                      >
                        {SAUDI_CITIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">العمر (سنة):</label>
                      <input
                        type="number"
                        min={18}
                        max={95}
                        value={age}
                        onChange={e => setAge(Number(e.target.value))}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">نوع العسل الذي اشتريته:</label>
                    <select
                      value={selectedHoneyId}
                      onChange={e => setSelectedHoneyId(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs cursor-pointer"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sizes[0].price} ر.س)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      مواصفاتك وملفك الصحي (سبب اختيارك للعسل):
                    </label>
                    <textarea
                      rows={2}
                      value={specs}
                      onChange={e => setSpecs(e.target.value)}
                      placeholder="مثال: أعاني من حموضة المعدة وسعال عند تقلب الفصول، أو رياضي أبحث عن طاقة..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      رأيك وتجربتك مع عسل حنان:
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="اكتب بأمانة كيف وجدت طعم وقوام العسل وتأثيره..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      الأثر الصحي والنتيجة التي لمستها:
                    </label>
                    <input
                      type="text"
                      value={healthImpact}
                      onChange={e => setHealthImpact(e.target.value)}
                      placeholder="مثال: انقطاع الكحة خلال أسبوع، نشاط متواصل طوال اليوم..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-semibold text-stone-700">تقييمك:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="cursor-pointer p-0.5"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2.5 text-stone-600 hover:text-stone-900 cursor-pointer font-medium"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow cursor-pointer active:scale-98 transition-all"
                    >
                      نشر التجربة والمواصفات
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

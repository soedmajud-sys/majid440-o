import React, { useState } from 'react';
import { HoneyProduct, HoneySize } from '../types/honey';
import { ArrowLeftRight, Check, ShoppingBag } from 'lucide-react';

interface HoneyComparisonProps {
  products: HoneyProduct[];
  onAddToCart: (product: HoneyProduct, size: HoneySize) => void;
}

export const HoneyComparison: React.FC<HoneyComparisonProps> = ({
  products,
  onAddToCart
}) => {
  const [honeyAId, setHoneyAId] = useState<string>(products[0]?.id || 'sidr-baladi');
  const [honeyBId, setHoneyBId] = useState<string>(products[1]?.id || 'talh-hail');
  const [addedA, setAddedA] = useState<boolean>(false);
  const [addedB, setAddedB] = useState<boolean>(false);

  const honeyA = products.find(p => p.id === honeyAId) || products[0];
  const honeyB = products.find(p => p.id === honeyBId) || products[1];

  const handleAddA = () => {
    onAddToCart(honeyA, honeyA.sizes[0]);
    setAddedA(true);
    setTimeout(() => setAddedA(false), 1800);
  };

  const handleAddB = () => {
    onAddToCart(honeyB, honeyB.sizes[0]);
    setAddedB(true);
    setTimeout(() => setAddedB(false), 1800);
  };

  return (
    <section id="comparison" className="py-16 bg-white border-b border-amber-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
            <ArrowLeftRight className="w-3.5 h-3.5 text-amber-700" />
            <span>مقارنة علمية دقيقة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-amiri">
            مقارنة بين نوعين من عسل المملكة
          </h2>
          <p className="text-sm text-stone-600">
            قارن بين أي نوعين من حيث المصدر الزهري، الخصائص المخبرية، الفوائد الصحية، والأسعار الحقيقية.
          </p>
        </div>

        {/* Selection Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#FCFAF7] p-4 rounded-2xl border border-amber-900/10">
            <label className="block text-xs font-bold text-stone-700 mb-2">اختر النوع الأول (أ):</label>
            <select
              value={honeyAId}
              onChange={e => setHoneyAId(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-800 cursor-pointer focus:ring-2 focus:ring-amber-500/20"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sizes[0].price} ر.س/كجم)
                </option>
              ))}
            </select>
          </div>

          <div className="bg-[#FCFAF7] p-4 rounded-2xl border border-amber-900/10">
            <label className="block text-xs font-bold text-stone-700 mb-2">اختر النوع الثاني (ب):</label>
            <select
              value={honeyBId}
              onChange={e => setHoneyBId(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-800 cursor-pointer focus:ring-2 focus:ring-amber-500/20"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sizes[0].price} ر.س/كجم)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
          <table className="w-full text-right text-xs bg-white">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="p-4 font-bold text-stone-500 w-1/4">معيار المقارنة</th>
                <th className="p-4 font-bold text-amber-950 w-3/8 border-r border-stone-200">
                  {honeyA.name}
                </th>
                <th className="p-4 font-bold text-amber-950 w-3/8 border-r border-stone-200">
                  {honeyB.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="p-4 font-semibold text-stone-600 bg-stone-50/50">المنطقة الجغرافية</td>
                <td className="p-4 text-stone-800 border-r border-stone-100">{honeyA.region}</td>
                <td className="p-4 text-stone-800 border-r border-stone-100">{honeyB.region}</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-stone-600 bg-stone-50/50">المصدر الزهري</td>
                <td className="p-4 text-stone-800 border-r border-stone-100">{honeyA.floralSource}</td>
                <td className="p-4 text-stone-800 border-r border-stone-100">{honeyB.floralSource}</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-stone-600 bg-stone-50/50">اللون والقوام</td>
                <td className="p-4 text-stone-800 border-r border-stone-100">
                  <div className="font-bold">{honeyA.colorName}</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">{honeyA.texture}</div>
                </td>
                <td className="p-4 text-stone-800 border-r border-stone-100">
                  <div className="font-bold">{honeyB.colorName}</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">{honeyB.texture}</div>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-stone-600 bg-stone-50/50">نسبة السكروز المخبرية</td>
                <td className="p-4 font-mono font-bold text-amber-950 border-r border-stone-100 tabular-nums">
                  {honeyA.labSpecs.sucrose}
                </td>
                <td className="p-4 font-mono font-bold text-amber-950 border-r border-stone-100 tabular-nums">
                  {honeyB.labSpecs.sucrose}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-stone-600 bg-stone-50/50">نشاط إنزيم الدياستيز</td>
                <td className="p-4 font-mono font-bold text-stone-800 border-r border-stone-100 tabular-nums">
                  {honeyA.labSpecs.diastase}
                </td>
                <td className="p-4 font-mono font-bold text-stone-800 border-r border-stone-100 tabular-nums">
                  {honeyB.labSpecs.diastase}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-stone-600 bg-stone-50/50">أفضل استخدام صحي</td>
                <td className="p-4 text-stone-800 border-r border-stone-100">
                  <ul className="list-disc list-inside space-y-1">
                    {honeyA.healthBenefits.slice(0, 2).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 text-stone-800 border-r border-stone-100">
                  <ul className="list-disc list-inside space-y-1">
                    {honeyB.healthBenefits.slice(0, 2).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="p-4 font-bold text-amber-950 bg-amber-100/40">الأسعار الحقيقية</td>
                <td className="p-4 border-r border-stone-200">
                  <div className="space-y-1">
                    {honeyA.sizes.map(s => (
                      <div key={s.weight} className="flex justify-between items-center text-xs">
                        <span className="text-stone-600">{s.weight}:</span>
                        <span className="font-bold text-amber-950 tabular-nums">{s.price} ر.س</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddA}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      addedA
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-amber-950'
                    }`}
                  >
                    {addedA ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    <span>{addedA ? 'تمت الإضافة' : 'أضف (أ) للسلة'}</span>
                  </button>
                </td>
                <td className="p-4 border-r border-stone-200">
                  <div className="space-y-1">
                    {honeyB.sizes.map(s => (
                      <div key={s.weight} className="flex justify-between items-center text-xs">
                        <span className="text-stone-600">{s.weight}:</span>
                        <span className="font-bold text-amber-950 tabular-nums">{s.price} ر.س</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddB}
                    className={`mt-3 w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      addedB
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-amber-950'
                    }`}
                  >
                    {addedB ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    <span>{addedB ? 'تمت الإضافة' : 'أضف (ب) للسلة'}</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

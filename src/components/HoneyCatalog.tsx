import React, { useState } from 'react';
import { HoneyProduct, HoneySize } from '../types/honey';
import { Search, SlidersHorizontal, Eye, ShoppingBag, Check, Star } from 'lucide-react';

interface HoneyCatalogProps {
  products: HoneyProduct[];
  onSelectProduct: (product: HoneyProduct) => void;
  onAddToCart: (product: HoneyProduct, size: HoneySize) => void;
}

export const HoneyCatalog: React.FC<HoneyCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedGoal, setSelectedGoal] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  // Categories list
  const categories = ['الكل', 'جبلي', 'شوكي وصحراوي', 'نادر', 'زهور وأعشاب', 'علاجي معتمد'];
  const goals = ['الكل', 'المناعة', 'المعدة', 'الصدر', 'السكر', 'الطاقة', 'الأطفال', 'كبار السن'];

  // Filter & Sort
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesGoal = selectedGoal === 'الكل' || product.bestFor.includes(selectedGoal);
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.includes(searchQuery) ||
      product.region.includes(searchQuery) ||
      product.floralSource.includes(searchQuery) ||
      product.healthBenefits.some(b => b.includes(searchQuery));
    return matchesCategory && matchesGoal && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice = a.sizes[0].price;
    const bPrice = b.sizes[0].price;
    if (sortBy === 'price-asc') return aPrice - bPrice;
    if (sortBy === 'price-desc') return bPrice - aPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const handleSelectSize = (productId: string, sizeIndex: number) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: sizeIndex }));
  };

  const handleAddWithFeedback = (product: HoneyProduct) => {
    const sizeIndex = selectedSizes[product.id] || 0;
    const size = product.sizes[sizeIndex];
    onAddToCart(product, size);

    const key = `${product.id}-${size.weight}`;
    setAddedItemKey(key);
    setTimeout(() => {
      setAddedItemKey(null);
    }, 1800);
  };

  return (
    <section id="catalog" className="py-16 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <p className="text-xs font-bold tracking-wide text-amber-800 uppercase">
            موسوعة الأعسال السعودية الأصيلة
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-amiri [text-wrap:balance]">
            جميع أنواع العسل في السعودية بالأسعار والمواصفات الحقيقية
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            اختر النوع والوزن الذي يناسبك (1 كجم، 500 جم، 250 جم). جميع الأسعار بالريال السعودي شاملة الفحص المخبري المعتمد.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="ابحث باسم العسل، المنطقة (عسير، حائل، الباحة)، أو الفائدة (الصدر، السكر)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all text-stone-800 placeholder:text-stone-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-stone-500" />
              <span className="text-xs text-stone-500 whitespace-nowrap">ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="py-2 px-3 text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 cursor-pointer"
              >
                <option value="featured">الأكثر طلباً بالمملكة</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Interactive Filter Buttons) */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="font-semibold text-stone-700 whitespace-nowrap shrink-0">تصنيف العسل:</span>
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-amber-900 text-amber-50 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Goal Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="font-semibold text-stone-700 whitespace-nowrap shrink-0">الهدف الصحي:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {goals.map(goal => (
                  <button
                    key={goal}
                    onClick={() => setSelectedGoal(goal)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      selectedGoal === goal
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/60'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid - 3 columns desktop, 2 tablet, 1 mobile */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-base font-semibold text-stone-700 mb-2">لا توجد نتائج مطابقة لبحثك</p>
            <p className="text-xs text-stone-500 mb-4">جرب البحث بكلمات أخرى أو اختر "الكل" في التصنيفات</p>
            <button
              onClick={() => {
                setSelectedCategory('الكل');
                setSelectedGoal('الكل');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-amber-950 bg-amber-400 rounded-lg cursor-pointer"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sortedProducts.map(product => {
              const currentSizeIndex = selectedSizes[product.id] || 0;
              const currentSize = product.sizes[currentSizeIndex];
              const isAdded = addedItemKey === `${product.id}-${currentSize.weight}`;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden text-right"
                >
                  {/* Image Container with Fallback */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={e => {
                        // Fallback container
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {product.badge && (
                        <span className="text-[11px] font-bold bg-amber-950/80 backdrop-blur-sm text-amber-100 px-2.5 py-0.5 rounded-md">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs font-bold text-amber-950 shadow-sm pointer-events-auto">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="tabular-nums">{product.rating}</span>
                        <span className="text-[10px] text-stone-500 font-normal">({product.reviewsCount})</span>
                      </div>

                      <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[11px] text-stone-700 font-medium">
                        {product.harvestSeason}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
                        <span className="font-semibold text-amber-900">{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.region}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                        {product.name}
                      </h3>

                      {/* Tagline / Specs preview */}
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Lab Specs Strip */}
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50 text-[11px] text-stone-700 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-500">نسبة السكروز:</span>
                          <span className="font-bold text-stone-800">{product.labSpecs.sucrose}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-500">نشاط الدياستيز:</span>
                          <span className="font-bold text-stone-800">{product.labSpecs.diastase}</span>
                        </div>
                      </div>
                    </div>

                    {/* Weight / Size Selector */}
                    <div className="space-y-3 pt-2 border-t border-stone-100">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-medium text-stone-600">اختر الوزن:</span>
                          <span className="text-amber-900 font-bold text-[11px]">سعر حقيقي ومحدد</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {product.sizes.map((size, idx) => (
                            <button
                              key={size.weight}
                              onClick={() => handleSelectSize(product.id, idx)}
                              className={`py-1.5 px-2 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                currentSizeIndex === idx
                                  ? 'bg-amber-900 text-amber-50 shadow-sm'
                                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
                              }`}
                            >
                              <div className="text-[11px] truncate">{size.weight.split(' ')[0]}</div>
                              <div className="text-[10px] opacity-80 tabular-nums">{size.price} ر.س</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price baseline */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[11px] text-stone-500 block">السعر للوزن المحدد:</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-amber-950 tabular-nums">
                              {currentSize.price} <span className="text-sm font-bold">ر.س</span>
                            </span>
                            {currentSize.originalPrice && (
                              <span className="text-xs text-stone-400 line-through tabular-nums">
                                {currentSize.originalPrice} ر.س
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectProduct(product)}
                          className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline py-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>المواصفات والتحليل</span>
                        </button>
                      </div>

                      {/* Add to Cart CTA */}
                      <button
                        onClick={() => handleAddWithFeedback(product)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-sm hover:shadow active:scale-98'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>تمت الإضافة للسلة بنجاح!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>أضف للسلة ({currentSize.weight.split(' ')[0]})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

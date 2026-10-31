import React, { useState } from 'react';
import { HONEY_PRODUCTS, CUSTOMER_REVIEWS } from './data/honeyData';
import { HoneyProduct, HoneySize, CartItem, CustomerReview } from './types/honey';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HoneyCatalog } from './components/HoneyCatalog';
import { HoneyAdvisor } from './components/HoneyAdvisor';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { HoneyComparison } from './components/HoneyComparison';
import { GoldenGuarantee } from './components/GoldenGuarantee';
import { ManagerLicenseBadge } from './components/ManagerLicenseBadge';
import { SaudiRobotAssistant } from './components/SaudiRobotAssistant';
import { HoneyDetailModal } from './components/HoneyDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminPortalModal, AdminOrder } from './components/AdminPortalModal';
import { ElectronicInvoiceModal } from './components/ElectronicInvoiceModal';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<HoneyProduct[]>(HONEY_PRODUCTS);
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: HONEY_PRODUCTS[0],
      selectedSize: HONEY_PRODUCTS[0].sizes[0],
      quantity: 1
    }
  ]);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<HoneyProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isElectronicInvoiceOpen, setIsElectronicInvoiceOpen] = useState<boolean>(false);
  const [activeTrackingOrderNumber, setActiveTrackingOrderNumber] = useState<string>('HN-284910');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);

  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([
    {
      id: 'HN-284910',
      customerName: 'عبد الله بن سعد السبيعي',
      phoneNumber: '0503918231',
      city: 'الرياض',
      district: 'حي الملقا، شارع الأمير فيصل',
      itemsSummary: 'عسل السدر الجبلي البلدي الفاخر (1 كجم) × 1',
      totalAmount: 390,
      paymentMethod: 'مدى (Mada)',
      paymentStatus: 'مدفوع',
      shippingStatus: 'تم الشحن',
      date: '2026/10/31',
      time: '10:30 ص',
      carrier: 'أسطول حنان المبرد المباشر',
      trackingNumber: 'HN-COLD-9982',
      taxAmount: 51
    },
    {
      id: 'HN-441290',
      customerName: 'د. سارة آل الشيخ',
      phoneNumber: '0558192044',
      city: 'جدة',
      district: 'حي الروضة، طريق الكورنيش',
      itemsSummary: 'عسل المجرى الأبيض النادر (500 جم) + عسل حبة البركة (1 كجم)',
      totalAmount: 515,
      paymentMethod: 'Apple Pay',
      paymentStatus: 'مدفوع',
      shippingStatus: 'تم الشحن',
      date: '2026/10/30',
      time: '03:15 م',
      carrier: 'سمسا إكسبريس (SMSA)',
      trackingNumber: 'SMSA-928174112',
      taxAmount: 67
    },
    {
      id: 'HN-712850',
      customerName: 'المهندس خالد القحطاني',
      phoneNumber: '0541189201',
      city: 'الدمام',
      district: 'حي الشاطئ الغربي',
      itemsSummary: 'بكج العسل الثلاثي الملكي (سدر بلدي، طلح حائل، سمر الجنوب)',
      totalAmount: 1040,
      paymentMethod: 'مدى (Mada)',
      paymentStatus: 'مدفوع',
      shippingStatus: 'تم التوصيل',
      date: '2026/10/29',
      time: '11:20 ص',
      carrier: 'أرامكس (Aramex)',
      trackingNumber: 'ARMX-551029841',
      taxAmount: 136
    },
    {
      id: 'HN-892105',
      customerName: 'أبو فهد العتيبي',
      phoneNumber: '0507718902',
      city: 'الرياض',
      district: 'حي النرجس',
      itemsSummary: 'عسل الطلح الحائلي البري (1 كجم) × 1',
      totalAmount: 340,
      paymentMethod: 'عند الاستلام',
      paymentStatus: 'عند الاستلام',
      shippingStatus: 'تم التوصيل',
      date: '2026/10/28',
      time: '04:45 م',
      carrier: 'أسطول حنان المبرد المباشر',
      trackingNumber: 'HN-COLD-8821',
      taxAmount: 44
    }
  ]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenTracker = (orderNumber?: string) => {
    if (orderNumber) {
      setActiveTrackingOrderNumber(orderNumber);
    }
    setIsTrackerOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'قيد التجهيز' | 'تم الشحن' | 'تم التوصيل') => {
    setAdminOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, shippingStatus: newStatus } : ord))
    );
  };

  const handleAddToCart = (product: HoneyProduct, size: HoneySize) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize.weight === size.weight
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems(prev => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleProceedToCheckout = (discount: number) => {
    setAppliedDiscountPercent(discount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (newOrderData?: any) => {
    setCartItems([]);
    if (newOrderData) {
      const formattedOrder: AdminOrder = {
        id: newOrderData.id,
        customerName: newOrderData.customerName,
        phoneNumber: newOrderData.phoneNumber,
        city: newOrderData.city,
        district: newOrderData.district || 'العنوان المسجل',
        itemsSummary: newOrderData.itemsSummary,
        totalAmount: newOrderData.totalAmount,
        paymentMethod: newOrderData.paymentMethod,
        paymentStatus: newOrderData.paymentMethod === 'عند الاستلام' ? 'عند الاستلام' : 'مدفوع',
        shippingStatus: 'قيد التجهيز',
        date: new Date().toLocaleDateString('ar-SA'),
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        carrier: 'سمسا إكسبريس (SMSA)',
        trackingNumber: `SMSA-${Math.floor(100000000 + Math.random() * 900000000)}`,
        taxAmount: newOrderData.taxAmount || Math.round((newOrderData.totalAmount * 15) / 115)
      };
      setAdminOrders(prev => [formattedOrder, ...prev]);
    }
  };

  const handleInvoiceApproved = (invoiceData: any) => {
    if (invoiceData) {
      setAdminOrders(prev => [invoiceData, ...prev]);
    }
  };

  const handleAddReview = (newReview: CustomerReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const scrollToAdvisor = () => {
    const el = document.getElementById('advisor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-stone-900 font-sans" dir="rtl">
      {/* Promotional Top Ribbon */}
      <div className="bg-amber-950 text-amber-200 text-[11px] py-1.5 px-4 text-center font-medium border-b border-amber-900/40 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span>🚚 شحن مبرد لكافة مدن المملكة للطلبات فوق 299 ر.س</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>جوال وواتساب الطلبات المباشر: <strong className="text-amber-300 font-mono text-xs">0507199883</strong></span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>كود خصم 10%: <strong className="text-amber-400 font-mono">HANAN10</strong></span>
      </div>

      {/* Official Freelance License & Manager Verification Banner */}
      <ManagerLicenseBadge />

      {/* 3-Zone Top Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdvisor={scrollToAdvisor}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenAdvisor={scrollToAdvisor}
          onExploreCatalog={scrollToCatalog}
        />

        {/* Catalog of all Honey Types in Saudi Arabia with Real Prices */}
        <HoneyCatalog
          products={products}
          onSelectProduct={product => setSelectedProductForDetail(product)}
          onAddToCart={handleAddToCart}
        />

        {/* Interactive Smart Advisor Quiz */}
        <HoneyAdvisor
          products={products}
          onSelectProduct={product => setSelectedProductForDetail(product)}
          onAddToCart={handleAddToCart}
        />

        {/* Customer Reviews with Customer Photos & Specifications */}
        <CustomerReviewsSection
          reviews={reviews}
          products={products}
          onAddReview={handleAddReview}
        />

        {/* Side-by-Side Honey Comparison Tool */}
        <HoneyComparison
          products={products}
          onAddToCart={handleAddToCart}
        />

        {/* Golden Guarantee 3x Refund */}
        <GoldenGuarantee />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Saudi Arabic AI Robot Assistant */}
      <SaudiRobotAssistant
        onOpenCatalog={scrollToCatalog}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* Detailed Specifications & SASO Lab Test Modal */}
      <HoneyDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shipment Tracking Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        defaultOrderNumber={activeTrackingOrderNumber}
      />

      {/* Secret Admin Portal Modal (Passcode Protected: 0055166) */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={adminOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Electronic Invoice Issuance Modal */}
      <ElectronicInvoiceModal
        isOpen={isElectronicInvoiceOpen}
        onClose={() => setIsElectronicInvoiceOpen(false)}
        cartItems={cartItems}
        discountPercent={appliedDiscountPercent}
        onInvoiceApproved={handleInvoiceApproved}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onOpenElectronicInvoice={() => setIsElectronicInvoiceOpen(true)}
      />

      {/* Realistic Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountPercent={appliedDiscountPercent}
        onOrderCompleted={handleOrderCompleted}
        onTrackOrder={orderNum => handleOpenTracker(orderNum)}
        onOpenElectronicInvoice={() => setIsElectronicInvoiceOpen(true)}
      />
    </div>
  );
}

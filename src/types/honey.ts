export interface HoneySize {
  weight: string;
  weightGrams: number;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface LabSpecs {
  sucrose: string;
  diastase: string;
  moisture: string;
  hmf: string;
  purity: string;
}

export interface HoneyProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'جبلي' | 'شوكي وصحراوي' | 'نادر' | 'زهور وأعشاب' | 'علاجي معتمد';
  region: string;
  floralSource: string;
  colorName: string;
  colorHex: string;
  texture: string;
  tasteNotes: string;
  sizes: HoneySize[];
  labSpecs: LabSpecs;
  healthBenefits: string[];
  bestFor: string[];
  usageInstructions: string;
  harvestSeason: string;
  badge?: string;
  image: string;
  rating: number;
  reviewsCount: number;
  labCertificateNumber: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerTitle?: string;
  customerAge: number;
  city: string;
  customerSpecs: string;
  customerGoal: string;
  honeyPurchased: string;
  honeyId: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  healthImpact: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: HoneyProduct;
  selectedSize: HoneySize;
  quantity: number;
}

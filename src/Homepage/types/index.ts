export interface Feature {
    id: number;
    title: string;
    description: string;
    icon: string;
  }
  
  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
  }
  
  export interface PricingPlan {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
  }
  
  export interface NavItem {
    label: string;
    href: string;
  }
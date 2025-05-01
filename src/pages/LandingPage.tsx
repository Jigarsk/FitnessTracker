import React from 'react';
import Header from '../Homepage/Header';
import HeroSection from '../Homepage/HeroSection';
import FeatureSection from '../Homepage/FeatureSection';
import ActivitySection from '../Homepage/ActivitySection';
import TestimonialSection from '../Homepage/TestimonialSection';
import PricingSection from '../Homepage/PricingSection';
import Footer from '../Homepage/Footer';
import NewsletterSection from '../Homepage/NewsLetterSection';


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <ActivitySection />
        <TestimonialSection />
        <PricingSection />
<NewsletterSection/>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
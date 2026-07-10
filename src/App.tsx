import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustArea from './components/TrustArea';
import Benefits from './components/Benefits';
import YoutubeSection from './components/YoutubeSection';
import Products from './components/Products';
import ConsultationForm from './components/ConsultationForm';
import Reviews from './components/Reviews';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleSelectProduct = (productName: string) => {
    setSelectedProduct(productName);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 text-slate-900 ${!isAdminView ? 'pb-20 md:pb-0' : ''}`} id="app-root">
      {/* Universal Header */}
      <Header />

      <main className="flex-grow">
        {isAdminView ? (
          /* Secured Admin Control Dashboard */
          <AdminDashboard />
        ) : (
          /* High-Converting Client Landing Page */
          <>
            <Hero />
            <TrustArea />
            <Benefits />
            <YoutubeSection />
            <Products onSelectProduct={handleSelectProduct} />
            <ConsultationForm selectedProduct={selectedProduct} />
            <Reviews />
          </>
        )}
      </main>

      {/* Universal Corporate Footer & CTA */}
      <Footer />

      {/* Mobile-Friendly Bottom Sticky CTA bar */}
      {!isAdminView && <MobileBottomBar />}
    </div>
  );
}

import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProductsSection from "@/components/ProductsSection";
import BenefitsSection from "@/components/BenefitsSection";
import CustomFormSection from "@/components/CustomFormSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import FloatingLoginButton from "@/components/FloatingLoginButton";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <ProductsSection />
      <BenefitsSection />
      <CustomFormSection />
      <GuaranteeSection />
      <Footer />
      <FloatingChat />
      <FloatingLoginButton />
    </div>
  );
};

export default Index;

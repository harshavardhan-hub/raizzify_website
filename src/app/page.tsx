import HeroSection from '@/components/home/HeroSection';
import TrustMarquee from '@/components/home/TrustMarquee';
import ProductPillars from '@/components/home/ProductPillars';
import WhyRaizzify from '@/components/home/WhyRaizzify';
import AudienceCards from '@/components/home/AudienceCards';
import HowItWorks from '@/components/home/HowItWorks';
import StatsRow from '@/components/home/StatsRow';
import Testimonials from '@/components/home/Testimonials';
import FinalCTA from '@/components/home/FinalCTA';
import IndustriesWeServe from '@/components/home/IndustriesWeServe';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustMarquee />
      <ProductPillars />
      <WhyRaizzify />
      <AudienceCards />
      <HowItWorks />
      <StatsRow />
      <Testimonials />
      <IndustriesWeServe />
      <FinalCTA />
    </>
  );
}

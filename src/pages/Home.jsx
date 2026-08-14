import Hero from '../components/home/Hero';
import SocialProofStrip from '../components/home/SocialProofStrip';
import Offerings from '../components/home/Offerings';
import ClassSnapshot from '../components/home/ClassSnapshot';
import MembershipTeaser from '../components/home/MembershipTeaser';
import CoachSpotlight from '../components/home/CoachSpotlight';
import TransformationCarousel from '../components/home/TransformationCarousel';
import Testimonials from '../components/home/Testimonials';
import LocationSnippet from '../components/home/LocationSnippet';
import FinalCtaBanner from '../components/home/FinalCtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofStrip />
      <Offerings />
      <ClassSnapshot />
      <MembershipTeaser />
      <CoachSpotlight />
      <TransformationCarousel />
      <Testimonials />
      <LocationSnippet />
      <FinalCtaBanner />
    </>
  );
}
import React from 'react'
import HeroSection from './sections/hero-section';
import HeaderSection from './sections/header-section';
import AboutSection from './sections/about-section';
import ServicesSection from './sections/services-section';
import FooterSection from './sections/footer-section';
import FeedbacksSection from './sections/feedbacks-section';
import ScheduleSection from './sections/schedule-section';

export default function Home() {
  return (
    <main className='bg-secondary'>
      <HeaderSection/>
      <HeroSection/>
      <AboutSection/>
      <FeedbacksSection/>
      <ServicesSection/>
      <ScheduleSection />
      <FooterSection/>
    </main>
  )
}

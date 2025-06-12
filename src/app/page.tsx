import React from 'react'
import HeroSection from './sections/hero-section';
import HeaderSection from './sections/header-section';
import AboutSection from './sections/about-section';
import ServicesSection from './sections/services-section';
import FooterSection from './sections/footer-section';

export default function Home() {
  return (
    <main className='bg-secondary'>
      <HeaderSection/>
      <HeroSection/>
      <AboutSection/>
      <ServicesSection/>
      <FooterSection/>
    </main>
  )
}

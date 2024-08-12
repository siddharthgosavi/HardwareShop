import React from 'react'
import Header from './Header'
import Hero from './Hero'
import ProductCategories from './ProductCategories'
import AboutUs from './AboutUs'
import Footer from './Footer'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Hero />
      <ProductCategories />
      <AboutUs />
      <Footer />
    </div>
  )
}

export default LandingPage
import React from 'react';
import { Hero, Navbar, Companies, Courses, Achievement, Categories, Feedback, CTA, Footer } from '../components';
export default function Landing() {
 
  return (
    <div>
       <Navbar />
      <Hero />
      <Companies/>
      <Courses />
      <Achievement />
      <Categories />
      <Feedback />
      <CTA />
      <Footer/>
    </div>
    
   
  )
}
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MainContent from '../components/MainContent'

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Full background content */}
      <main className="flex-grow">
        <MainContent>
          {children}   {/* inject children here */}
        </MainContent>
      </main>

      <Footer />
    </div>
  );
}
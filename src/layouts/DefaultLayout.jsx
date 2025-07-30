import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function DefaultLayout({ children }) {
  return (
     <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

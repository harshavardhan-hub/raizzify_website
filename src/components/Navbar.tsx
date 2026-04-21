'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 px-6 md:px-12 bg-white/80 backdrop-blur-md border-b border-gray-100 mix-blend-multiply">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-text">Raizzify.</h1>
        <nav className="space-x-8 text-sm font-medium text-muted hidden md:flex">
          <a href="#" className="hover:text-text transition-colors">Products</a>
          <a href="#" className="hover:text-text transition-colors">Solutions</a>
          <a href="#" className="hover:text-text transition-colors">Pricing</a>
          <a href="#" className="hover:text-text transition-colors">Company</a>
        </nav>
        <button className="hidden md:block bg-text text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent hover:text-white transition-all transform hover:-translate-y-0.5">
          Get Started
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-text" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-surface border-b border-gray-100 flex flex-col items-center py-6 md:hidden">
          <a href="#" className="py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Products</a>
          <a href="#" className="py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Solutions</a>
          <a href="#" className="py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Pricing</a>
          <a href="#" className="py-2 text-text font-medium" onClick={() => setIsOpen(false)}>Company</a>
          <button className="mt-4 bg-text text-white px-5 py-2.5 rounded-full text-sm font-semibold">
            Get Started
          </button>
        </div>
      )}
    </header>
  )
}

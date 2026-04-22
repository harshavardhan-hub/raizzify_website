'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl py-3 md:py-4 px-6 md:px-8 bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-sm transition-all">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text">Raizzify.</h1>
          <nav className="space-x-8 text-sm font-medium text-muted hidden md:flex">
            <a href="#" className="hover:text-text transition-colors">Products</a>
            <a href="#" className="hover:text-text transition-colors">Solutions</a>
            <a href="#" className="hover:text-text transition-colors">Pricing</a>
            <a href="#" className="hover:text-text transition-colors">Company</a>
          </nav>
          <button className="hidden md:block bg-text text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm">
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-text relative z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col pt-[100px] px-8 pb-10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col h-full justify-between">
              <motion.div 
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }
                }}
                className="flex flex-col space-y-2 mt-4"
              >
                {['Products', 'Solutions', 'Pricing', 'Company'].map((item) => (
                  <div key={item} className="overflow-hidden py-2">
                    <motion.a 
                      href="#" 
                      variants={{
                        hidden: { y: "100%", opacity: 0, rotate: 2 },
                        visible: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                      }}
                      className="block text-5xl font-display font-medium text-text hover:text-accent transition-colors" 
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </motion.a>
                  </div>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-auto border-t border-gray-200/50 pt-8 flex flex-col space-y-8"
              >
                <button className="w-full bg-text text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-accent hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Get Started
                </button>
                <div className="flex justify-between items-center text-sm font-medium text-muted">
                  <a href="#" className="hover:text-text transition-colors">Twitter</a>
                  <a href="#" className="hover:text-text transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-text transition-colors">Instagram</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

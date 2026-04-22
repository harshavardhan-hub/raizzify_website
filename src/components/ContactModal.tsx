'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold font-display text-text">Contact Us</h3>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                <p className="text-gray-600 mb-2 font-medium">Contact Nikhil Raizzify directly:</p>
                <a 
                  href="https://wa.me/917880096649?text=Hello!%20I'm%20interested%20in%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6 mr-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.385 0 .001 5.384.001 12.031c0 2.12.551 4.195 1.597 6.015L.031 24l6.096-1.598c1.785.955 3.791 1.458 5.901 1.458 6.648 0 12.033-5.385 12.033-12.033S18.679 0 12.031 0zm0 21.905c-1.846 0-3.655-.497-5.242-1.439l-.376-.223-3.896 1.021 1.039-3.798-.245-.39A9.972 9.972 0 0 1 2.062 12.03c0-5.503 4.476-9.978 9.97-9.978 5.501 0 9.974 4.475 9.974 9.978s-4.473 9.975-9.975 9.975zm5.459-7.447c-.299-.15-1.77-.874-2.044-.974-.275-.1-.476-.15-.675.15-.2.3-.775.975-.95.117-.175.2-.35.225-.65.075-.3-.15-1.264-.466-2.408-1.488-.888-.795-1.49-1.777-1.665-2.077-.175-.3-.018-.462.131-.611.135-.134.3-.349.45-.524.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.514h-.575c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.112 3.226 5.113 4.526.715.308 1.272.492 1.706.63.716.228 1.37.195 1.884.118.577-.087 1.77-.723 2.02-1.423.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                  </svg>
                  +91 788 009 6649
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

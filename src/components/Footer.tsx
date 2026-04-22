'use client';

import { useModal } from './ModalContext';

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="bg-zinc-950 border-t border-white/10 py-16 px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/raizzify_logo.png" alt="Raizzify Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            <h2 className="text-2xl font-bold tracking-tight text-white">Raizzify.</h2>
          </div>
          <p className="text-zinc-400 max-w-xs text-sm">
            The definitive platform to shape your next digital venture. Speed, precision, and performance combined.
          </p>
        </div>
        
        <div className="flex space-x-12 mt-12 md:mt-0 text-sm">
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-xs">Company</span>
            <a href="#" className="text-zinc-400 hover:text-accent transition-colors">About Us</a>
            <a href="#" className="text-zinc-400 hover:text-accent transition-colors">Careers</a>
            <button onClick={openModal} className="text-zinc-400 hover:text-accent transition-colors text-left">Contact</button>
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-xs">Legal</span>
            <a href="/privacy-policy" className="text-zinc-400 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="/refund-policy" className="text-zinc-400 hover:text-accent transition-colors">Refund Policy</a>
            <a href="/terms-of-service" className="text-zinc-400 hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-center md:justify-start text-xs text-zinc-400">
        <span>© 2026 Raizzify. All rights reserved.</span>
      </div>
    </footer>
  )
}

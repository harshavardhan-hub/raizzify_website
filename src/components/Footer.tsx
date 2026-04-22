export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-100 py-16 px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/raizzify_logo.png" alt="Raizzify Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            <h2 className="text-2xl font-bold tracking-tight text-text">Raizzify.</h2>
          </div>
          <p className="text-muted max-w-xs text-sm">
            The definitive platform to shape your next digital venture. Speed, precision, and performance combined.
          </p>
        </div>
        
        <div className="flex space-x-12 mt-12 md:mt-0 text-sm">
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-text uppercase tracking-wider text-xs">Product</span>
            <a href="#" className="text-muted hover:text-accent transition-colors">Features</a>
            <a href="#" className="text-muted hover:text-accent transition-colors">Integrations</a>
            <a href="#" className="text-muted hover:text-accent transition-colors">Pricing</a>
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-semibold text-text uppercase tracking-wider text-xs">Company</span>
            <a href="#" className="text-muted hover:text-accent transition-colors">About Us</a>
            <a href="#" className="text-muted hover:text-accent transition-colors">Careers</a>
            <a href="#" className="text-muted hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex justify-between text-xs text-muted">
        <span>© 2026 Raizzify. All rights reserved.</span>
        <div className="space-x-6">
          <a href="#" className="hover:text-text transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

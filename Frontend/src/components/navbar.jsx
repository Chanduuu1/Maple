import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Maple
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Destinations
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              How it works
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              About
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Sign in
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
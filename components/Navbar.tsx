import React, { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'books', label: 'Books' },
    { id: 'authors', label: 'Authors & Team' },
    { id: 'services', label: 'Services & Booking' },
    { id: 'media', label: 'Interviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-brand-purple sticky top-0 z-50 shadow-lg border-b-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setPage('home')}>
              <h1 className="text-white text-2xl font-serif font-bold tracking-wider">
                T & R <span className="text-brand-gold">Birthing Books</span>
              </h1>
              <p className="text-brand-gold text-xs tracking-widest uppercase">Lubbock, Texas</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'bg-brand-gold text-brand-purple font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-purple-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-gold hover:text-white hover:bg-purple-800 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-900 border-t border-brand-gold">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-brand-gold text-brand-purple'
                    : 'text-gray-300 hover:text-white hover:bg-purple-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
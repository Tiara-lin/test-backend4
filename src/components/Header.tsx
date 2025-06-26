import React from 'react';
import { Instagram, Search, Heart, Home, PlusSquare, Film, Send, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Instagram className="h-8 w-8 mr-2" />
          <h1 className="text-lg font-semibold hidden sm:block">Instagram</h1>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex mx-4 flex-1 max-w-xs">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full bg-gray-100 border-0 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right side icons */}
        <nav className="flex items-center">
          {/* Mobile search icon */}
          <div className="md:hidden mr-4">
            <Search className="h-6 w-6" />
          </div>

          {/* Icons + Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            <Home className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" />
            <Send className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" />
            <PlusSquare className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" />
            <Film className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" />
            <Heart className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" />
            <div className="h-6 w-6 rounded-full overflow-hidden cursor-pointer border border-gray-200 hover:shadow-md transition-shadow">
              <img
                src="https://i.ibb.co/ymN2m0CM/20250502-0208-image.png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Mobile menu icon */}
          <button className="md:hidden ml-4">
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;


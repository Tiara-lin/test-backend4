import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-xs text-gray-400 mt-8 mb-8">
      <div className="flex flex-wrap gap-x-2 mb-3">
        <a href="#" className="hover:underline">About</a>
        <span>·</span>
        <a href="#" className="hover:underline">Help</a>
        <span>·</span>
        <a href="#" className="hover:underline">Press</a>
        <span>·</span>
        <a href="#" className="hover:underline">API</a>
        <span>·</span>
        <a href="#" className="hover:underline">Jobs</a>
        <span>·</span>
        <a href="#" className="hover:underline">Privacy</a>
        <span>·</span>
        <a href="#" className="hover:underline">Terms</a>
        <span>·</span>
        <a href="#" className="hover:underline">Locations</a>
        <span>·</span>
        <a href="#" className="hover:underline">Language</a>
      </div>
      <p>© 2025 INSTAGRAM FROM META</p>
    </footer>
  );
};

export default Footer;
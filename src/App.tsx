import React from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Suggestions from './components/Suggestions';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-screen-lg mx-auto pt-16 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Main content */}
          <div className="w-full lg:flex-1">
            <Stories />
            <Feed />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-[320px] pt-4 sticky top-20">
            <Profile 
              username="johndoe"
              name="John Doe"
              imageUrl="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Suggestions />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

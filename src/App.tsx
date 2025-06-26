import React, { useState } from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Suggestions from './components/Suggestions';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { BarChart3 } from 'lucide-react';

function App() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Analytics Toggle Button */}
      <button
        onClick={() => setShowAnalytics(!showAnalytics)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        title="Toggle Analytics Dashboard"
      >
        <BarChart3 className="w-6 h-6" />
      </button>

      <main className="max-w-screen-lg mx-auto pt-16 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Main content */}
          <div className="w-full lg:flex-1">
            {showAnalytics && (
              <div className="mb-6">
                <AnalyticsDashboard />
              </div>
            )}
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
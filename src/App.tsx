import React, { useState } from 'react';
import { DietProvider } from './context/DietContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AIChat } from './components/AIChat';
import { MealLogger } from './components/MealLogger';
import { MealPlanner } from './components/MealPlanner';
import { GroceryList } from './components/GroceryList';
import { ProfileModal } from './components/ProfileModal';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'chat' | 'logger' | 'planner' | 'grocery'>('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[color:var(--paper)] text-[color:var(--charcoal)] flex flex-col font-sans selection:bg-[color:var(--sage-300)] selection:text-[color:var(--forest-900)] relative">
      <div className="grain"></div>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openProfile={() => setIsProfileOpen(true)} 
      />

      <main className="flex-1 w-full mx-auto">
        {activeTab === 'home' && (
          <LandingPage 
            onLaunchApp={(targetTab) => setActiveTab(targetTab || 'dashboard')} 
          />
        )}

        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Dashboard 
              setActiveTab={setActiveTab} 
              openProfile={() => setIsProfileOpen(true)} 
            />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AIChat />
          </div>
        )}

        {activeTab === 'logger' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <MealLogger />
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <MealPlanner />
          </div>
        )}

        {activeTab === 'grocery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <GroceryList />
          </div>
        )}
      </main>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DietProvider>
      <AppContent />
    </DietProvider>
  );
};

export default App;

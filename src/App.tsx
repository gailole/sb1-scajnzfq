import React, { useEffect, useState } from 'react';
import { ProductCarousel } from './components/ProductCarousel';
import { User } from 'lucide-react';

interface TelegramUser {
  first_name: string;
  last_name?: string;
  photo_url?: string;
}

function App() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp?.initDataUnsafe?.user) {
      setUser(webApp.initDataUnsafe.user);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Profile Section */}
      <div className="header-gradient p-6">
        <div className="flex items-center gap-4">
          {user?.photo_url ? (
            <img 
              src={user.photo_url} 
              alt={user.first_name}
              className="w-16 h-16 rounded-full user-avatar"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center user-avatar">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-white user-name">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-blue-100">Welcome to our expert products</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <ProductCarousel />
      </div>
    </div>
  );
}

export default App;
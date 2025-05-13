import React, { useEffect, useState } from 'react';
import { ProductCarousel, products } from './components/ProductCarousel';
import { LoadingScreen } from './components/LoadingScreen';
import { WorkflowDiagram } from './components/WorkflowDiagram';
import { CaseStudies } from './components/CaseStudies';
import { User, Send } from 'lucide-react';
import { preloadImages } from './utils/imagePreloader';
import configureTelegramHeader from './utils/telegramConfig';

interface TelegramUser {
  first_name: string;
  last_name?: string;
  photo_url?: string;
}

function App() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      if (webApp.initDataUnsafe?.user) {
        setUser(webApp.initDataUnsafe.user);
      }
      webApp.setBackgroundColor('#000000');
      webApp.ready();
      configureTelegramHeader();
    }

    const startTime = Date.now();
    const minLoadingTime = 2000;

    const imagesToPreload = products.map(product => product.image);
    if (webApp?.initDataUnsafe?.user?.photo_url) {
      imagesToPreload.push(webApp.initDataUnsafe.user.photo_url);
    }

    preloadImages(imagesToPreload)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      });

    const checkLoadingComplete = () => {
      const elapsedTime = Date.now() - startTime;
      if (imagesLoaded && elapsedTime >= minLoadingTime) {
        setIsLoading(false);
      } else if (imagesLoaded) {
        const remainingTime = minLoadingTime - elapsedTime;
        setTimeout(() => setIsLoading(false), remainingTime);
      }
    };

    if (imagesLoaded) {
      checkLoadingComplete();
    }

    const interval = setInterval(checkLoadingComplete, 100);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <div className="header-gradient py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-2">
              {user?.photo_url ? (
                <img 
                  src={user.photo_url} 
                  alt={user.first_name}
                  className="w-20 h-20 rounded-full user-avatar"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#2997FF] flex items-center justify-center user-avatar">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
              <a
                href="https://t.me/Gailole"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2997FF] text-white px-4 py-1.5 rounded-full hover:bg-[#0071E3] transition-colors whitespace-nowrap text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Написать</span>
              </a>
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <h1 className="text-lg font-medium text-white">
                  Привет, {user?.first_name}!
                </h1>
              </div>
              <p className="text-white text-sm leading-tight max-w-md">
                Здесь кратко и по делу: экономлю твоё время, рассказываю главное
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-5">
        <h2 className="text-2xl font-semibold text-white mb-5">
          Стек
        </h2>
        <ProductCarousel />
      </div>

      <div className="container mx-auto px-6 py-5">
        <WorkflowDiagram />
      </div>

      <div className="container mx-auto px-6 py-5">
        <CaseStudies />
      </div>
    </div>
  );
}

export default App;
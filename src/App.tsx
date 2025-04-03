import React, { useEffect, useState } from 'react';
import { ProductCarousel, products } from './components/ProductCarousel';
import { LoadingScreen } from './components/LoadingScreen';
import { WorkflowDiagram } from './components/WorkflowDiagram';
import { User } from 'lucide-react';
import { preloadImages } from './utils/imagePreloader';

// Интерфейс для данных пользователя Telegram
interface TelegramUser {
  first_name: string;
  last_name?: string;
  photo_url?: string;
}

function App() {
  // Состояния для управления данными пользователя и загрузкой
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Инициализация данных пользователя из Telegram WebApp
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      if (webApp.initDataUnsafe?.user) {
        setUser(webApp.initDataUnsafe.user);
      }
      // Set theme params for Telegram WebApp
      webApp.setBackgroundColor('#0B0C10');
      webApp.ready();
    }

    const startTime = Date.now();
    const minLoadingTime = 2000; // Минимальное время показа загрузочного экрана

    // Сбор всех изображений для предзагрузки
    const imagesToPreload = products.map(product => product.image);
    if (webApp?.initDataUnsafe?.user?.photo_url) {
      imagesToPreload.push(webApp.initDataUnsafe.user.photo_url);
    }

    // Предзагрузка всех изображений
    preloadImages(imagesToPreload)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error('Error preloading images:', error);
        // Продолжаем работу даже при ошибке загрузки изображений
        setImagesLoaded(true);
      });

    // Обновление состояния загрузки при загрузке изображений и истечении минимального времени
    const checkLoadingComplete = () => {
      const elapsedTime = Date.now() - startTime;
      if (imagesLoaded && elapsedTime >= minLoadingTime) {
        setIsLoading(false);
      } else if (imagesLoaded) {
        // Если изображения загружены, но минимальное время не прошло
        const remainingTime = minLoadingTime - elapsedTime;
        setTimeout(() => setIsLoading(false), remainingTime);
      }
    };

    // Проверка статуса загрузки при загрузке изображений
    if (imagesLoaded) {
      checkLoadingComplete();
    }

    // Периодическая проверка завершения загрузки
    const interval = setInterval(checkLoadingComplete, 100);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#0B0C10] overflow-x-hidden">
      {/* Секция профиля пользователя */}
      <div className="header-gradient py-6">
        <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            {user?.photo_url ? (
              <img 
                src={user.photo_url} 
                alt={user.first_name}
                className="w-20 h-20 rounded-full user-avatar"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#45A29E] flex items-center justify-center user-avatar">
                <User className="w-10 h-10 text-[#0B0C10]" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold user-name">
                Привет, {user?.first_name}!
              </h1>
              <p className="text-[#C5C6C7]">Здесь кратко и по делу: экономлю твоё время, рассказываю главное</p>
            </div>
          </div>
        </div>
      </div>

      {/* Секция продуктов */}
      <div className="p-4 max-w-[100vw] overflow-x-hidden">
        <h2 className="text-2xl font-bold text-[#66FCF1] mb-6 max-w-7xl mx-auto">Стек</h2>
        <ProductCarousel />
      </div>

      {/* Секция рабочего процесса */}
      <WorkflowDiagram />
    </div>
  );
}

export default App;
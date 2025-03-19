import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductProps {
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductCard: React.FC<ProductProps> = ({ title, price, image, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden product-card">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover product-image"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${price}</span>
          <button className="buy-button text-white px-4 py-2 rounded-lg flex items-center gap-2 bg-blue-600 dark:bg-blue-500">
            <ShoppingCart size={20} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <ThemeToggle />
      <ProductCard 
        title="Sample Product" 
        price={29.99} 
        image="https://via.placeholder.com/150" 
        description="This is a sample product description."
      />
    </div>
  );
};

export default App;
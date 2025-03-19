import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductProps {
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductCard: React.FC<ProductProps> = ({ title, price, image, description }) => {
  return (
    <div className="product-card rounded-xl overflow-hidden">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover product-image"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-orange-400">${price}</span>
          <button className="buy-button text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <ShoppingCart size={20} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
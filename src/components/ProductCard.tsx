import React from 'react';

interface ProductProps {
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductCard: React.FC<ProductProps> = ({ title, image, description }) => {
  return (
    <div className="product-card rounded-xl overflow-hidden flex flex-col">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full object-cover product-image"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-[#66FCF1] mb-2">{title}</h3>
        <p className="text-sm text-[#C5C6C7]">{description}</p>
      </div>
    </div>
  );
};
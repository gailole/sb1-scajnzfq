import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from './ProductCard';
import 'swiper/css';
import 'swiper/css/pagination';

const products = [
  {
    id: 1,
    title: "Digital Marketing Course",
    price: 199,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Master digital marketing strategies with this comprehensive course."
  },
  {
    id: 2,
    title: "Business Consultation",
    price: 299,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "One-on-one business consultation to grow your company."
  },
  {
    id: 3,
    title: "Social Media Strategy",
    price: 149,
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Develop an effective social media strategy for your brand."
  },
  {
    id: 4,
    title: "SEO Optimization",
    price: 249,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Improve your website's search engine rankings."
  },
  {
    id: 5,
    title: "Content Creation Workshop",
    price: 179,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Learn to create engaging content for your audience."
  }
];

export const ProductCarousel: React.FC = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.2}
      centeredSlides={true}
      loop={true}
      className="w-full py-4"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
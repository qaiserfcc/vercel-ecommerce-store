'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Share the Profit',
    description: 'Buy in bulk and save more! Share profits with every purchase.',
    image: '/images/banner1.jpg',
    cta: 'Shop Now',
    link: '/shop',
  },
  {
    id: 2,
    title: 'Referral Rewards',
    description: 'Refer friends and earn discounts on your next purchase!',
    image: '/images/banner2.jpg',
    cta: 'Learn More',
    link: '/referral',
  },
  {
    id: 3,
    title: 'New Season Sale',
    description: 'Up to 50% off on selected items. Limited time offer!',
    image: '/images/banner3.jpg',
    cta: 'View Deals',
    link: '/shop?sale=true',
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold text-dark mb-4">{banner.title}</h2>
              <p className="text-xl text-dark-light mb-8">{banner.description}</p>
              <a
                href={banner.link}
                className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
              >
                {banner.cta}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
      >
        <ChevronLeft size={24} className="text-dark" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
      >
        <ChevronRight size={24} className="text-dark" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-primary' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      {children}
    </div>
  );
});

Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} {...props}>
      <div className="flex">
        {children}
      </div>
    </div>
  );
});

CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <div ref={ref} className={`min-w-0 flex-shrink-0 flex-grow-0 basis-full ${className}`} {...props}>
      {children}
    </div>
  );
});

CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white ${className}`}
      {...props}
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
});

CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white ${className}`}
      {...props}
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
});

CarouselNext.displayName = 'CarouselNext';

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
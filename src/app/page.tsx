'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Modal from '@/components/UI/Modal';
import Carousel from '@/components/UI/Carousel';

export default function Home() {
  const modalImages = [
    'math.jpg',
    'math.jpg',
    'math.jpg',
    'math.jpg',
    'math.jpg',
    'math.jpg',
  ];
  return (
    <>
      <Header />

      <div id="add-padding" className="h-24"></div>
      <main className=" text-center">
        <div className="grid items-center justify-center pt-10 min-h-400">
          <Carousel
            images={[
              '/quote-1.png',
              '/quote-2.png',
              '/quote-3.png',
              '/quote-4.jpg',
            ]}
          />
        </div>
        <div className="mx-auto grid items-center justify-center ">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 pb-10">
            {/* Render the modals */}
            {modalImages.map((image, index) => (
              <div key={index} className="col-span-1">
                <Modal image={image} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

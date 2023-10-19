'use client';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Carousel from '@/components/UI/Carousel';
import Modal from '@/components/UI/Modal';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Carousel
          images={[
            '/quote-1.png',
            '/quote-2.png',
            '/quote-3.png',
            '/quote-4.jpg',
          ]}
        />
        <div>
          <Modal image="math.jpg" />
        </div>
      </main>
      <Footer />
    </>
  );
}

import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Carousel from '@/components/UI/Carousel';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Carousel
          images={[
            '/placeholder.jpeg',
            '/placeholder1.jpeg',
            '/placeholder2.jpeg',
          ]}
        />
      </main>
      <Footer />
    </>
  );
}

// import Image from 'next/image';
import { useEffect, useState } from 'react';
import SmallSpinner from '../SmallSpinner';

export default function Carousel({ images }: { images: string[] }) {
  // State to track whether all images are loaded
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Function to preload images
  const preloadImages = (imageList: string[]) => {
    const imagePromises = imageList.map(imageSrc => {
      return new Promise((resolve, reject) => {
        const img = new Image(); // need to create a new image object in order to load it but had issues with the import Image
        img.src = imageSrc;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    return Promise.all(imagePromises);
  };

  useEffect(() => {
    // Preload carousel images
    preloadImages(images)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error('Image preload error:', error);
      });
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let isLastImage = currentIndex === images.length - 1;
      let newIndex = isLastImage ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div id="carousel-container" className='max-w-2xl lg:w-[672px] md:w-[480px] sm:w-[480px] w-72 lg:h-[500px] h-[340px] m-auto py-16 px-4'>
      {imagesLoaded ?
       <div style={{backgroundImage: `url(${images[currentIndex]})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
       : <SmallSpinner /> }
       </div>
  );
}
// import Image from 'next/image';
import { useEffect, useState } from 'react';

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

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSlide < images.length - 1) {
        setActiveSlide(activeSlide + 1);
      } else {
        setActiveSlide(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSlide, images.length]);

  return (
    <div id="carousel-container">
      {images.map((image, index) => (
        <div
          key={index}
          id={`${index}-img`}
          className={
            activeSlide === index ? 'w-32rem h-80 overflow-hidden' : 'hidden'
          }
        >
          <img src={image} width={600} height={400} alt="test" />
        </div>
      ))}
    </div>
  );
}

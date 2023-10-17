'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Carousel(props: { images: string[] }) {

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSlide < (props.images.length - 1)) {
        setActiveSlide(activeSlide + 1);
      } else {
        setActiveSlide(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSlide, props.images.length]);


  return (
    <div id="carousel-container">
      {
        props.images.map((image, index) => {
          return(
            <div key={index} id={`${index}-img`} className={activeSlide === index ? "" : "hidden"}>
              <Image src={image} width={600} height={400} alt="test" />
            </div>
          );
        })
      }
    </div>
  )
}

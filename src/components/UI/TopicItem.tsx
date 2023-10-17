import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Link {
  text: string;
  url: string;
  type: string;
}

interface Props {
  title: string;
  links: Link[];
}

export default function TopicItem({ title, links }: Props) {
  // keep in mind use state requires use client on the page or component that uses it!
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const gradientColors = 'from-byzantium via-byzantium to-palePurple';

  useEffect(() => {
    // Calculate the content height when the card is opened
    if (isOpen && cardRef.current) {
      const contentWrapper = cardRef.current.querySelector('#contentWrapper');
      if (contentWrapper) {
        setContentHeight(contentWrapper.scrollHeight); // scroll height gives height even if content is hidden
      }
    } else {
      // Reset the content height when the card is closed
      setContentHeight(null);
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // custom css style for the height of a card (little impossible to do with tailwind)
  const contentStyle = {
    maxHeight: contentHeight !== null ? `${contentHeight}px` : '0', // Use calculated height or 0 if closed
    overflow: 'hidden',
    transition: 'max-height 0.4s ease', // change value to affect the content drop speed
  };

  return (
    <div ref={cardRef} className={`w-full mb-4 ${gradientColors}`}>
      <div
        id="header"
        className={`bg-byzantium text-white text-lg font-bold p-4 cursor-pointer hover:byzantium rounded-t-lg transition-all bg-gradient-to-r from-byzantium to-plum 
        ${
          !isOpen
            ? 'rounded-b-lg transition-rounded duration-300 delay-300' // change value to affect radius delay and speed
            : ''
        }`} // remove border slowly when closed
        onClick={toggleOpen}
      >
        {title}
        <span id="arrowIcon" className="float-right">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </span>
      </div>
      <div
        id="contentWrapper"
        className={`bg-palePurple border-l-4 border-r-4 pl-4 rounded-b-lg border-skyMagenta 
        ${
          isOpen ? 'border-b-4 transition-border duration-300 delay-1000' : '' // currently does not seem to be working trying to slowly remove the bottom border
        }`}
        style={contentStyle}
      >
        {links.map(
          (
            link,
            index // dynamically add link text, url and image
          ) => (
            <div id="linksIcoWrapper" key={index}>
              <a
                className={`flex items-center p-2 text-blue hover:text-darkBlue transition-colors duration-300`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/icons/${link.type}.png`}
                  alt={`${link.type}`}
                  width={24}
                  height={24}
                />
                {link.text}
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}

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

const TopicItem: React.FC<Props> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate the content height when the card is opened
    if (isOpen && cardRef.current) {
      const contentWrapper = cardRef.current.querySelector('#contentWrapper');
      if (contentWrapper) {
        setContentHeight(contentWrapper.scrollHeight);
      }
    } else {
      // Reset the content height when the card is closed
      setContentHeight(null);
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const contentStyle = {
    maxHeight: contentHeight !== null ? `${contentHeight}px` : '0', // Use calculated height or 0 if closed
    overflow: 'hidden',
    transition: 'max-height 0.4s ease', // Adjust the duration and easing as needed
  };

  return (
    <div ref={cardRef} className="w-full mb-4">
      <div
        id="header"
        className={`bg-byzantium text-white text-lg font-bold p-4 cursor-pointer hover:byzantium rounded-t-lg transition-all 
        ${!isOpen ? 'rounded-b-lg transition-rounded duration-1000' : ''}`} // remove border slowly when closed
        onClick={toggleOpen}
      >
        {title}
        <span className="float-right">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </span>
      </div>
      <div
        id="contentWrapper"
        className={`bg-palePurple border-l-4 border-r-4 border-skyMagenta pl-4 rounded-b-lg 
        ${
          isOpen ? 'border-b-4 transition-border duration-300 delay-1000' : ''
        }`}
        style={contentStyle}
      >
        {links.map((link, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default TopicItem;

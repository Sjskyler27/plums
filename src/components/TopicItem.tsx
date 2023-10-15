import React, { useState } from 'react';
import Image from 'next/image';

interface Link {
  text: string;
  url: string;
  type: string; // Add 'type' to the Link interface
}

interface Props {
  title: string;
  links: Link[];
}

const TopicItem: React.FC<Props> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-4">
      <div
        className="bg-byzantium text-white text-lg font-bold p-4 cursor-pointer hover:byzantium"
        onClick={toggleOpen}
      >
        {title}
        <span className="float-right">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </span>
      </div>
      {isOpen && (
        <div className="bg-palePurple border-l-4 border-skyMagenta pl-4 mt-2">
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center p-2 hover:bg-blue transition-colors duration-300"
            >
              <img
                src={`@/icons/${link.type}.png`} // Dynamically generate the icon URL
                alt={`${link.type}`}
                className="w-6 h-6 mr-2"
              />
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicItem;

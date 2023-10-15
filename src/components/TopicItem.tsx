import React, { useState } from 'react';
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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-4">
      <div
        className={`bg-byzantium text-white text-lg font-bold p-4 cursor-pointer hover:byzantium rounded-t-lg ${
          !isOpen ? 'rounded-b-lg' : '' // Add rounded corners to the bottom when open
        }`}
        onClick={toggleOpen}
      >
        {title}
        <span className="float-right">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </span>
      </div>
      {isOpen && (
        <div className="bg-palePurple border-l-4 border-b-4 border-skyMagenta pl-4 rounded-b-lg">
          {links.map((link, index) => (
            <div key={index}>
              <a
                className="flex items-center p-2 text-blue hover:text-darkBlue transition-colors duration-300"
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
      )}
    </div>
  );
};

export default TopicItem;

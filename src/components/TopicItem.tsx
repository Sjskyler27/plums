import React, { useState } from 'react';

interface Link {
  text: string;
  url: string;
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
        <div className="bg-white border-l-4 border-purple-500 pl-4 mt-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block p-2 hover:bg-purple-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicItem;

import React, { useRef } from 'react';

interface TopicCardProps {
  title: string;
  img: string;
  openCloseFunc: () => void;
}

export default function TopicCard({
  title,
  img,
  openCloseFunc,
}: TopicCardProps) {
  return (
    <div className="w-64">
      <button
        id="header"
        type="button"
        className={`bg-byzantium text-white text-center text-lg font-bold w-full pt-4 border-byzantium cursor-pointer rounded-t-lg  bg-gradient-to-r from-byzantium to-plum hover:from-palePurple hover:to-skyMagenta hover:text-byzantium transition ease-in-out duration-1000`}
        onClick={openCloseFunc}
      >
        <p className="pb-4">{title}</p>
        <img src={img} alt={title} className="w-full h-44 overflow-hidden" />
      </button>
    </div>
  );
}

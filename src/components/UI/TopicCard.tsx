import React, { useRef } from 'react';

interface TopicCardProps {
  title: string;
  img: string;
  color: string;
  openCloseFunc: () => void;
}

export default function TopicCard({
  title,
  img,
  color,
  openCloseFunc,
}: TopicCardProps) {
  return (
    <div className="w-64">
      <button
        id="header"
        type="button"
        className={` text-white text-center text-lg font-bold w-full pt-4 border-byzantium cursor-pointer rounded-t-lg`}
        onClick={openCloseFunc}
        style={{ backgroundColor: color }}
      >
        <p className="pb-4">{title}</p>
        <img src={img} alt={''} className="w-full h-44 overflow-hidden" />
      </button>
    </div>
  );
}

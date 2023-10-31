'use client';
import React, { useEffect, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';

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
  const [editMenuActive, setEditMenuActive] = useState(false);
  function toggleEditMenu() {
    setEditMenuActive(!editMenuActive);
  }

  useEffect(() => {
    const closeEditMenu = (e: MouseEvent) => {
      if (editMenuActive) {
        let menu = document.getElementById('edit-menu')!;
        let eventElem = (e.target as HTMLElement)!;
        if (!menu.contains(eventElem)) setEditMenuActive(!editMenuActive);
      }
    }

      document.addEventListener('click', closeEditMenu);
      return () => document.removeEventListener('click', closeEditMenu);
    }, [editMenuActive]);

  return (
    <div className='grid grid-flow-row'>
      <div className='w-full flex justify-end h-0 z-10'>
      { editMenuActive ? 
      <div className='overflow-visible mr-[-81px] w-auto' id="edit-menu">
        <ul className="bg-palePurple p-3 rounded-lg shadow-lg">
          <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
            <a href="/">Edit</a>
          </li>
          <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
            <a href="/examples">Delete</a>
          </li>
        </ul> 
      </div>
      : <></>}
      </div>
      <div className="w-64">
        <div
          id="header"
          className="text-white text-lg font-bold w-full cursor-pointer rounded-lg"
          onClick={openCloseFunc}
          style={{ backgroundColor: color }}
          >
          <div className='flex justify-between pt-3 pb-3 leading-4'>
            <p className="mt-auto mb-auto pl-2">{title}</p>
            <button type="button" onClick={e => {
              e.stopPropagation();
              toggleEditMenu();
            }}>
              <MdMoreVert style={{fontSize: '32px'}}/>
            </button>
          </div>
          <img src={img} alt={''} className="w-full h-44 overflow-hidden rounded-b-lg" />
        </div>
      </div>
    </div>
  );
}

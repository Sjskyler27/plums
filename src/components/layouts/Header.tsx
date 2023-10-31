'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component from Next.js
import { MdMenu, MdClose } from 'react-icons/md';

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const activateMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    const closeMenuOnClick = (e: MouseEvent) => {
      if (menuActive) {
        let nav = document.getElementById('nav')!;
        let eventElem = (e.target as HTMLElement)!;
        if (!nav.contains(eventElem)) setMenuActive(!menuActive);
      }
    }
    
    document.addEventListener('click', closeMenuOnClick);
    return () => document.removeEventListener('click', closeMenuOnClick);
  }, [menuActive]);

  return (
    <header className="bg-white fixed top-0 w-full border-b-byzantium border-b-2">
      <div className="flex justify-between items-center p-1">
        <div className="flex">
          <Image
            src="/icons/plum.png"
            alt="plum"
            width={75}
            height={75}
            className="m-1"
          />
          <p className="pt-6 text-3xl font-bold text-byzantium">PLUMS</p>
        </div>
        <button
          className="text-byzantium"
          style={{
            fontSize: '48px',
          }}
          onClick={activateMenu}
        >
          {menuActive ? <MdClose /> : <MdMenu/>}
        </button>
      </div>
      <div className='w-full flex justify-end h-0'>
      {menuActive && (
        <nav className="overflow-visible mt-[-20px] mr-2 w-auto" id="nav">
          <ul className="bg-palePurple p-3 rounded-lg shadow-lg">
            <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
              <a href="/">Home</a>
            </li>
            <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
              <a href="/examples">Examples</a>
            </li>
            <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
    </header>
  );
}

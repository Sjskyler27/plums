'use client';
import { useState } from 'react';
import Image from 'next/image'; // Import the Image component from Next.js

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const activateMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="bg-white fixed top-0 w-full">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="flex justify-between p-1">
        <Image
          src="/icons/plum.png"
          alt="plum"
          width={75}
          height={75}
          className="m-1"
        />
        <p className="text-3xl font-bold text-byzantium ">PLUMS</p>
        <span
          className="material-symbols-outlined text-byzantium"
          style={{
            fontSize: '48px',
          }}
          onClick={activateMenu}
        >
          menu
        </span>
      </div>
      {menuActive && (
        <nav>
          <ul className="bg-palePurple">
            <li className="text-center">
              <a href="/">Home</a>
            </li>
            <li className="text-center">
              <a href="/examples">Examples</a>
            </li>
            <li className="text-center">
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

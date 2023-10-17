'use client';
import { useState } from 'react';

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const activateMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="bg-skyMagenta">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="flex justify-between p-1">
        <p className="text-3xl font-bold text-white">PLUMS</p>
        <span
          className="material-symbols-outlined text-white"
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

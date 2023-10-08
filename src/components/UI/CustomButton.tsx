// you can use altColor="true" to enable the alternate style.

import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  altColor?: string;
};

export default function CustomButton({ children, altColor }: Props) {
  // Define the default and alternative classes
  const defaultClasses = 'bg-byzantium  text-white hover:bg-plum';
  const altClasses =
    'bg-white text-black border-byzantium text-byzantium border-2 hover:border-plum hover:text-plum';

  return (
    <div>
      <button
        // here I use turnary expressions to swap between the default color and the altColor
        className={`px-4 py-2 rounded-md font-sans-serif font-bold  
        ${!altColor ? defaultClasses : ''} 
        ${altColor ? altClasses : ''}`}
      >
        {children}
      </button>
    </div>
  );
}

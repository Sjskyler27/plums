import React, { ReactNode } from 'react';

type Props = {
  header?: string;
  children: ReactNode;
};

export default function Card({ children, header }: Props) {
  return (
    <section>
      <h2 className="text-xl text-byzantium font-semibold">{header}</h2>
      <div className="mx-auto w-96 border-plum border-2 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg p-4">
        <p className=" dark:text-gray-200">{children}</p>
      </div>
    </section>
  );
}

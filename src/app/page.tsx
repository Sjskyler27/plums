'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import TopicModal from '@/components/UI/TopicModal';
import Carousel from '@/components/UI/Carousel';
import { Card } from '@/data/parentData';
import defaultChildTopics from '@/data/DefaultChildTopics';
import { apiBaseUrl } from '@/data/constants';
import { ITopic } from '@/data/Topic';

export default function Home() {
  const emptyTopics: ITopic[] = []
  const [topics, setTopics] = useState(emptyTopics);


  async function fetchTopics() {
    const response = await fetch(apiBaseUrl + "/topic");
    if (response.ok) {
      setTopics(await response.json());
    } else {
      console.error('Unable to get data');
    }
  }

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <>
      <Header />
      <div id="add-padding" className="h-24"></div>
      <main className=" text-center">
        <div className="grid items-center justify-center pt-1 min-h-400">
          <Carousel
            images={[
              '/quote-1.png',
              '/quote-2.png',
              '/quote-3.png',
              '/quote-4.jpg',
            ]}
          />
        </div>
        <div className="mx-auto grid items-center justify-center ">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 pb-10">
            {topics.map((item, index) => (
              <div key={index} className="col-span-1">
                <TopicModal
                  image={item.image}
                  title={item.title}
                  color={item.color}
                  id={item._id}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import TopicModal from '@/components/UI/TopicModal';
import Carousel from '@/components/UI/Carousel';
import CustomButton from '@/components/UI/CustomButton';
import { ITopic } from '@/data/Topic';
import CreateTopic from '@/components/UI/CreateTopic';
import SmallSpinner from '@/components/SmallSpinner';

export default function Home() {
  const emptyTopics: ITopic[] = [];
  const [topics, setTopics] = useState(emptyTopics);
  const [loading, setLoading] = useState(false);

  // async function fetchTopics() {
  //   setLoading(true);
  //   const response = await fetch('/api/topic');
  //   if (response.ok) {
  //     setTopics(await response.json());
  //   } else {
  //     console.error('Unable to get data');
  //   }
  //   setLoading(false);
  // }
  const [searchInput, setSearchInput] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);

  async function fetchTopics() {
    setLoading(true);
    const response = await fetch('/api/topic');
    if (response.ok) {
      const allTopics = await response.json();

      if (searchInput === '') {
        setFilteredTopics(allTopics); // Show all topics if no search query
      } else {
        // Filter topics based on the search input
        const filtered = allTopics.filter((topic: ITopic) => {
          return topic.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchInput.toLowerCase())
          );
        });
        setFilteredTopics(filtered);
      }
    } else {
      console.error('Unable to get data');
    }
    setLoading(false);
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
        <br></br>
        <div>
          <input
            type="text"
            className="border-2 border-plum p-2 rounded mr-1"
            placeholder="Search by tag"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <span onClick={fetchTopics}>
            <CustomButton>Search</CustomButton>
          </span>
        </div>

        <div className="mx-auto grid items-center justify-center ">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 pb-10">
            {loading ? (
              <SmallSpinner />
            ) : (
              (filteredTopics as ITopic[]).map((item, index) => (
                <div key={index} className="col-span-1">
                  <TopicModal
                    image={item.image}
                    title={item.title}
                    color={item.color}
                    tags={item.tags}
                    topicId={item._id}
                    reRenderFunc={fetchTopics}
                  />
                </div>
              ))
            )}
            <CreateTopic />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

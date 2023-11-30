import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { GoPencil } from 'react-icons/go';
import { BsTrashFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import LinkInsert from './LinkInsert'; // Replace with the actual path to your LinkInsert component
import { apiBaseUrl } from '@/data/constants';

// import styles from '@/components/UI/TopicItem.css';
import Link from '../../data/LinkModel';
import SubTopic from '@/data/SubTopic';
import { set } from 'mongoose';

interface Props {
  title: string;
  color: string;
  subtopicID: string;
}

export default function TopicItem({ title, color, subtopicID }: Props) {
  // keep in mind use state requires use client on the page or component that uses it!
  // console.log('topicItem subtopic ID: ', subtopicID);
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  const [links, setLinks] = useState<Link[]>([]); // State to store the fetched links

  const cardRef = useRef<HTMLDivElement>(null);
  const gradientColors = 'from-byzantium via-byzantium to-palePurple';

  function resize() {
    // Calculate the content height when the card is opened
    if (isOpen && cardRef.current) {
      const contentWrapper = cardRef.current.querySelector('#contentWrapper');
      if (contentWrapper) {
        console.log('setting height to: ', contentWrapper.scrollHeight);
        setContentHeight(contentWrapper.scrollHeight); // scroll height gives height even if content is hidden
      }
    } else {
      // Reset the content height when the card is closed
      setContentHeight(null);
    }
  }

  //resise when open or closing
  useEffect(() => {
    resize();
  }, [isOpen]);

  async function fetchLinks() {
    console.log('getting links for: ', subtopicID);
    try {
      const response = await fetch(`${apiBaseUrl}/link/${subtopicID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const fetchedLinks: Link[] = await response.json();
      console.log('fetched links: ', fetchedLinks);
      setLinks(fetchedLinks); // Update the state with the fetched links
      if (isOpen) {
        setTimeout(() => {
          if (isOpen) {
            console.log(isOpen);
            resize(); // Call the resize function after half a second (500 milliseconds)
          }
        }, 100); // delay to make sure it resizes
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors here
    }
  }
  useEffect(() => {
    if (isOpen) {
      // Call the fetchLinks function when the component mounts
      fetchLinks();
    }
  }, [isOpen]); // Only fetch links when the is open is true

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // custom css style for the height of a card (little impossible to do with tailwind)
  const contentStyle = {
    maxHeight: contentHeight !== null ? `${contentHeight}px` : '0', // Use calculated height or 0 if closed
    overflow: 'hidden',
    transition: 'max-height 0.4s ease', // change value to affect the content drop speed
  };
  // color = 'blue';

  const [isLinkInsertVisible, setLinkInsertVisible] = useState(false);

  // Function to toggle the visibility of the LinkInsert component
  interface LinkType {
    text: string;
    type: string;
    url: string;
  }
  const toggleLinkInsert = () => {
    // if (isOpen && cardRef.current) {
    //   const contentWrapper = cardRef.current.querySelector('#contentWrapper');
    //   if (contentWrapper) {
    //     setContentHeight(contentWrapper.scrollHeight); // scroll height gives height even if content is hidden
    //   }
    // }
    setLinkInsertVisible(!isLinkInsertVisible);
    setTimeout(() => {
      resize(); // Call the resize function after half a second (500 milliseconds)
    }, 100);
  };

  // Function to handle link insertion
  const handleLinkInsert = (link: LinkType) => {
    // Close the LinkInsert component after insertion
    fetchLinks();
    setLinkInsertVisible(false);
  };

  return (
    <div ref={cardRef} className={`w-full mb-4 ${gradientColors}`}>
      <div
        id="header"
        className={` text-center text-white text-lg font-bold p-4 cursor-pointer hover:byzantium rounded-t-lg transition-all
        ${
          !isOpen
            ? 'rounded-b-lg transition-rounded duration-300 delay-300' // change value to affect radius delay and speed
            : ''
        }`} // remove border slowly when closed
        onClick={toggleOpen}
        style={{ backgroundColor: color }}
      >
        {title}
        <span id="arrowIcon" className="float-right">
          {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
        </span>
      </div>
      <div
        id="contentWrapper"
        className={` border-l-4 border-r-4 pl-3 pr-3 rounded-b-lg border-byzantium border-r-plum bg-gradient-to-r from-lightPurple to-lightPurple 
        ${
          isOpen ? 'border-b-4 transition-border duration-300 delay-1000' : '' // currently does not seem to be working trying to slowly remove the bottom border
        }`}
        style={contentStyle}
      >
        {links.map(
          (
            link,
            index // dynamically add link text, url and image
          ) => (
            <div
              id="linksIcoWrapper"
              key={index}
              className="flex text-center p-auto"
            >
              <Image
                src={`/icons/${link.type}.png`}
                alt={`${link.type}`}
                width={20}
                height={20}
                className="mt-3 w-5 h-5"
              />
              <a
                className={`  p-2 text-byzantium underline font-extrabold hover:text-darkBlue transition-colors duration-300`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
              <GoPencil
                style={{ fontSize: '20 px' }}
                className="mt-2"
              ></GoPencil>
            </div>
          )
        )}

        {/* Render the LinkInsert component conditionally */}
        {isLinkInsertVisible && (
          <LinkInsert onInsert={handleLinkInsert} parentID={subtopicID} />
        )}

        <div className="m-2 text-center">
          <button
            type="button"
            className="bg-blue pr-4 pl-4 pt-1 pb-1 mr-1 rounded-md text-white hover:bg-skyMagenta hover:text-palePurple"
            onClick={toggleLinkInsert}
          >
            <AiOutlinePlus style={{ fontSize: '32px' }} />
          </button>
          <button
            type="button"
            className="bg-byzantium pr-4 pl-4 pt-1 pb-1 ml-1 rounded-md text-white hover:bg-skyMagenta hover:text-palePurple"
          >
            <BsTrashFill style={{ fontSize: '32px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

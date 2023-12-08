import React, { useState, useEffect } from 'react';
import { apiBaseUrl } from '@/data/constants';

// Assuming you have a Link interface defined similar to the one you provided for LinkInsert

interface Link {
  _id: string;
  type: string;
  url: string;
  text: string;
  parentID: string;
}

interface LinkUpdateProps {
  onUpdate: (link: Link) => void;
  link: Link; // The existing link data to update
}

const LinkUpdate: React.FC<LinkUpdateProps> = ({ onUpdate, link }) => {
  const [selectedType, setSelectedType] = useState<string>(link.type);
  const [url, setUrl] = useState<string>(link.url);
  const [text, setText] = useState<string>(link.text);

  useEffect(() => {
    setSelectedType(link.type);
    setUrl(link.url);
    setText(link.text);
  }, [link]); // Update the form fields when the link data changes

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('updating link via ', `${apiBaseUrl}/link/${link._id}`);
    if (selectedType !== 'text' && !isValidUrl(url)) {
      alert('Invalid URL. Please provide a valid URL.');
      return;
    }

    const updatedLinkData = {
      type: selectedType,
      url: selectedType === 'text' ? '' : url,
      text: text,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/link/${link._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLinkData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      // Assuming the server responds with the updated link data, you can parse the response JSON
      const updatedLink = await response.json();

      // Call the onUpdate callback with the updated link
      onUpdate(updatedLink);
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors here
    }
  };

  async function deleteLink() {
    try {
      const response = await fetch(`${apiBaseUrl}/link/${link._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      } else {
        alert('link deleted');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors here
    }
  }

  const isValidUrl = (str: string) => {
    return str.startsWith('http') || str.startsWith('https');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Link</h2>
      <div className="mb-4">
        <label className="block mb-1">Select Link Type:</label>
        <select
          className="w-full py-2 px-3 border rounded"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="youtube">YouTube</option>
          <option value="link">URL</option>
          <option value="txt">Text</option>
          <option value="pdf">PDF</option>
        </select>
      </div>
      {
        <div className="mb-4">
          <label className="block mb-1">Enter URL:</label>
          <input
            placeholder="url for your content"
            type="text"
            className="w-full py-2 px-3 border rounded"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
      }

      <div className="mb-4">
        <label className="block mb-1">Enter Text:</label>
        <input
          placeholder="descriptive line for url"
          type="text"
          className="w-full py-2 px-3 border rounded"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      <button
        className="bg-plum m-1 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        onClick={handleSubmit}
      >
        Update Link
      </button>
      <button
        className="bg-plum m-1 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        onClick={deleteLink}
      >
        Delete Link
      </button>
    </div>
  );
};

export default LinkUpdate;

import React, { useState } from 'react';
import { apiBaseUrl } from '@/data/constants';

interface Link {
  type: string;
  url: string;
  text: string;
  parentID: string;
}

interface LinkInsertProps {
  onInsert: (link: Link) => void;
  parentID: string;
}

const LinkInsert: React.FC<LinkInsertProps> = ({ onInsert, parentID }) => {
  const [selectedType, setSelectedType] = useState<string>('youtube');
  const [url, setUrl] = useState<string>('');
  const [text, setText] = useState<string>('');

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
    console.log('posting to ', `${apiBaseUrl}/link`);
    if (selectedType !== 'text' && !isValidUrl(url)) {
      alert('Invalid URL. Please provide a valid URL.');
      return;
    }

    const linkData = {
      type: selectedType,
      url: selectedType === 'text' ? '' : url,
      text: text,
      parentID: parentID, // Include the parentID in the link data
    };
    console.log('body', linkData);

    try {
      const response = await fetch(`${apiBaseUrl}/link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      // Assuming the server responds with the newly created link data, you can parse the response JSON
      const newLink = await response.json();

      // Call the onInsert callback with the newly created link
      onInsert(newLink);

      // Reset form fields
      setSelectedType('youtube');
      setUrl('');
      setText('');
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors here
    }
  };

  const isValidUrl = (str: string) => {
    return str.startsWith('http') || str.startsWith('https');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Insert a Link</h2>
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
            placeholder="content url"
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
          placeholder="descriptive line url"
          type="text"
          className="w-full py-2 px-3 border rounded"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      <button
        className="bg-plum text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        onClick={handleSubmit}
      >
        Insert Link
      </button>
    </div>
  );
};

export default LinkInsert;

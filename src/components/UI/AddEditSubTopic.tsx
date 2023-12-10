import { useState } from 'react';
import { MdDelete, MdSave } from 'react-icons/md';

export interface AddSubTopicProps {
  parentTopicID: string;
  reRenderFunc: () => void;
  subTopicID: string;
  subTopicModel: SubTopicModel;
  onSave: () => void; // Add onSave prop
}

interface SubTopicModel {
  title: string;
  description: string;
  color: string;
}

export default function AddEditSubTopic({
  parentTopicID,
  reRenderFunc,
  subTopicID = '',
  subTopicModel = {
    title: '',
    description: '',
    color: '',
  },
  onSave, // Receive onSave prop
}: AddSubTopicProps) {
  const isEdit = subTopicID !== '';
  const [subTopic, setSubTopic] = useState(subTopicModel);

  async function create() {
    const url = `/api/topic/${parentTopicID}/sub-topic`;
    const options = {
      method: 'post',
      body: JSON.stringify({ ...subTopic, parentTopicID }),
    };
    const response = await fetch(url, options);

    if (response.ok) {
      reRenderFunc();
      onSave(); // Call onSave when the save is successful
    } else {
      console.error('Unable to create');
    }
  }

  async function update() {
    const url = `/api/topic/${parentTopicID}/sub-topic/${subTopicID}`;
    const options = {
      method: 'put',
      body: JSON.stringify({ ...subTopic, parentTopicID }),
    };
    const response = await fetch(url, options);

    if (response.ok) {
      reRenderFunc();
      onSave(); // Call onSave when the save is successful
    } else {
      console.error('Unable to update');
    }
  }

  async function deleteSubTopic() {
    const url = `/api/topic/${parentTopicID}/sub-topic/${subTopicID}`;
    const options = {
      method: "delete"
    }
    const response = await fetch(url, options);

    if (response.ok) {
      reRenderFunc();
      onSave();
    } else {
      console.error('Unable to delete');
    }
  }

  return (
    <div className="max-w-[288px]">
      <div className="text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3">
        <label htmlFor="title" className="mt-auto mb-auto">
          Title
        </label>
        <input
          placeholder="example title"
          type="text"
          name="title"
          id="title"
          onChange={ev => {
            setSubTopic({
              title: ev.target.value,
              description: subTopic.description,
              color: subTopic.color,
            });
          }}
          defaultValue={subTopic.title}
          className="rounded-md border-byzantium border-2 p-2 w-60 sm:w-56 sm:max-w-[256px]"
        />
      </div>
      <div className="text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3">
        <label htmlFor="color" className="mt-auto mb-auto">
          Color
        </label>
        <input
          placeholder="blue or #123456"
          type="text"
          name="color"
          id="color"
          onChange={ev => {
            setSubTopic({
              title: subTopic.title,
              description: subTopic.description,
              color: ev.target.value,
            });
          }}
          defaultValue={subTopic.color}
          className="rounded-md border-byzantium border-2 p-2 w-60 sm:w-56 sm:max-w-[256px]"
        />
      </div>
      <div className="text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3">
        <label htmlFor="description" className="mt-auto mb-auto">
          Desc
        </label>
        <input
          placeholder="a short description"
          type="text"
          name="description"
          id="description"
          onChange={ev => {
            setSubTopic({
              title: subTopic.title,
              description: ev.target.value,
              color: subTopic.color,
            });
          }}
          defaultValue={subTopic.description}
          className="rounded-md border-byzantium border-2 p-2 w-60 sm:w-56 sm:max-w-[256px]"
        />
      </div>
      <button
        type="button"
        style={{
          fontSize: '32px',
        }}
        onClick={isEdit ? update : create}
      >
        <MdSave className="text-plum" />
      </button>
      {isEdit && 
        <button 
        type="button" 
        style={{ fontSize: '32px' }} 
        onClick={deleteSubTopic}
        >
          <MdDelete />
        </button>
      }
    </div>
  );
}

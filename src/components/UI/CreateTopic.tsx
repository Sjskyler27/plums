import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { MdAddCircleOutline, MdClose, MdSave } from 'react-icons/md';

interface topicData {
  title: string;
  image: string;
  color: string;
  tags: any[];
}

export default function CreateTopic() {
  let defaultTopicData: topicData = {
    title: '',
    image: '',
    color: '',
    tags: ['default'],
  };
  const [open, setOpen] = useState(false);
  const [topicData, setTopicData] = useState(defaultTopicData);

  function toggleCreateDialog() {
    setOpen(!open);
  }

  async function createTopic() {
    const url = '/api/topic';
    const options = {
      method: 'POST',
      body: JSON.stringify(topicData),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      window.location.reload();
    } else {
      console.error('Unable to load data');
    }
  }

  return (
    <>
      <div className="col-span-1">
        <button
          type="button"
          style={{
            fontSize: '64px',
          }}
          onClick={toggleCreateDialog}
        >
          <MdAddCircleOutline className="text-plum" />
        </button>
      </div>
      <Dialog open={open} onClose={toggleCreateDialog}>
        <div className="p-4">
          <DialogTitle>Create Topic</DialogTitle>
          <DialogContent>
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
                  setTopicData({
                    title: ev.target.value,
                    image: topicData.image,
                    color: topicData.color,
                    tags: [],
                  });
                }}
                defaultValue={topicData.title}
                className="rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]"
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
                  setTopicData({
                    title: topicData.title,
                    image: topicData.image,
                    color: ev.target.value,
                    tags: [],
                  });
                }}
                defaultValue={topicData.color}
                className="rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]"
              />
            </div>
            <div className="text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3">
              <label htmlFor="image" className="mt-auto mb-auto">
                Image
              </label>
              <input
                placeholder="any image url"
                type="text"
                name="image"
                id="image"
                onChange={ev => {
                  setTopicData({
                    title: topicData.title,
                    image: ev.target.value,
                    color: topicData.color,
                    tags: [],
                  });
                }}
                defaultValue={topicData.image}
                className="rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <div className="w-full text-center">
              <button
                type="button"
                onClick={toggleCreateDialog}
                className="bg-blue pr-4 pl-4 pt-1 pb-1 mr-1 rounded-md text-white hover:bg-darkBlue hover:text-skyMagenta"
              >
                <MdClose style={{ fontSize: '32px' }} />
              </button>
              <button
                type="button"
                onClick={createTopic}
                className="bg-byzantium pr-4 pl-4 pt-1 pb-1 ml-1 rounded-md text-white hover:bg-skyMagenta hover:text-palePurple"
              >
                <MdSave style={{ fontSize: '32px' }} />
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

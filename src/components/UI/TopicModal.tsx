import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TopicItem from './TopicItem';
import TopicCard from './TopicCard';
import { ISubTopic } from '@/data/SubTopic';

interface Props {
  title: string;
  image: string;
  color: string;
  id: string;
  reRenderFunc: () => void
}

export default function TopicModal({ title, image, color, id, reRenderFunc }: Props) {
  const emptySubTopics: ISubTopic[] = [];
  const [subTopics, setSubTopics] = useState(emptySubTopics);
  const [open, setOpen] = useState(false);

  function openCloseFunc() {
    setOpen(!open);
  }

  useEffect(() => {
    async function getSubTopics() {
      let response = await fetch(`/api/sub-topic/${id}`);
      if (response.ok) {
        setSubTopics(await response.json());
      } else {
        console.log('Unable to get data');
      }
    }
    if (open) getSubTopics();
  }, [id, open]);

  return (
    <>
      <TopicCard
        title={title}
        img={image}
        color={color}
        id={id}
        openCloseFunc={openCloseFunc}
        reRenderFunc={reRenderFunc}
      />
      <Dialog open={open} onClose={openCloseFunc}>
        <DialogTitle className="text-lg font-bold" style={{ color: color }}>
          {title}
        </DialogTitle>
        <DialogContent>
          {subTopics.map((childTopic, index) => (
            // need to get links for child here using api
            <TopicItem
              key={index}
              title={childTopic.title}
              links={[]}
              color={childTopic.color}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <button type="button" onClick={openCloseFunc}>
            Close
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

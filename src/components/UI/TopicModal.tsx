import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useState } from 'react';
import TopicItem from './TopicItem';
import TopicCard from './TopicCard';
import TopicModel from '@/data/TopicModel';

interface Props {
  title: string;
  image: string;
  color: string;
  childTopics: TopicModel[]
}

export default function TopicModal({ title, image, color, childTopics }: Props) {
  const [open, setOpen] = useState(false);

  function openCloseFunc() {
    setOpen(!open);
  }

  return (
    <>
      <TopicCard
        title={title}
        img={image}
        openCloseFunc={openCloseFunc}
        color={color}
      />
      <Dialog open={open} onClose={openCloseFunc}>
        <DialogTitle className="text-lg font-bold" style={{ color: color }}>
          {title}
        </DialogTitle>
        <DialogContent>
          {
            childTopics.map((childTopic, index) => 
            <TopicItem key={index} title={childTopic.title} links={childTopic.linkList} color={childTopic.color} />)
          }
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

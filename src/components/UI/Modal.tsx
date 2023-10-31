import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { useState } from 'react';
import TopicItem from './TopicItem';
import { mathLinks } from '@/data/topicData';
import TopicCard from './TopicCard';
interface Props {
  title: string;
  image: string;
  color: string;
}

export default function Modal({ title, image, color }: Props) {
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
          MATHEMATICS
        </DialogTitle>
        <DialogContent>
          {/* loop */}
          <TopicItem title="Calculus" links={mathLinks} color="red" />
          <TopicItem title="triginometry" links={mathLinks} color="blue" />
          <TopicItem title="geometry" links={mathLinks} color="#897645" />

          <TopicItem title="Calculus" links={mathLinks} color="#342655" />
          <TopicItem title="triginometry" links={mathLinks} color="#567489" />
          <TopicItem title="geometry" links={mathLinks} color="#896754" />
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

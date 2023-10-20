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
}

export default function Modal({ title, image }: Props) {
  const [open, setOpen] = useState(false);

  function openCloseFunc() {
    setOpen(!open);
  }

  return (
    <>
      <TopicCard title={title} img={image} openCloseFunc={openCloseFunc} />
      <Dialog open={open} onClose={openCloseFunc}>
        <DialogTitle className="text-byzantium text-lg font-bold">
          MATHEMATICS
        </DialogTitle>
        <DialogContent>
          {/* loop */}
          <TopicItem title="Calculus" links={mathLinks} />
          <TopicItem title="triginometry" links={mathLinks} />
          <TopicItem title="geometry" links={mathLinks} />

          <TopicItem title="Calculus" links={mathLinks} />
          <TopicItem title="triginometry" links={mathLinks} />
          <TopicItem title="geometry" links={mathLinks} />
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

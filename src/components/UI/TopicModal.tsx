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
import { AddSubTopic } from './AddSubTopic';

interface Props {
  title: string;
  image: string;
  color: string;
  topicId: string;
  tags: any[];
  reRenderFunc: () => void;
}

export default function TopicModal({
  title,
  image,
  color,
  tags,
  topicId,
  reRenderFunc,
}: Props) {
  const emptySubTopics: ISubTopic[] = [];
  const [subTopics, setSubTopics] = useState(emptySubTopics);
  const [open, setOpen] = useState(false);

  function openCloseFunc() {
    setOpen(!open);
  }

  useEffect(() => {
    async function getSubTopics() {
      let response = await fetch(`/api/topic/${topicId}/sub-topic`);
      if (response.ok) {
        setSubTopics(await response.json());
      } else {
        console.log('Unable to get data');
      }
    }
    if (open) getSubTopics();
  }, [topicId, open]);

  return (
    <>
      <TopicCard
        title={title}
        img={image}
        color={color}
        tags={tags}
        id={topicId}
        openCloseFunc={openCloseFunc}
        reRenderFunc={reRenderFunc}
      />
      <Dialog open={open} onClose={openCloseFunc}>
        <DialogTitle className="text-lg font-bold" style={{ color: color }}>
          {title}
        </DialogTitle>
        <DialogContent>
          {subTopics.map((childTopic, index) => {
            return (
              <TopicItem
                key={index}
                childTopic={childTopic}
                reRenderFunc={async () => {
                  let response = await fetch(`/api/topic/${topicId}/sub-topic`);
                  if (response.ok) {
                    setSubTopics(await response.json());
                  } else {
                    console.log('Unable to get data');
                  }
                }}
              />
            );
          })}
          <AddSubTopic
            id={topicId}
            reRenderFunc={async () => {
              let response = await fetch(`/api/topic/${topicId}/sub-topic`);
              if (response.ok) {
                setSubTopics(await response.json());
              } else {
                console.log('Unable to get data');
              }
            }}
          />
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

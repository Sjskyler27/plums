import { useState } from 'react';
import { MdAddCircleOutline, MdClose } from 'react-icons/md';
import AddEditSubTopic from './AddEditSubTopic';

export interface AddSubTopicProps {
  id: string;
  reRenderFunc: () => void;
}

interface SubTopicModel {
  title: string;
  description: string;
  color: string;
}

export function AddSubTopic({ id, reRenderFunc }: AddSubTopicProps) {
  const defaultSubTopic: SubTopicModel = {
    title: '',
    description: '',
    color: '',
  };
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <button
        type="button"
        style={{
          fontSize: '32px',
        }}
        onClick={() => {
          setShowAdd(!showAdd);
        }}
      >
        {showAdd ? <MdClose /> : <MdAddCircleOutline className="text-plum" />}
      </button>
      {showAdd ? (
        <AddEditSubTopic
          parentTopicID={id}
          subTopicID=""
          subTopicModel={defaultSubTopic}
          reRenderFunc={() => {
            reRenderFunc();
            setShowAdd(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

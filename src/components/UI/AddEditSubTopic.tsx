import { useState } from "react";
import { MdSave } from "react-icons/md";

export interface AddSubTopicProps {
    parentTopicID: string
    reRenderFunc: () => void;
    subTopicID: string;
    subTopicModel: SubTopicModel;
}

interface SubTopicModel {
    title: string;
    description: string;
    color: string;
    parentTopicID: string;
}


export default function AddEditSubTopic({ parentTopicID, reRenderFunc, subTopicID = "", subTopicModel = {
    title: "",
    description: "",
    color: "",
    parentTopicID: parentTopicID
} }: AddSubTopicProps) {
    const isEdit = subTopicID !== "";
    const [subTopic, setSubTopic] = useState(subTopicModel);

    async function create() {
        const url = "/api/sub-topic/";
        const options = {
            method: "post",
            body: JSON.stringify(subTopic)
        };
        const response = await fetch(url, options);

        if (response.ok) {
            reRenderFunc();
        } else {
            console.error("Unable to create");
        }
    }

    async function update() {
        const url = `/api/sub-topic/${subTopicID}`;
        const options = {
            method: "put",
            body: JSON.stringify(subTopic)
        };
        const response = await fetch(url, options);

        if (response.ok) {
            reRenderFunc();
        } else {
            console.error("Unable to update")
        }
    }

    return (
        <div>
            <div className='text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3'>
              <label htmlFor="title" className='mt-auto mb-auto'>Title</label>
              <input 
                type="text"
                name="title" 
                id="title" 
                onChange={ev => {
                  setSubTopic({
                    title: ev.target.value,
                    description: subTopic.description,
                    color: subTopic.color,
                    parentTopicID: subTopic.parentTopicID
                  });
                }} 
                defaultValue={subTopic.title}
                className='rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]'/>
            </div>
            <div className='text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3'>
              <label htmlFor="color" className='mt-auto mb-auto'>Color</label>
              <input 
                type="text"
                name='color'
                id='color'
                onChange={ev => {
                    setSubTopic({
                        title: subTopic.title,
                        description: subTopic.description,
                        color: ev.target.value,
                        parentTopicID: subTopic.parentTopicID
                      });
                }} 
                defaultValue={subTopic.color}
                className='rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]'/>
            </div>
            <div className='text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3'>
              <label htmlFor="description" className='mt-auto mb-auto'>Description</label>
              <input 
                type="text"
                name="description"
                id="description"
                onChange={ev => {
                    setSubTopic({
                        title: subTopic.title,
                        description: ev.target.value,
                        color: subTopic.color,
                        parentTopicID: subTopic.parentTopicID
                      });
                }}
                defaultValue={subTopic.description}
                className='rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]'/>
            </div>
            <button 
                type="button"
                style={{
                    fontSize: '32px'
                }}
                onClick={isEdit ? update : create}
                >
                <MdSave />
            </button>
            </div>
    )
}
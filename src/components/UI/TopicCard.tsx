'use client';
import React, { useEffect, useState } from 'react';
import { MdMoreVert, MdClose, MdSave } from 'react-icons/md';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface TopicCardProps {
  title: string;
  img: string;
  color: string;
  id: string;
  openCloseFunc: () => void;
  reRenderFunc: () => void;
}

export default function TopicCard({
  title,
  img,
  color,
  id,
  openCloseFunc,
  reRenderFunc,
}: TopicCardProps) {
  const [editTitle, setEditTitle] = useState(title);
  const [editImg, setEditImg] = useState(img);
  const [editColor, setEditColor] = useState(color);
  const [update, setUpdate] = useState(false);

  const [editMenuActive, setEditMenuActive] = useState(false);
  const [open, setOpen] = useState(false);
  function toggleEditMenu() {
    setEditMenuActive(!editMenuActive);
  }
  function openCloseEdit() {
    setOpen(!open);
  }

  async function updateTopic() {
    const data = {
      title: editTitle,
      color: editColor,
      image: editImg,
    };

    const response = await fetch(`/api/topic/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      openCloseEdit();
      setUpdate(true);
    } else {
      console.error('Unable to load data');
    }
  }
  async function deleteTopicCard() {
    const response = await fetch(`/api/topic/${id}`, {
      method: 'delete',
    });

    if (response.ok) {
      alert('topic deleted');
      location.reload();
    } else {
      alert('Unable to delete data');
    }
  }

  useEffect(() => {
    const closeEditMenu = (e: MouseEvent) => {
      if (editMenuActive) {
        let menu = document.getElementById('edit-menu')!;
        let eventElem = (e.target as HTMLElement)!;
        if (!menu.contains(eventElem)) setEditMenuActive(!editMenuActive);
      }
    };

    document.addEventListener('click', closeEditMenu);
    return () => document.removeEventListener('click', closeEditMenu);
  }, [editMenuActive]);

  useEffect(() => {
    if (update) {
      reRenderFunc();
    }
    return () => setUpdate(false);
  }, [reRenderFunc, update]);

  return (
    <>
      <div className="grid grid-flow-row">
        <div className="w-full flex justify-end h-0 z-10">
          {editMenuActive ? (
            <div
              className="overflow-visible mt-[44px] mr-1 md:mt-0 md:mr-[-81px] w-auto"
              id="edit-menu"
            >
              <ul className="bg-palePurple p-3 rounded-lg shadow-lg">
                <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
                  <p onClick={openCloseEdit} className="cursor-pointer">
                    Edit
                  </p>
                </li>
                <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
                  <p onClick={deleteTopicCard} className="cursor-pointer">
                    Delete
                  </p>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="w-64">
          <div
            id="header"
            className="text-white text-lg font-bold w-full cursor-pointer rounded-lg"
            onClick={openCloseFunc}
            style={{ backgroundColor: color }}
          >
            <div className="flex justify-between pt-3 pb-3 leading-4">
              <p className="mt-auto mb-auto pl-2">{title}</p>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  toggleEditMenu();
                }}
              >
                <MdMoreVert style={{ fontSize: '32px' }} />
              </button>
            </div>
            <img
              src={img}
              alt={''}
              className="w-full h-44 overflow-hidden rounded-b-lg"
            />
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={openCloseEdit}>
        <div className="p-4">
          <DialogTitle>Edit {title}</DialogTitle>
          <DialogContent>
            <div className="text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3">
              <label htmlFor="title" className="mt-auto mb-auto">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={ev => {
                  setEditTitle(ev.target.value);
                }}
                defaultValue={editTitle}
                className="rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]"
              />
            </div>
            <div className="text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3">
              <label htmlFor="color" className="mt-auto mb-auto">
                Color
              </label>
              <input
                type="text"
                name="color"
                id="color"
                onChange={ev => {
                  setEditColor(ev.target.value);
                }}
                defaultValue={editColor}
                className="rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]"
              />
            </div>
            <div className="text-center sm:text-left sm:flex sm:justify-between mb-2 mt-2 gap-3">
              <label htmlFor="image" className="mt-auto mb-auto">
                Image
              </label>
              <input
                type="text"
                name="image"
                id="image"
                onChange={ev => {
                  setEditImg(ev.target.value);
                }}
                defaultValue={editImg}
                className="rounded-md border-byzantium border-2 p-2 w-full sm:w-56 sm:max-w-[256px]"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <div className="w-full text-center">
              <button
                type="button"
                onClick={openCloseEdit}
                className="bg-blue pr-4 pl-4 pt-1 pb-1 mr-1 rounded-md text-white hover:bg-darkBlue hover:text-skyMagenta"
              >
                <MdClose style={{ fontSize: '32px' }} />
              </button>
              <button
                type="button"
                onClick={updateTopic}
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

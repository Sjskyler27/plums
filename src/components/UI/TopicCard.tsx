'use client';
import React, { useEffect, useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface TopicCardProps {
  title: string;
  img: string;
  color: string;
  openCloseFunc: () => void;
}

export default function TopicCard({
  title,
  img,
  color,
  openCloseFunc,
}: TopicCardProps) {
  const [editMenuActive, setEditMenuActive] = useState(false);
  const [open, setOpen] = useState(false);
  function toggleEditMenu() {
    setEditMenuActive(!editMenuActive);
  }
  function openCloseEdit() {
    setOpen(!open);
  }

  useEffect(() => {
    const closeEditMenu = (e: MouseEvent) => {
      if (editMenuActive) {
        let menu = document.getElementById('edit-menu')!;
        let eventElem = (e.target as HTMLElement)!;
        if (!menu.contains(eventElem)) setEditMenuActive(!editMenuActive);
      }
    }

      document.addEventListener('click', closeEditMenu);
      return () => document.removeEventListener('click', closeEditMenu);
    }, [editMenuActive]);

  return (
    <>
    <div className='grid grid-flow-row'>
      <div className='w-full flex justify-end h-0 z-10'>
      { editMenuActive ? 
      <div className='overflow-visible mr-[-81px] w-auto' id="edit-menu">
        <ul className="bg-palePurple p-3 rounded-lg shadow-lg">
          <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
            <p onClick={openCloseEdit}>Edit</p>
          </li>
          <li className="text-center p-1 hover:bg-white rounded-md transition-colors duration-300">
            <a href="/examples">Delete</a>
          </li>
        </ul> 
      </div>
      : <></>}
      </div>
      <div className="w-64">
        <div
          id="header"
          className="text-white text-lg font-bold w-full cursor-pointer rounded-lg"
          onClick={openCloseFunc}
          style={{ backgroundColor: color }}
          >
          <div className='flex justify-between pt-3 pb-3 leading-4'>
            <p className="mt-auto mb-auto pl-2">{title}</p>
            <button type="button" onClick={e => {
              e.stopPropagation();
              toggleEditMenu();
            }}>
              <MdMoreVert style={{fontSize: '32px'}}/>
            </button>
          </div>
          <img src={img} alt={''} className="w-full h-44 overflow-hidden rounded-b-lg" />
        </div>
      </div>
    </div>
    <Dialog open={open} onClose={openCloseEdit} >
      <DialogTitle>Edit {title}</DialogTitle>
      <DialogContent>
        <div className='flex justify-between mb-2 mt-2'>
          <label htmlFor="title" className='pr-2'>Title</label>
          <input type="text" name="title" id="title" defaultValue={title} className='rounded-md border-byzantium border-2 pl-1'/>
        </div>
        <div className='flex justify-between mb-2 mt-2'>
          <label htmlFor="color" className='pr-2'>Color</label>
          <input type="text" name='color' id='color' defaultValue={color} className='rounded-md border-byzantium border-2 pl-1'/>
        </div>
        <div className='flex justify-between mb-2 mt-2'>
          <label htmlFor="image" className='pr-2'>Image Url</label>
          <input type="text" name="image" id="image" defaultValue={img} className='rounded-md border-byzantium border-2 pl-1'/>
        </div>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
</>
  );
}
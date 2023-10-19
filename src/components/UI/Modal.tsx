import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import TopicItem from "./TopicItem";
import { mathLinks } from "@/data/topicData";
import TopicCard from "./TopicCard";

export default function Modal() {
    const [open, setOpen] = useState(false);

    function openCloseFunc() {
        setOpen(!open);
    }

  return (
    <>
    <TopicCard title={"MATHEMATICS"} img={"/placeholder.jpeg"} openCloseFunc={openCloseFunc} />
    <Dialog open={open} onClose={openCloseFunc}>
        <DialogTitle>MATHEMATICS</DialogTitle>
        <DialogContent>
            {/* loop */}
            <TopicItem title="Calc" links={mathLinks}/>
        </DialogContent>
        <DialogActions>
            <button type="button" onClick={openCloseFunc}>Close</button>
        </DialogActions>
    </Dialog>
    </>
  )
}

"use client";
import EntryType from "@/app/types/enums/entryType";
import styles from "./entryItem.module.css";
import Entry from "@/app/types/models/entry";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface EntryItemProps {
  entry: Entry;
  refresh: Function;
}



const EntryItem: React.FC<EntryItemProps> = ({entry, refresh}) => {
  const iconMap: { [key in EntryType]: string } = {
    [EntryType.Food]: "fa-cutlery",
    [EntryType.Bathroom]: "fa-bomb",
    [EntryType.StomacheStart]: "fa-hourglass-start",
    [EntryType.StomacheEnd]: "fa-hourglass-end",
  };
  const iconClass = iconMap[entry.entryType];

  const colors: { [key in EntryType]: string } = {
    [EntryType.Food]: "rgb(76, 153, 31)",
    [EntryType.Bathroom]: "rgb(207, 133, 35)",
    [EntryType.StomacheStart]: "rgb(151, 55, 55)",
    [EntryType.StomacheEnd]: "rgb(151, 55, 55)",
  };
  const bgColor = colors[entry.entryType];

  const [openModal, setOpenModal] = useState(false);

  async function deleteEntry(){
        const response = await fetch("../api/entry/delete-entry", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry.id)
        })
        if (response.status === 200) {
            const json = await response.json();
            console.log(json)
            refresh();
            setOpenModal(false)
        } else {
            console.log(response);
        }
  }

  const modalTheme = {
      "root": {
    "base": "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    "show": {
      "on": "flex bg-black bg-opacity-40 dark:bg-opacity-80",
      "off": "hidden"
    }},
    "content": {
      "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-neutral-500 shadow text-white"
    },
  }

  return <div className={`${styles.entryItem}`} style={{backgroundColor: bgColor}}>
    <i className={`fa ${iconClass} p-3`}></i>
    <p className="flex-grow">{entry.name}</p>
    <p className="p-3">{entry.time.toTimeString().slice(0, -45)}</p>
    <i onClick={()=>{setOpenModal(true);}} className={`fa fa-times p-3`}></i>
    
    <Modal theme={modalTheme} className="pt-[250px]" size="md" position="center" show={openModal} onClose={() => setOpenModal(false)} popup>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-white">
              Are you sure you want to delete this entry?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => deleteEntry()}>
                {"Yes, I'm sure"}
              </Button>
              <Button className="bg-neutral-400 border-neutral-400" color="white" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  </div>
};

export default EntryItem;
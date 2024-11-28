"use client";
import { TextInput } from "flowbite-react";
import Header from "../header/header";
import TypePicker from "../typePicker/typePicker";
import { Button } from "flowbite-react";
import TextButton from "../buttons/textButton/textButton";

interface AddEntryProps {
    date: Date;
}

const AddEntry: React.FC<AddEntryProps> = ({date}) => {

  const inputTheme = {
    "base": "flex ",
    "field": {
      "input": {
        "colors": {
          "gray": "border-neutral-500 bg-neutral-500 focus:border-transparent focus:ring-transparent",
          "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
        },
      }
    }
  }

  function addEntry(){

  }


  return (
    <div className="h-full">
      <Header title="Add Entry"/>
      <div className="p-5">
        <div className="p-2">
          <h1>Name:</h1>
          <TextInput color="gray" theme={inputTheme}/>
        </div>
        <div className="p-2">
          <h1>Type:</h1>
          <TypePicker/>
        </div>
        <div className="p-2">
          <h1>Date:</h1>
          <TextInput theme={inputTheme} disabled={true} value={date.getUTCDate().toString().padStart(2, "0") + " " + date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }) + " " + date.getUTCFullYear()} />
        </div>
        <div onClick={()=>{addEntry()}} className="p-2">
          <TextButton text="Add Entry"/>
        </div>
      </div>
    </div>
  );
}

export default AddEntry;

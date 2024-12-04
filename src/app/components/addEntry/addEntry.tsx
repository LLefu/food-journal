"use client";
import { Spinner, TextInput } from "flowbite-react";
import Header from "../header/header";
import TypePicker from "../typePicker/typePicker";
import TextButton from "../buttons/textButton/textButton";
import { useEffect, useState } from "react";
import Entry from "@/app/types/models/entry";
import EntryType from "@/app/types/enums/entryType";
import Today from "../today/today";

interface AddEntryProps {
  date: Date;
  setPage: Function;
  setTitle: Function;
}

const AddEntry: React.FC<AddEntryProps> = ({ date, setPage, setTitle }) => {

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<EntryType>(EntryType.Food);
  const [hours, setHours] = useState<number | null>(date.getHours());
  const [minutes, setMinutes] = useState<number | null>(date.getMinutes());
  const [timeOut, setTimeOut] = useState(false);
  const [validation, setValidation] = useState(false);

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


  useEffect(() => {
    if (date.getHours() === 0) {
      setHours(new Date().getHours());
      setMinutes(new Date().getMinutes())
    }
    setTitle("Add Entry");
  }, [date]);

  function isValid(): boolean {
    if (!name.trim()) return false;

    if (hours === null || hours < 0 || hours > 23) return false;
    if (minutes === null || minutes < 0 || minutes > 59) return false;

    return true;
  }

  async function addEntry() {
    if (isValid()) {
      setTimeOut(true);
      const dateToAdd = new Date(date);
      dateToAdd.setHours(hours!);
      dateToAdd.setMinutes(minutes!);

      const entryToAdd: Entry = {
        name: name,
        entryType: type,
        time: new Date(dateToAdd),
        userId: "950295eb-bff1-4243-8680-537aa62860e8"
      }

      const response = await fetch("../api/entry/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entryToAdd)
      })
      if (response.status === 200) {
        setPage(<Today setTitle={setTitle} setPage={setPage} />)
      } else {
        console.log(response);
      }
    } else {
      setValidation(true);
    }
  }


  return (
    <div className="h-full">
      <form className="p-5">
        <div className="p-2">
          <h1>Name:</h1>
          <TextInput
            color={validation ? `${name == "" ? "failure" : "gray"}` : "gray"}
            theme={inputTheme}
            value={name}
            required
            onChange={(e) => { setName(e.target.value); setValidation(false) }}
            helperText={
              (validation && name.trim() === "") && <>
                Please fill this field!
              </>
            }
          />
        </div>
        <div className="p-2">
          <h1>Type:</h1>
          <TypePicker setType={setType} />
        </div>
        <div className="p-2">
          <h1>Time:</h1>
          <div className="flex items-center">
            <TextInput
              type="number"
              required
              value={hours !== null ? String(hours).padStart(2, "0") : ""}
              onChange={(e) => {
                const value = e.target.value;
                setHours(value === "" ? null : Number(value));
                setValidation(false);
              }}
              helperText={
                (validation && hours) && <>
                  Please fill this field!
                </>
              }
              color="gray"
              theme={inputTheme}
            />
            <p className="ps-4 pe-4 text-lg font-bold text-4xl">:</p>
            <TextInput
              type="number"
              required
              value={minutes !== null ? String(minutes).padStart(2, "0") : ""}
              onChange={(e) => {
                const value = e.target.value;
                setMinutes(value === "" ? null : Number(value));
                setValidation(false);
              }}
              helperText={
                (validation && minutes) && <>
                  Please fill this field!
                </>
              }
              color="gray"
              theme={inputTheme}
            />
          </div>
        </div>
        <div className="p-2">
          <h1>Date:</h1>
          <TextInput
            theme={inputTheme}
            disabled={true}
            required
            value={
              date
                .getDate()
                .toString()
                .padStart(2, "0") +
              " " +
              date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }) +
              " " +
              date.getUTCFullYear()
            }
          />
        </div>
        {timeOut &&
          <div className="flex justify-center pt-5">
            <Spinner />
          </div>
        }
        {!timeOut && <div onClick={addEntry} className="p-2">
          <TextButton text="Add Entry" />
        </div>}
      </form>
    </div>
  );
}

export default AddEntry;

"use client";
import EntryType from "@/app/types/enums/entryType";
import EntryItem from "./entryItem/entryItem";
import styles from "./entryList.module.css";
import Entry from "@/app/types/models/entry";
import AddEntry from "../addEntry/addEntry";
import { useEffect, useState } from "react";
import TextButton from "../buttons/textButton/textButton";
import { Spinner } from "flowbite-react";

interface EntryListProps {
    setPage: Function;
    date: Date;
    setTitle: Function;
}

const EntryList: React.FC<EntryListProps> = ({setPage, date, setTitle}) => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    async function getEntries() {
        const day = new Date(date);
        day.setHours(12);
        day.setMinutes(12);
        day.setSeconds(12);

        const userId = localStorage.getItem("userId")

        const response = await fetch("../api/entry/get-entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: day,
                userId: userId
            })
        })
        if (response.status === 200) {
            const json = await response.json();
            const parsedEntries = json.entries.map((entry: Entry) => ({
                ...entry,
                time: new Date(entry.time),
            }));
            setEntries(parsedEntries)
            setLoading(false);
        } else {
            console.log(response);
        }
    }
    
    useEffect(() => {
        getEntries();
    }, [])

  return( <div className={styles.entryList}>
      {loading && <div className="w-full pt-5 flex justify-center items-center">
                  <Spinner/>
              </div>}
    {!loading && <>{entries.map((entry, index) => (
          <EntryItem refresh={getEntries} key={index} entry={entry}/>
    ))}
    {entries.length < 1 && 
    <p className="pt-5">No entries yet</p>}</>}
    
    <div className="p-5 w-full" onClick={()=>{
        setPage(<AddEntry date={date} setPage={setPage} setTitle={setTitle} />)}}>
        <TextButton text="Add Entry"/>
    </div>
  </div>);
};

export default EntryList;
"use client";
import EntryType from "@/app/types/enums/entryType";
import EntryItem from "./entryItem/entryItem";
import styles from "./entryList.module.css";
import Entry from "@/app/types/models/entry";
import CircleButton from "../buttons/circleButton/circleButton";
import { useRouter } from "next/navigation";
import AddEntry from "../addEntry/addEntry";
import { useEffect, useState } from "react";


function isValidEntryType(value: any): value is EntryType {
    return Object.values(EntryType).includes(value);
}

interface EntryListProps {
    setPage: Function;
    date: Date;
}

const EntryList: React.FC<EntryListProps> = ({setPage, date}) => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const router = useRouter();

    async function getEntries() {
        const day = new Date(date);
        day.setUTCHours(0, 0, 0, 0);

        const response = await fetch("../api/entry/get-entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(day)
        })
        if (response.status === 200) {
            const json = await response.json();
            const parsedEntries = json.entries.map((entry: Entry) => ({
                ...entry,
                time: new Date(entry.time),
            }));
            setEntries(parsedEntries)
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        getEntries();
    }, [])

  return <div className={styles.entryList}>
    {entries.map((entry, index) => (
          <EntryItem key={index} entryType={entry.entryType} name={entry.name} time={entry.time.toLocaleTimeString()}/>
    ))}
    <div onClick={()=>{
        setPage(<AddEntry date={date} />)}}>
        <CircleButton icon="plus"/>
    </div>
  </div>;
};

export default EntryList;
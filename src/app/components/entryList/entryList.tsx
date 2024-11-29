"use client";
import EntryType from "@/app/types/enums/entryType";
import EntryItem from "./entryItem/entryItem";
import styles from "./entryList.module.css";
import Entry from "@/app/types/models/entry";
import CircleButton from "../buttons/circleButton/circleButton";
import { useRouter } from "next/navigation";
import AddEntry from "../addEntry/addEntry";
import { useEffect, useState } from "react";
import TextButton from "../buttons/textButton/textButton";
import { Spinner } from "flowbite-react";


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
    const [loading, setLoading] = useState(true);

    async function getEntries() {
        const day = new Date(date);
        day.setHours(0);
        day.setMinutes(0);
        day.setSeconds(0);

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
            setLoading(false);
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        getEntries();
    }, [])

    if(loading){
        return(
            <div className="w-full h-full flex justify-center items-center">
                <Spinner/>
            </div>
        )
    }

  return( <div className={styles.entryList}>
    {entries.map((entry, index) => (
          <EntryItem key={index} entryType={entry.entryType} name={entry.name} time={entry.time.toTimeString()}/>
    ))}
    {entries.length < 1 && 
    <p className="pt-5">No entries yet</p>}
    <div className="p-5 w-full" onClick={()=>{
        setPage(<AddEntry date={date} setPage={setPage} />)}}>
        <TextButton text="Add Entry"/>
    </div>
  </div>);
};

export default EntryList;
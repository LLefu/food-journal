"use client";
import EntryType from "@/app/types/enums/entryType";
import EntryItem from "./entryItem/entryItem";
import styles from "./entryList.module.css";
import Entry from "@/app/types/models/entry";
import CircleButton from "../buttons/circleButton/circleButton";
import { useRouter } from "next/navigation";
import AddEntry from "../addEntry/addEntry";

const entries : Entry[] = [
    {
        entryType: EntryType.Food,
        name: "Pears",
        time: "18:42"
    },
    {
        entryType: EntryType.StomacheStart,
        name: "Stomache Start",
        time: "18:52"
    },
    {
        entryType: EntryType.Bathroom,
        name: "Normal",
        time: "19:12"
    },
    {
        entryType: EntryType.StomacheEnd,
        name: "Stomache End",
        time: "19:20"
    }
]


interface EntryListProps {
    setPage: Function;
    date: Date;
}

const EntryList: React.FC<EntryListProps> = ({setPage, date}) => {

  const router = useRouter();

  return <div className={styles.entryList}>
    {entries.map((entry, index) => (
          <EntryItem key={index} entryType={entry.entryType} name={entry.name} time={entry.time}/>
    ))}
    <div onClick={()=>{setPage(<AddEntry date={date} />)}}>
        <CircleButton icon="plus"/>
    </div>
  </div>;
};

export default EntryList;
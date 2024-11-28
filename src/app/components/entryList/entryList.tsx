"use client";
import EntryType from "@/app/types/enums/entryType";
import EntryItem from "./entryItem/entryItem";
import styles from "./entryList.module.css";
import Entry from "@/app/types/models/entry";

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
}

const EntryList: React.FC<EntryListProps> = ({}) => {
  return <div className={styles.entryList}>
    {entries.map((entry, index) => (
          <EntryItem key={index} entryType={entry.entryType} name={entry.name} time={entry.time}/>
    ))}
  </div>;
};

export default EntryList;
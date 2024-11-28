"use client";
import EntryType from "@/app/types/enums/entryType";
import styles from "./entryItem.module.css";

interface EntryItemProps {
  entryType: EntryType;
  name: string;
  time: string;
}

const EntryItem: React.FC<EntryItemProps> = ({entryType, name, time}) => {
  const iconMap: { [key in EntryType]: string } = {
    [EntryType.Food]: "fa-cutlery",
    [EntryType.Bathroom]: "fa-bomb",
    [EntryType.StomacheStart]: "fa-hourglass-start",
    [EntryType.StomacheEnd]: "fa-hourglass-end",
  };
  const iconClass = iconMap[entryType];

  return <div className={`${styles.entryItem}`}>
    <i className={`fa ${iconClass} p-3`}></i>
    <p className="flex-grow">{name}</p>
    <p className="p-3">{time}</p>
  </div>;
};

export default EntryItem;
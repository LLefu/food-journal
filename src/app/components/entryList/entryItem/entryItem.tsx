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

  const colors: { [key in EntryType]: string } = {
    [EntryType.Food]: "rgb(76, 153, 31)",
    [EntryType.Bathroom]: "rgb(207, 133, 35)",
    [EntryType.StomacheStart]: "rgb(151, 55, 55)",
    [EntryType.StomacheEnd]: "rgb(151, 55, 55)",
  };

  const bgColor = colors[entryType];

  return <div className={`${styles.entryItem}`} style={{backgroundColor: bgColor}}>
    <i className={`fa ${iconClass} p-3`}></i>
    <p className="flex-grow">{name}</p>
    <p className="p-3">{time.slice(0, -45)}</p>
  </div>;
};

export default EntryItem;
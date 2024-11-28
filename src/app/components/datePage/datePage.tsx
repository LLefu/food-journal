"use client";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface DatePageProps {
    date: Date;
    setPage: Function;
}

const DatePage: React.FC<DatePageProps> = ({date, setPage}) => {
  return <div>
    <Header title={date.getUTCDate().toString().padStart(2, "0") + " " + date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }) + " " + date.getUTCFullYear()}/>
    <div>
        <EntryList date={date} setPage={setPage}/>
    </div>
  </div>;
};

export default DatePage;
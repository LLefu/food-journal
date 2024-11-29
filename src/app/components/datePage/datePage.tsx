"use client";
import CircleButton from "../buttons/circleButton/circleButton";
import EntryList from "../entryList/entryList";
import Header from "../header/header";

interface DatePageProps {
    date: Date;
    setPage: Function;
}

const DatePage: React.FC<DatePageProps> = ({date, setPage}) => {
  return <div className="flex flex-col items-center pt-4">
    <p>{date.toDateString()}</p>
    <div className="w-full">
        <EntryList date={date} setPage={setPage}/>
    </div>
  </div>;
};

export default DatePage;
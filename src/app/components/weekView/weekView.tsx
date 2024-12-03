import Entry from "@/app/types/models/entry";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import styles from "./weekView.module.css";

interface WeekViewProps {
    setDate: Function;
}

function getWeekDays(current: Date) {
    var week = []; 
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() +1);
    }
    return week; 
}


const WeekView: React.FC<WeekViewProps> = ({setDate}) => {
    const [weekEntries, setWeekEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);
    
    async function getWeekEntries(){
            const weekDays = getWeekDays(new Date());
            const requestBody = {
                start: weekDays[0],
                end: weekDays[6]
            }
    
            const response = await fetch("../api/entry/get-entries-week", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            if (response.status === 200) {
                const json = await response.json();
                const parsedEntries: Entry[] = json.entries.map((entry: Entry) => ({
                    ...entry,
                    time: new Date(entry.time),
                }));
                setWeekEntries(parsedEntries);
                setLoading(false);
            } else {
                console.log(response);
            }
    }

    useEffect(()=>{
        getWeekEntries()
    }, [])

  return <div>
    {loading && <div className="w-full pt-3 flex justify-center items-center">
                  <Spinner/>
    </div>}
    <div className="w-full">
    {!loading && <div className="m-10 mt-5 mb-5 flex justify-between">{getWeekDays(new Date).map((day, index) => {

        const isStomacheEntry = weekEntries.some(
            (entry) => entry.time.toDateString() === day.toDateString()
        );

        return <div onClick={()=>{setDate(day)}} className="flex flex-col items-center" key={index}>
            <div className={`${isStomacheEntry ? styles.isDanger : styles.isPositive}`}/>
            <p className="pt-2">{day.toDateString().slice(0, -12)}</p>
        </div>
    })}
    </div>}
    </div>
    </div>
};

export default WeekView;
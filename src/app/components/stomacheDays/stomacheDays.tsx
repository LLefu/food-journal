import { useEffect, useState } from "react";
import Entry from "@/app/types/models/entry";
import { Spinner } from "flowbite-react";

interface StomacheDaysProps {
    setDate: Function;
}
const StomacheDays: React.FC<StomacheDaysProps> = ({setDate}) => {
    const [stomacheDays, setStomacheDays] = useState<Entry[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        async function getStomacheDays(){
            const userId = localStorage.getItem("userId")

            const response = await fetch("../api/entry/get-stomache-days", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId
                })
            })
            if (response.status === 200) {
                const json = await response.json();
                const parsedEntries = json.entries.map((entry: Entry) => ({
                    ...entry,
                    time: new Date(entry.time),
                }));
                setStomacheDays(parsedEntries);
                setLoaded(true);
            } else {
                console.log(response);
            }
        }    
        getStomacheDays()
    },[])

  return <div className="p-4" >
    {loaded && <div>
        <div className="ps-5 flex flex-wrap justify-start">
        {stomacheDays.map((entry: Entry, index) => (
            <div onClick={()=>{setDate(entry.time)}} className="w-12 text-center h-8 bg-red-500 rounded pt-1 pb-1 pe-1 m-1 mt-3" key={index}>
                {entry.time.getDate()}/{entry.time.getMonth() + 1}
            </div>
        ))}
        </div>
    </div>}
    {!loaded &&
    <div className="flex justify-center">
        <Spinner/>
    </div>
    }
  </div>;
};

export default StomacheDays;
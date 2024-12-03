import EntryType from "../enums/entryType";
import User from "./user";

interface Entry {
    id?: String;
    entryType: EntryType;
    name: string;
    time: Date;
    userId?: String;
    User?: User;
}

export default Entry;

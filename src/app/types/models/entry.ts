import EntryType from "../enums/entryType";

interface Entry {
    entryType: EntryType;
    name: string;
    time: Date;
    userId: String;
}

export default Entry;
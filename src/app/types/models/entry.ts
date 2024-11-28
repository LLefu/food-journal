import EntryType from "../enums/entryType";

interface Entry {
    entryType: EntryType;
    name: string;
    time: Date;
}

export default Entry;
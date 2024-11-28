import EntryType from "../enums/entryType";

interface Entry {
    entryType: EntryType;
    name: string;
    time: string;
}

export default Entry;
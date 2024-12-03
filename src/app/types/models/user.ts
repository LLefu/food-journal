import Entry from "./entry";

interface User {
    id: String 
    username: String 
    password: String
    entries: Entry[]
}

export default User;

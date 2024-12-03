"use client";
import TextButton from "@/app/components/buttons/textButton/textButton";
import { Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function login() {
        setLoading(true);
        const response = await fetch("../api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        if (response.status === 200) {
            const user = await response.json()
            localStorage.setItem('userId', user);
            router.push(`/`);        
        } else {
            alert("Something went wrong");
        }
    }

  return (
    <div className="h-full flex flex-col p-14 justify-center">
      <div className="pb-5">
        <h1>Username:</h1>
        <TextInput
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          placeholder="Enter your username"
        />
      </div>
      <div className="pb-8">
        <h1>Password:</h1>
        <TextInput
          type="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value);}}
          placeholder="Enter your password"
        />
      </div>
      {loading &&   <div className="w-full flex justify-center items-center">
                <Spinner/>
            </div>}
      {!loading && <div onClick={()=>{login()}} className="pb-16">
        <TextButton text="Login" />
       </div>}
    </div>
  );
};

export default Login;

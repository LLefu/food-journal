"use client";
import TextButton from "@/app/components/buttons/textButton/textButton";
import { Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState("")
  const router = useRouter();

  function isValid(): boolean {
    if (!username.trim()) return false;
    if (!password.trim()) return false;
    return true;
  }

  async function login() {

    if (!isValid()) {
      setValidation(true);
      return;
    }


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
      localStorage.setItem('userId', user.id.id);
      router.push(`/`);
    } else {
      if (response.status == 404) setError("Incorrect login")
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex flex-col p-14 justify-center">
      <div className="pb-5">
        <h1>Username:</h1>
        <TextInput
          value={username}
          color={validation && username.trim() === "" ? "failure" : "gray"}
          onChange={(e) => { setUsername(e.target.value); setValidation(false); setError("");}}
          placeholder="Enter your username"
          helperText={
            (validation && username.trim() === "") && <>
              Please fill this field!
            </>
          }
        />
      </div>
      <div className="pb-8">
        <h1>Password:</h1>
        <TextInput
          type="password"
          value={password}
          color={validation && password.trim() === "" ? "failure" : "gray"}
          onChange={(e) => { setPassword(e.target.value); setValidation(false); setError("");}}
          placeholder="Enter your password"
          helperText={
            (validation && password.trim() === "") && <>
              Please fill this field!
            </>
          }
        />
        <p className="text-red-500 pt-2">{error}</p>
      </div>
      {loading && <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>}
      {!loading && <div onClick={() => { login() }} className="pb-16">
        <TextButton text="Login" />
      </div>}
    </div>
  );
};

export default Login;

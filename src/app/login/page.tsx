"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSignin = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/users/login", user);
      console.log(res.data);
      if (res.data.success) {
        router.push("/dashboard");
      }
    }catch(error:any){
      console.log(error);

    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Sign In"}</h1>
      <hr />

      <label className="m-2" htmlFor="email">
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
        type="text"
        id="email"
        value={user.email}
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label className="m-2" htmlFor="password">
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
        type="password"
        id="password"
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <br />
      <button
        onClick={handleSignin}
        className="p-2 border border-gray-300 rounded-lg  text-white"
      >
        Login Here{" "}
      </button>

      <Link className="m-4 underline" href="/signup">
        Visit Signup Page
      </Link>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    
  });

  const handleSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
     
      

      <label className="m-2" htmlFor="email">
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
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
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
        type="password"
        id="password"
        value={user.password}
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <br />
      <button
        onClick={handleSignup}
        className="p-2 border border-gray-300 rounded-lg  text-white"
      >
        Login Here{" "}
      </button>

      <Link className="m-4 underline" href="/signup">Visit Signup Page</Link>
        
    </div>
  );
}

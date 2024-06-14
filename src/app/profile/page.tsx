"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState("nothing");
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  const getDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUserData(res.data.data._id);
    } catch (error: any) {
      console.log(error);
    }
  }

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
        <h2>{userData=="nothing" ? "No User Data": <Link href={`/profile/${userData}`}>{userData}</Link>}</h2>
      <hr />
      <button
        onClick={handleLogout}
        className="p-2 bg-cyan-400 rounded-lg hover:bg-blue-300"
      >
        Logout
      </button>
      <button
        onClick={getDetails}
        className="p-2 m-2 bg-green-400 rounded-lg hover:bg-blue-300"
      >
        Get User Details
      </button>
    </div>
  );
}

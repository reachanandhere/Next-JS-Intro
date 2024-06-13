"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");

      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />

      <hr />
      <button
        onClick={handleLogout}
        className="p-2 bg-cyan-400 rounded-lg hover:bg-blue-300"
      >
        Logout
      </button>
    </div>
  );
}

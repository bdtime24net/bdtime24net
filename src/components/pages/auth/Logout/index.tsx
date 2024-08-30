"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the authToken from localStorage
    localStorage.removeItem("authToken");

    // Redirect to the sign-in page
    router.push("/auth/signin");
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold my-4">Logout</h1>
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;

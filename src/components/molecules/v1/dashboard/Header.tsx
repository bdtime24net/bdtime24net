"use client";

import {
  Bars3BottomLeftIcon,
  BellIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/16/solid";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
  role: string;
}

export default function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve the token from local storage (or wherever you store it)
    const token = localStorage.getItem("authToken");
    if (token) {
      // Decode the token without verifying the signature
      const decodedToken = jwt.decode(token) as User | null;
      setUser(decodedToken);
    }
  }, []);

  return (
    <header className=" shadow fixed top-0 inset-x-0 lg:pl-64">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center">
              <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 p-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="ml-6 flex items-center space-x-4">
            <button
              type="button"
              className="p-1 border border-transparent rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Notifications</span>
            </button>
            {user && (
              <div className="flex items-center space-x-2">
                <h1 className="text-gray-700">{user.username}</h1>
                <picture>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://cdn.jugantor.com/assets/news_photos/2025/02/09/IJTEMA-67a8688c2cacf.jpg"
                    alt=""
                  />
                </picture>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

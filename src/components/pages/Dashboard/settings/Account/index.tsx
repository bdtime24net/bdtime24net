"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const Account = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4 mt-14">Account</h1>
      {user.fullname} ({user.username})
      <p className="text-center text-gray-500 mt-3">{user.email}</p>
      <p className="text-center text-gray-500 mt-3">{user.role}</p>
      <p className="text-center text-gray-500 mt-3">{user.bio}</p>
      <p className="text-center text-gray-500 mt-3">{user.location}</p>
      <p className="text-center text-gray-500 mt-3">{user.website_url}</p>
    </div>
  );
};

export default Account;

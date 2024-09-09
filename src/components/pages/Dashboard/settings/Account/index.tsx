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
      {user.username}
    </div>
  );
};

export default Account;

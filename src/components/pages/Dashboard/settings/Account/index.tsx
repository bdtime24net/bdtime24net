"use client";
import React, { use } from "react";
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
      {user.email}
      {user.role}
      {
        user.role === "admin" ? <h1>Admin</h1> : <h1>User</h1>
      }

      {
        user.email ? <h1>Email Verified</h1> : <h1>Email Not Verified</h1>
      }
    </div>
  );
};

export default Account;

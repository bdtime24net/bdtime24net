"use client";
import React from "react";
import { useUser } from "@/hooks/useUser";

const Account = () => {
  const { user, loading, error } = useUser();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!user) return <p>No user data found</p>;
  return (
    <div>
      <h1>Account</h1>
      {user.fullname} ({user.username})
    </div>
  );
};

export default Account;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold my-4 mt-14">Profile</h1>
      <div>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;

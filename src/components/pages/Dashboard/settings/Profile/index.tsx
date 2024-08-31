"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/auth/signin");
    return null;
  }
  return (
    <div className="p-4">
      <div className="max-w-md mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={user.avatar_url}
              alt={user.fullname}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {user.role}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {user.fullname} ({user.username})
            </h1>
            <p className="mt-2 text-gray-500">
              {user.bio || "No bio available"}
            </p>
            <div className="mt-4">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {user.location || "No location available"}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={user.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {user.website_url}
                </a>
              </p>
              <p>
                <strong>Followers:</strong> {user.followers}
              </p>
              <p>
                <strong>Following:</strong> {user.following}
              </p>
              <div className="mt-4">
                <a
                  href={user.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>
                <span> | </span>
                <a
                  href={user.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

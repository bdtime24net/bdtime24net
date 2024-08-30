import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface UserProfile {
  fullname: string;
  username: string;
  email: string;
  role: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  location: string;
  linkedin_url: string;
  twitter_url: string;
  website_url: string;
  followers: string;
  following: string;
}

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setLoading(false);
          return;
        }

        const decodedToken: any = jwt.decode(authToken);

        const response = await fetch(
          "https://message-aether.onrender.com/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData: UserProfile = await response.json();
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

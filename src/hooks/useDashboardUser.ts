import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface UserDashboard {
  fullname: string;
  username: string;
  email: string;
  role: string;
  avatar_url: string;
  // Add other user fields as needed
}

interface DecodedToken {
  exp: number;
  iat: number;
  // Add other fields from the token if necessary
}

export function useDashboardUser() {
  const [user, setUser] = useState<UserDashboard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          router.push("/auth/signin");
          return;
        }

        const decodedToken: DecodedToken = jwt.decode(
          authToken
        ) as DecodedToken;

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("authToken");
          router.push("/auth/signin");
          return;
        }

        const response = await fetch(
          `${NEXT_PUBLIC_API_URL}/user/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData: UserDashboard = await response.json();
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
        localStorage.removeItem("authToken");
        router.push("/auth/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return { user, loading, error };
}

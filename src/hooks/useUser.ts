import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";


interface UserProfile {
  username: string;
  email: string;
  role: string;
}

interface DecodedToken extends UserProfile {
  exp: number;
  iat: number;
}

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setLoading(false);
          router.push("/auth/signin");
          return;
        }

        const decodedToken = jwt.decode(authToken) as DecodedToken;
        
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("authToken");
          router.push("/auth/signin");
          return;
        }

        // Set user data from the token directly
        setUser({
          username: decodedToken.username,
          email: decodedToken.email,
          role: decodedToken.role,
        });
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

// src/hooks/useSignInFetchData.ts
import { useState } from "react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;


const useSignInFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("Invalid email or password");
      }

      // Save the token to local storage or context
      localStorage.setItem("authToken", data.token);

      return data.token;
    } catch (err) {
      console.error(err);
      setError("Failed to sign in");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};

export default useSignInFetchData;

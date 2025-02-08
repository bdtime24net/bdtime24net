// hooks/useSignupFetchData.ts
import { useState } from "react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string; 

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

const useSignupFetchData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (formData: SignupFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Signup URL:", NEXT_PUBLIC_API_URL);

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      // Process response data as needed
      return data;
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
      throw error; // Rethrow to be handled by the component if needed
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};

export default useSignupFetchData;

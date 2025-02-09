"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { Button, notification } from "antd";
import Link from "next/link";

interface SignInForm {
  email: string;
  password: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const signInFetcher = async (_: string, { arg }: { arg: SignInForm }) => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
};

const AuthSignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>();
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(`${NEXT_PUBLIC_API_URL}/auth/signin`, signInFetcher);

  const onSubmit = async (data: SignInForm) => {
    try {
      const result = await trigger(data);
      localStorage.setItem("authToken", result.token);

      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
      });

      router.push("/dashboard");
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: (error as Error).message || "An error occurred",
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link href="/auth/forgot-password" className="text-sm text-blue-500 hover:text-blue-800">
            Forgot password?
          </Link>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isMutating}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="font-bold text-blue-500 hover:text-blue-800">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthSignIn;

"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { Button, notification } from "antd";
import Link from "next/link";

const next_url = process.env.NEXT_PUBLIC_API_URL as string;

interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

const signUpFetcher = async (_: string, { arg }: { arg: SignUpForm }) => {
  const response = await fetch(`${next_url}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Signup failed. Please try again.");
  }

  return response.json();
};

const AuthSignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>();
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(`${next_url}/auth/signup`, signUpFetcher);

  const onSubmit = async (data: SignUpForm) => {
    try {
      await trigger(data);

      notification.success({
        message: "Signup Successful",
        description: "Your account has been created!",
      });

      router.push("/auth/signin");
    } catch (error) {
      notification.error({
        message: "Signup Failed",
        description: (error as Error).message || "An error occurred.",
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
        </div>

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

        <Button
          type="primary"
          htmlType="submit"
          loading={isMutating}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-bold text-blue-500 hover:text-blue-800">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};



export default AuthSignUp;

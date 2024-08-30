"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, notification } from "antd";
import { useRouter } from "next/navigation";

const AuthSignIn: React.FC = () => {
  const [notice, setNotice] = useState<string>("");
  const [type, setType] = useState<"account" | "mobile">("account");
  const [autoLogin, setAutoLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobile: "+880",
    otp: "",
  });
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8; // Adjust according to your password policy
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "account") {
      if (!validateEmail(formData.email)) {
        notification.error({
          message: "Login Failed",
          description: "The combination of email and password is incorrect!",
        });
        return;
      }

      if (!validatePassword(formData.password)) {
        notification.error({
          message: "Login Failed",
          description: "The combination of email and password is incorrect!",
        });
        return;
      }

      // Replace with real authentication logic
      if (
        formData.email !== "admin@gmail.com" ||
        formData.password !== "888888"
      ) {
        setTimeout(() => {
          setNotice("The combination of email and password is incorrect!");
          setFormData({ email: "", password: "", mobile: "", otp: "" });
          setAutoLogin(false);

          notification.error({
            message: "Login Failed",
            description: "The combination of email and password is incorrect!",
          });
        }, 500);
        return;
      }
    }

    if (
      type === "mobile" &&
      (formData.mobile.length < 11 || formData.otp.length !== 6)
    ) {
      notification.error({
        message: "Login Failed",
        description: "The combination of mobile and otp is incorrect!",
      });
      return;
    }

      // Replace with real authentication logic
      
    if (autoLogin) {
      localStorage.setItem("authToken", "123456");
    } else {
      localStorage.removeItem("authToken");
    }

    setTimeout(() => {
      router.push("/");
    }, 500);

    notification.success({
      message: "Login Success",
      description: "You have successfully logged in!",
    });
  };

  const onTabChange = (tabType: "account" | "mobile") => {
    setType(tabType);
    setNotice("");
  };

  const changeAutoLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoLogin(e.target.checked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="tabs flex justify-around mb-4">
        <button
          className={`py-2 px-4 ${
            type === "account" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => onTabChange("account")}
        >
          Account
        </button>
        <button
          className={`py-2 px-4 ${
            type === "mobile" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => onTabChange("mobile")}
        >
          Mobile
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {notice && (
          <div className="mb-4 text-red-600 text-center">{notice}</div>
        )}

        {type === "account" && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )}

        {type === "mobile" && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobile"
              >
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                required
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                required
                placeholder="Check your inbox and Enter your OTP"
                value={formData.otp}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="button"
              onClick={() => console.log("Get OTP!")}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Re-Send OTP
            </button>
          </>
        )}

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-gray-700 text-sm">
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={changeAutoLogin}
                className="mr-2 leading-tight"
              />
              Keep me logged in
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>

      <div className="text-center">
        <Link
          href="/auth/signup"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default AuthSignIn;

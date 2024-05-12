import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../context/firebase";
import { toast } from "react-toastify";
import Button from "../common_ui/Button";
import Input from "../common_ui/Input";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "/dashboard";
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        delay: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-gray-200">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-md rounded-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              id="email"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
              required
            />
            <Button type="submit">Sign in</Button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? &nbsp;
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

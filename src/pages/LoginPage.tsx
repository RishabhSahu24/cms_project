import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import Button from "../common_ui/Button";
import Input from "../common_ui/Input";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(
      value.endsWith("@gmail.com") ? "" : "Email must end with @gmail.com"
    );
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    setPasswordError(
      passwordRegex.test(value)
        ? ""
        : "Password must be at least 6 characters long and contain at least one capital letter and one number"
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailError || passwordError) {
      toast.error("Please correct the form errors", {
        position: "top-center",
        delay: 2000,
      });
      return;
    }

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
          <img className="mx-auto h-12" src="/logo.png" alt="Your Company" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
              error={emailError}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
              required
              error={passwordError}
            />
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
            >
              Sign in
            </Button>
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

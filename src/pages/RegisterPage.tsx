import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../context/firebase";
import { setDoc, doc } from "@firebase/firestore";
import { toast } from "react-toastify";
import Input from "../common_ui/Input";
import Button from "../common_ui/Button";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAgreeTermsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgreeTerms(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName,
          lastName,
        });
      }

      // Display success toast
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });

      // Wait for a short delay before redirecting
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-gray-200">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-md rounded-lg w-2/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png" // Using the logo.png image from the public folder
            alt="Your Company"
          />
          <h2 className="mt-6 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
          <p className="mt-1 text-left text-xs text-gray-500">
            Please complete to create your account
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-5">
              <div className="flex-1">
                <Input
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  id="fname"
                  required
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  id="lname"
                  required
                />
              </div>
            </div>
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
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={handleAgreeTermsChange}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label htmlFor="terms" className="ms-2 text-sm font-medium">
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
              </label>
            </div>
            <Button type="submit">Register</Button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account? &nbsp;
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

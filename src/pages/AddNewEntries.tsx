import React, { useEffect, useState } from "react";
import { UserData } from "../components/types";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../context/firebase";
import { ColorSelectProps, RadioInputProps } from "./types";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Button from "../common_ui/Button";
import Input from "../common_ui/Input";

const AddNewEntries: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    category: "",
    price: "",
    assigned: false,
    description: "",
  });

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;
          setUserDetails(userData);
          setLoading(false);
        } else {
          console.log("Problem");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("Logout");
    } catch (error: any) {
      console.log("Error ", error.message);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    // Check if all form values are present
    const { name, color, category, price, description } = formData;
    if (!name || !color || !category || !price || !description) {
      toast.error("Please fill in all fields!", {
        position: "top-center",
        delay: 2000,
      });
      return;
    }

    try {
      const user = auth.currentUser;

      if (user) {
        const newDocRef = await addDoc(
          collection(db, "tableEntries"),
          formData
        );
        console.log("Document written with ID: ", newDocRef.id);
      }

      setFormData({
        name: "",
        color: "",
        category: "",
        price: "",
        assigned: false,
        description: "",
      });

      // Display success toast
      toast.success("Data stored successfully!", {
        position: "top-center",
        delay: 2000,
      });

      // Wait for a short delay before redirecting
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 5000);
    } catch (error: any) {
      console.error("Error storing data:", error.message);
      // Display error toast
      toast.error("Error storing data! Please try again later.", {
        position: "top-center",
        delay: 2000,
      });
    }
  };
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar userDetails={userDetails} />
          <Sidebar handleLogout={handleLogout} />
          <div className="flex-grow mt-20 lg:pl-64">
            <div className="container items-center flex flex-col px-4 mx-auto">
              <div className="container flex rounded-3xl py-4 px-6 shadow bg-gray-800 text-white relative">
                Add New Entries
              </div>
              <div className="container mt-10 items-center flex rounded-3xl justify-center py-4 px-6 shadow bg-red-100 text-white relative w-1/2">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Name"
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <ColorSelect
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Category
                      </label>
                      <div className="mt-2 gap-2 space-y-2">
                        <RadioInput
                          id="laptop"
                          name="category"
                          value="Laptop"
                          label="Laptop"
                          checked={formData.category === "Laptop"}
                          onChange={handleInputChange}
                        />
                        <RadioInput
                          id="laptop_pc"
                          name="category"
                          value="Laptop PC"
                          label="Laptop PC"
                          checked={formData.category === "Laptop PC"}
                          onChange={handleInputChange}
                        />
                        <RadioInput
                          id="accessories"
                          name="category"
                          value="Accessories"
                          label="Accessories"
                          checked={formData.category === "Accessories"}
                          onChange={handleInputChange}
                        />
                        <RadioInput
                          id="phone"
                          name="category"
                          value="Phone"
                          label="Phone"
                          checked={formData.category === "Phone"}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <Input
                      label="Price"
                      type="number"
                      id="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="assigned"
                          name="assigned"
                          type="checkbox"
                          checked={formData.assigned}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="assigned"
                          className="font-medium text-gray-700"
                        >
                          Assigned
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>

                    <Button type="submit">Add</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};

const ColorSelect: React.FC<ColorSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label
        htmlFor="color"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Color
      </label>
      <select
        id="color"
        name="color"
        value={value}
        onChange={onChange}
        className="block w-full mt-1  rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="">Select color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="brown">Brown</option>
        <option value="grey">Grey</option>
        <option value="indigo">Indigo</option>
      </select>
    </div>
  );
};

export default AddNewEntries;

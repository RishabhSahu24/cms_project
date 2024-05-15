import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Button from "../common_ui/Button";
import Input from "../common_ui/Input";
import Spinner from "../common_ui/Spinner";
import Header from "../common_ui/Header";
import RadioInput from "../components/RadioInput";
import ColorSelect from "../components/ColorSelect";
import { useUser } from "../context/userDetailsContext";

const AddNewEntries: React.FC = () => {
  const userDetails = useUser();
  const [isAddingProducts, setIsAddingProducts] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    category: "",
    price: "",
    assigned: false,
    description: "",
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsAddingProducts(true);
    e.preventDefault();

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

      setIsAddingProducts(false);

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
      <NavBar userDetails={userDetails} />
      {isAddingProducts ? (
        <>
          <div className="flex-grow mt-20 mb-10">
            <div className="container items-center flex flex-col px-4 mx-auto">
              <Spinner />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-grow mt-20 mb-10">
          <div className="container items-center flex flex-col px-4 mx-auto">
            <Header heading={"Add New Entries"} />
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

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                  >
                    Add
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewEntries;

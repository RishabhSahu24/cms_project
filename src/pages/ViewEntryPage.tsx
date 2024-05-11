import React, { useEffect, useState } from "react";
import { UserData } from "../components/types";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../context/firebase";
import LoadingPage from "./LoadingPage";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

const ViewEntryPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [productDetails, setProductDetails] = useState<any | null>(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserData;
          setUserDetails(userData);
          setLoading(false); // Set loading to false after user details are fetched
        } else {
          console.log("Problem");
          setLoading(false); // Set loading to false even if there's a problem
        }
      } else {
        setLoading(false); // Set loading to false if there's no user
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProductData = async () => {
    try {
      if (!id) return;
      const docRef = doc(db, "tableEntries", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProductDetails(productData); // Update product details with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } else {
        console.log("Product not found");
        setLoading(false); // Set loading to false if product not found
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProductData();
  }, [fetchProductData]);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("Logout");
    } catch (error: any) {
      console.log("Error ", error.message);
    }
  }

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
                View Product
              </div>

              <div className="container mt-10 items-center flex rounded-3xl justify-center py-4 px-6 shadow bg-pink-800 relative w-1/2">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="space-y-6 text-white">
                    <div className="text-xl font-semibold">Product Details</div>
                    <div className="flex flex-col">
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Product Name:</div>
                        <div>{productDetails.name}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Color:</div>
                        <div>{productDetails.color}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Category:</div>
                        <div>{productDetails.category}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Price:</div>
                        <div>{productDetails.price}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Assigned:</div>
                        <div>{productDetails.assigned ? "Yes" : "No"}</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="font-semibold">Description:</div>
                        <div>{productDetails.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewEntryPage;
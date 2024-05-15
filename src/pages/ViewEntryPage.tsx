import React, { useEffect, useState } from "react";
import { UserData } from "../components/types";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../firebase/firebase";
import LoadingPage from "./LoadingPage";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../common_ui/Header";

const ViewEntryPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<any | null>(null);

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

  const fetchProductData = async () => {
    try {
      if (!id) return;
      const docRef = doc(db, "tableEntries", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProductDetails(productData);
        setLoading(false);
      } else {
        console.log("Product not found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar userDetails={userDetails} />
          <div className="flex-grow mt-20">
            <div className="container items-center flex flex-col px-4 mx-auto">
              <Header heading={"View Product"} />
              <ProductDetails product={productDetails} />
            </div>
          </div>
          <BackButton />
        </>
      )}
    </>
  );
};

const ProductDetails: React.FC<{ product: any }> = ({ product }) => {
  return (
    <div className="container mt-10 items-center flex rounded-3xl justify-center py-4 px-6 shadow bg-pink-800 relative w-1/2">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6 text-white">
          <div className="text-xl font-semibold">Product Details</div>
          <ProductDetailRow label="Product Name" value={product.name} />
          <ProductDetailRow label="Color" value={product.color} />
          <ProductDetailRow label="Category" value={product.category} />
          <ProductDetailRow label="Price" value={product.price} />
          <ProductDetailRow
            label="Assigned"
            value={product.assigned ? "Yes" : "No"}
          />
          <ProductDetailRow label="Description" value={product.description} />
        </div>
      </div>
    </div>
  );
};

const ProductDetailRow: React.FC<{
  label: string;
  value: string | boolean;
}> = ({ label, value }) => {
  return (
    <div className="flex justify-between mb-2">
      <div className="font-semibold">{label}:</div>
      <div>{value}</div>
    </div>
  );
};

const BackButton: React.FC = () => {
  return (
    <Link to="/dashboard">
      <div className="container mt-2 items-center flex flex-col px-4 mx-auto">
        <div className="container mt-10 items-center flex rounded-3xl justify-center py-4 px-6 shadow bg-red-900 relative w-1/2">
          Back
        </div>
      </div>
    </Link>
  );
};

export default ViewEntryPage;

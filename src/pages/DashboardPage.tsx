import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
} from "@firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useUser } from "../context/userDetailsContext";

const DashboardPage: React.FC = () => {
  const userDetails = useUser();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isRest, setIsRest] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tableEntries"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setIsLoadingProducts(false);
      setIsRest(false);
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
      setIsLoadingProducts(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("Logout");
    } catch (error: any) {
      console.log("Error ", error.message);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, "tableEntries", productId));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error: any) {
      console.error("Error deleting product:", error.message);
    }
  };

  const handleSearch = async (searchValue: string) => {
    try {
      setIsLoadingProducts(true);
      if (searchValue === "") {
        fetchProducts();

        return;
      }
      const querySnapshot = await getDocs(
        query(collection(db, "tableEntries"), where("name", "==", searchValue))
      );
      const searchData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(searchData);
      setIsLoadingProducts(false);
      setIsRest(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setIsLoadingProducts(false);
    }
  };

  const applyFilters = async (color: string, category: string) => {
    try {
      let querySnapshot;
      setIsRest(true);
      setIsLoadingProducts(true);
      if (color !== "" && category === "") {
        querySnapshot = await getDocs(
          query(collection(db, "tableEntries"), where("color", "==", color))
        );
      } else if (category !== "" && color === "") {
        querySnapshot = await getDocs(
          query(
            collection(db, "tableEntries"),
            where("category", "==", category)
          )
        );
      } else {
        querySnapshot = await getDocs(
          query(
            collection(db, "tableEntries"),
            where("category", "==", category),
            where("color", "==", color)
          )
        );
      }
      const searchData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(searchData);
      setIsLoadingProducts(false);
    } catch (error: any) {
      console.error("Error searching products:", error.message);
      setIsLoadingProducts(false);
    }
  };

  return (
    <>
      <>
        <NavBar userDetails={userDetails} />
        <Sidebar handleLogout={handleLogout} applyFilters={applyFilters} />
        <Dashboard
          products={products}
          isLoading={isLoadingProducts}
          handleDelete={handleDelete}
          handleSearch={handleSearch}
          isRest={isRest}
          fetchProducts={fetchProducts}
        />
      </>
    </>
  );
};

export default DashboardPage;

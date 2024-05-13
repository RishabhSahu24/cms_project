import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import ProductTable from "./ProductTable";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  where,
} from "@firebase/firestore";
import { db } from "../context/firebase";
import Spinner from "../common_ui/Spinner";
import { query } from "firebase/firestore";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRest, setIsRest] = useState(false);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tableEntries"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setIsLoading(false);
      setIsRest(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, "tableEntries", productId));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = async (searchValue: string) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
      setIsRest(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow mt-20 lg:pl-64">
      <div className="container px-4 mx-auto">
        <DashboardHeader
          handleSearch={handleSearch}
          isRest={isRest}
          fetchProducts={fetchProducts}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <ProductTable products={products} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

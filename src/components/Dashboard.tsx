import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import ProductTable from "./ProductTable";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../context/firebase";
import Spinner from "../common_ui/Spinner";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tableEntries"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

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

  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
      dropdown.classList.toggle("hidden");
    }
  };

  return (
    <div className="flex-grow mt-20 lg:pl-64">
      <div className="container px-4 mx-auto">
        <DashboardHeader toggleDropdown={toggleDropdown} />
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

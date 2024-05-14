// Dashboard.tsx
import React from "react";
import DashboardHeader from "./DashboardHeader";
import ProductTable from "./ProductTable";
import Spinner from "../common_ui/Spinner";
import { DashboardProps } from "./types";

const Dashboard: React.FC<DashboardProps> = ({
  products,
  isLoading,
  handleDelete,
  handleSearch,
  isRest,
  fetchProducts,
}) => {
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

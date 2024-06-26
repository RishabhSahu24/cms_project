import React from "react";
import { Link } from "react-router-dom";
import { ProductTableProps } from "./types";
import NotFound from "../common_ui/NotFound";

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleDelete,
}) => {
  return (
    <div className="mt-4 shadow bg-black text-white">
      <div className="relative overflow-x-auto">
        {products.length === 0 ? (
          <NotFound />
        ) : (
          <table className="w-full text-sm text-white-400">
            <thead className="text-md font-semibold uppercase bg-gray-700 text-white-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sn No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Assigned
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className="border-b border-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}.</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.color}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.assigned ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap gap-4 space-x-2">
                    <Link
                      to={`/edit/${product.id}`}
                      className="text-yellow-500 hover:text-yellow-400"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/view/${product.id}`}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductTable;

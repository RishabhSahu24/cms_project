import React from "react";
import { Link } from "react-router-dom";
import { ProductTableProps } from "./types";

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleDelete,
}) => {
  return (
    <div className="mt-4 shadow bg-gray-800 text-white">
      <div className="relative overflow-x-auto">
        {products.length === 0 ? (
          <div className="flex items-center text-5xl justify-center px-6 py-4 font-bold">
            No data found.
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-white-400">
            <thead className="text-xs uppercase bg-gray-700 text-white-400">
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
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
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
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
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

// src/app/product/page.js
"use client";
import { useEffect, useState } from "react";
import AddProduct from "./components/AddProduct";
import EditDeleteProduct from "./components/EditDeleteProduct";
import BASE_URL from "@/lib/baseUrl";

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const data = await response.json();
  
      if (response.ok) {
        setProducts(data.data);
      } else {
        // Handle error more gracefully, e.g., display an error message to the user
        console.error(data.error || "Terjadi kesalahan saat mengambil data produk");
      }
    } catch (error) {
      // Handle error more gracefully, e.g., display an error message to the user
      console.error("Error fetching products:", error);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  return (
    <div className="flex flex-col items-center py-5 h-screen">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold text-center mb-10 text-orange-600">
          Product List
        </h1>
        <div className="mb-5">
          <AddProduct refreshProducts={refreshProducts} />
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-orange-900">
            <thead>
              <tr className="bg-orange-900 text-white">
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Color</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Weight</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={
                    (index + 1) % 2 === 0 ? "bg-orange-100" : "bg-white"
                  }
                >
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.description}</td>
                  <td className="py-2 px-4 border">
                    {product.product_detail[0].color}
                  </td>
                  <td className="py-2 px-4 border">
                    {product.product_detail[0].stock}
                  </td>
                  <td className="py-2 px-4 border">
                    {product.product_detail[0].price}
                  </td>
                  <td className="py-2 px-4 border">
                    {product.product_detail[0].weight}
                  </td>
                  <td className="py-2 px-4 border">
                    <img
                      src={product.product_detail[0].photo}
                      alt={`Product ${product.name}`}
                      className="w-8 h-8 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <EditDeleteProduct
                      product={product}
                      refreshProducts={refreshProducts}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
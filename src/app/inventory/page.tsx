"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Edit, Trash2, PlusCircle, XCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";

export default function Inventory() {
  interface Product {
    _id?: string;
    name: string;
    price: string;
    stockLevel: string;
    tags: string;
    category: string;
    description: string;
    imageURL?: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: "",
    stockLevel: "",
    tags: "",
    category: "",
    description: "",
  });

  const fetchProducts = async () => {
    try {
      const data =
        await client.fetch(`*[_type == "product"] | order(_createdAt desc) {
        _id,
        name,
        price,
        stockLevel,
        tags,
        category,
        "imageURL": image.asset->url,
        description
      }`);
      setProducts([...data]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.price) {
        alert("Name and Price are required!");
        return;
      }

      console.log("Submitting form data: ", formData);

      if (formData._id) {
        console.log("Updating existing product with _id: ", formData._id);
        await client.patch(formData._id).set(formData).commit();
      } else {
        console.log("Creating new product");
        await client.create({
          _type: "product",
          name: formData.name,
          price: formData.price,
          stockLevel: formData.stockLevel,
          tags: formData.tags,
          category: formData.category,
          description: formData.description,
        });
      }

      setIsFormOpen(false);
      setFormData({
        name: "",
        price: "",
        stockLevel: "",
        tags: "",
        category: "",
        description: "",
      });

      await fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting product with _id: ", id);
      await client.delete(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg w-screen mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventory</h2>

        <Button
          className=" text-white flex items-center px-4 py-2 bg-[#1E1E2F]  rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#262639] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => {
            setFormData({
              name: "",
              price: "",
              stockLevel: "",
              tags: "",
              category: "",
              description: "",
            });
            setIsFormOpen(true);
          }}
        >
          <PlusCircle className="mr-2 " />
          Add Product
        </Button>
      </div>
      <div className="mb-6 flex flex-wrap gap-4">
        <Input
          placeholder="Search by product name"
          className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
        />
        <Input
          placeholder="Filter by Category"
          className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
        />
      </div>

      {/* add/delete product form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsFormOpen(false)}
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {formData._id ? "Edit Product" : "Add New Product"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="name"
                value={formData.name}
                placeholder="Product Name"
                className="bg-gray-100"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                name="price"
                value={formData.price}
                placeholder="Price"
                className="bg-gray-100"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <Input
                name="stockLevel"
                value={formData.stockLevel}
                placeholder="Stock Level"
                className="bg-gray-100"
                onChange={(e) =>
                  setFormData({ ...formData, stockLevel: e.target.value })
                }
              />
              <Input
                name="tags"
                value={formData.tags}
                placeholder="Tags"
                className="bg-gray-100"
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
              <Input
                name="category"
                value={formData.category}
                placeholder="Category"
                className="bg-gray-100"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <Input
                name="description"
                value={formData.description}
                placeholder="Description"
                className="bg-gray-100"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <Input
                name="image"
                value={formData.imageURL}
                placeholder="Image"
                className="bg-gray-100"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="bg-gray-500 text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:bg-gray-600 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#1E1E2F] text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#262639] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <Table className="min-w-screen bg-gray-50 text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-100 text-[#1E1E2F]"
              >
                <td className="px-4 py-3">
                  {product.imageURL && (
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.stockLevel}</td>
                <td className="px-4 py-3 flex gap-2">
                  <Button
                    onClick={() => {
                      setFormData(product);
                      setIsFormOpen(true);
                    }}
                    className="bg-[#FFA500] text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#FF8C00] hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFB84D]"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={() => handleDelete(product._id!)}
                    className="bg-[#D32F2F] text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#C62828] hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

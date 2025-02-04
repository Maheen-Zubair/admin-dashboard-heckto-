"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Star, Edit, Trash2, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import React from "react";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
}

interface Product {
  _id: string;
  name: string;
  imageURL: string;
  reviews: Review[];
}

export default function Reviews() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsWithReviews = async () => {
      const query = `*[_type == "product"]{
          _id,
          name,
   "imageURL": image.asset->url,

          "reviews": *[_type == "review" && product._ref == ^._id] | order(_createdAt desc){
            _id,
            name,
            rating,
            comment
          }
        }`;

      const data = await client.fetch(query);
      setProducts(data);
      console.log("Data", data);
    };

    fetchProductsWithReviews();
  }, []);

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-lg w-screen mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Reviews</h2>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <Input
          placeholder="Search by product name"
          className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
        />
        <Input
          placeholder="Filter by reviewer"
          className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
        />
      </div>

      <div className="overflow-x-hidden rounded-lg shadow-lg">
        <Table className="overflow-x-scroll bg-gray-50 text-sm">
          <thead>
            <tr className="bg-gray-300 text-left text-gray-700">
              <th className="px-4 py-3">Product</th>
              <th className="pl-16 py-3">Reviews</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <React.Fragment key={product._id}>
                <tr className="overflow-x-scroll bg-gray-100 hover:bg-gray-200 text-gray-900">
                  <td className="px-4 py-4 flex items-center gap-2 font-semibold">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    {product.name}
                  </td>
                  <td className="px-4 pl-16 py-4">
                    {product.reviews.length} Reviews
                  </td>
                  <td className="px-4 py-4">
                    <Button
                      className="bg-[#27273d] hover:bg-[#363652] text-white px-3 py-2 flex items-center gap-2"
                      onClick={() => toggleExpand(product._id)}
                    >
                      {expanded === product._id ? (
                        <>
                          <ChevronUp className="w-5 h-5" />
                          Hide Reviews
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5" />
                          Expand Reviews
                        </>
                      )}
                    </Button>
                  </td>
                </tr>

                {expanded === product._id &&
                  product.reviews.map((review) => (
                    <tr
                      key={review._id}
                      className="text-gray-900 border-t border-gray-200"
                    >
                      <td className="px-4 py-3 pl-10 flex flex-col">
                        <span className="font-semibold">{review.name}</span>
                        <span className="text-gray-600 text-xs">date</span>
                      </td>
                      <td className="px-4 py-3 flex items-center gap-1">
                        <Star className="text-yellow-500 w-5 h-5" />
                        {review.rating}
                        <span className="ml-2 text-gray-600">
                          {review.comment}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2">
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

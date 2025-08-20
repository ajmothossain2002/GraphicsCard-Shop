"use client";

import React, { useEffect, useState } from "react";
import { dbService, GPUProductDocument } from "@/lib/appwrite";
import { Loader2, ShoppingCart, AlertTriangle, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/context/cartContext";
import SearchComponent from "./searchComponent"; 


export default function CollectionPage() {
  const [allProducts, setAllProducts] = useState<GPUProductDocument[]>([]);
  const [searchResults, setSearchResults] = useState<GPUProductDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setSearchResults(null); 
      
      const response = await dbService.listProducts({
        orderBy: "$createdAt",
        orderDirection: "desc",
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch products");
      }

      const documents = response.data?.documents || [];
      setAllProducts(Array.isArray(documents) ? documents : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setIsError(true);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  
    const handleAddToCart = (product: GPUProductDocument) => {
      addToCart({
        $id: product.$id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`, {
        icon: '🛒',
        style: {
          background: '#10b981',
          color: '#fff',
        },
        position: 'bottom-right'
      });
    };


const productsToDisplay = searchResults !== null ? searchResults : allProducts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
        

          {/* Main Content */}
          <main className="flex-1">       
            <div className="mb-8">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 h-48">
                <div className="flex items-center justify-center h-full text-cyan-400">
                <SearchComponent 
    allProducts={allProducts}
    onSearchResults={setSearchResults}
    placeholder="Search products by name, description, or category..."
  />
                </div>
              </div>
            </div>

            <div>
              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-2" />
                    <p className="text-gray-400">Loading products...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {isError && (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-400 text-lg mb-4">
                    Error loading products
                  </p>
                  <p className="text-red-300 mb-4 text-sm">
                    {error || "An unexpected error occurred"}
                  </p>
                  <button
                    onClick={fetchProducts}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors duration-200 flex items-center gap-2 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {!isLoading && !isError && (
                <>
                  {productsToDisplay.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mb-4">
                        <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">
                          {searchResults ? "No products found matching your search" : "No products found"}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          {searchResults ? "Try a different search term" : "Check back later for new products"}
                        </p>
                      </div>
                      {searchResults && (
                        <button
                          onClick={() => setSearchResults(null)}
                          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-colors duration-200 flex items-center gap-2 mx-auto"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Clear Search
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-400 text-sm">
                          Showing {productsToDisplay.length} product
                          {productsToDisplay.length !== 1 ? "s" : ""}
                          {searchResults && ` matching your search`}
                        </p>
                        {searchResults && (
                          <button
                            onClick={() => setSearchResults(null)}
                            className="text-cyan-400 hover:text-cyan-300 text-sm"
                          >
                            Clear Search
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productsToDisplay.map((product) => (
                          <div 
                            key={product.$id}
                            className="bg-gradient-to-br from-slate-800/50 to-zinc-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
                          >
                            <div className="relative overflow-hidden rounded-xl mb-4 bg-slate-900/50">
                            <Link href={`/products/${product.$id}`} passHref>
                              <Image
                                src={product.image}
                                width={300}
                                height={300}
                                alt={product.name}
                                className="w-full h-48 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/api/placeholder/300/200";
                                }}
                              />
                              </Link>
                            </div>

                            <div className="space-y-3">
                              <h3 className="text-lg font-bold text-white line-clamp-2">
                                {product.name}
                              </h3>

                              <p className="text-gray-300 text-sm line-clamp-3">
                                {product.description}
                              </p>

                              <div className="text-2xl font-bold text-green-400">
                                ${product.price.toFixed(2)}
                              </div>

                              <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Custom CSS for line clamping */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
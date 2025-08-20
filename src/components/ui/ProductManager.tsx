


'use client';

import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Cpu, DollarSign, ImageIcon, AlertTriangle } from 'lucide-react';
import { dbService, GPUProduct, GPUProductDocument } from '@/lib/appwrite';
import Image from 'next/image';

export default function ProductManager() {
  const [products, setProducts] = useState<GPUProductDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<GPUProduct & { id?: string }>({
    name: '',
    price: 0,
    description: '',
    image: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const response = await dbService.listProducts();
    if (response.success && response.data) {
      setProducts(response.data.documents);
      setError(null);
    } else {
      setError(response.error ?? 'Failed to load products');
    }
    setLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...data } = formData;

    const result = id
      ? await dbService.updateProduct(id, data)
      : await dbService.createProduct(data);

    if (result.success) {
      resetForm();
      loadProducts();
    } else {
      alert(result.error || 'Failed to save product');
    }
  };

  const handleEdit = (product: GPUProductDocument) => {
    setFormData({
      id: product.$id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const result = await dbService.deleteProduct(id);
    if (result.success) {
      loadProducts();
    } else {
      alert(result.error || 'Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      description: '',
      image: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="container mx-auto max-w-6xl p-6 space-y-8">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cpu className="w-10 h-10 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              GPU Product Manager
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Manage your graphics card inventory with style</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Division 1: Product Form */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-zinc-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">
                  {formData.id ? 'Edit Product' : 'Add New Product'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                      placeholder="Enter GPU name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description *</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 resize-none"
                    placeholder="Enter product description..."
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/70 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                  >
                    {formData.id ? 'Update Product' : 'Add Product'}
                  </button>
                  {formData.id && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-200 border border-slate-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Division 2: Product List */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-zinc-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Product Inventory</h2>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-400 text-lg font-semibold">Error Loading Products</p>
                  <p className="text-red-300 mt-2">{error}</p>
                  <button
                    onClick={loadProducts}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <Cpu className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No products found</p>
                  <p className="text-gray-500">Add your first GPU to get started</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                  {products.map(product => (
                    <div
                      key={product.$id}
                      className="bg-gradient-to-r from-slate-800/80 to-zinc-800/80 border border-slate-700/70 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300 group"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                      
                            className="w-24 h-24 object-contain rounded-lg border-2 border-slate-600 group-hover:border-cyan-400/50 transition-all duration-300 bg-slate-900/50"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/api/placeholder/96/96';
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white truncate mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-2xl font-bold text-green-400">
                              {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            ID: {product.$id}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/40 hover:border-amber-500 text-amber-400 rounded-lg transition-all duration-200 group/btn"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.$id)}
                            className="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 hover:border-red-500 text-red-400 rounded-lg transition-all duration-200 group/btn"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.8);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style> */}
    </div>
  );
}
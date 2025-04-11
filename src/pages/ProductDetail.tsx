import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../store/useCartStore';
import { Product } from '../types';
import { Star, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success('Added to cart!');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-105">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[450px] object-contain"
          />
        </div>
  
        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-slate-800">{product.title}</h1>
  
          {/* Ratings */}
          <div className="flex items-center space-x-3">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.floor(product.rating.rate)
                      ? 'text-yellow-400 fill-current'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-500">({product.rating.count} reviews)</span>
          </div>
  
          {/* Price */}
          <p className="text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
  
          {/* Description */}
          <div className="border-t border-slate-200 pt-5">
            <h3 className="text-xl font-medium text-slate-800 mb-2">Product Description</h3>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>
  
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center px-6 py-3 text-white text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
  
  
}
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Home } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

export function Header() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const cartItems = useCartStore((state) => state.items);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left - Logo/Home */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-slate-800 hover:text-indigo-600 transition-colors font-semibold">
              <Home className="h-5 w-5" />
              <span className="ml-2 text-base">Home</span>
            </Link>
          </div>

          {/* Right - Cart & Logout */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link to="/cart" className="relative text-slate-800 hover:text-indigo-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center text-slate-800 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

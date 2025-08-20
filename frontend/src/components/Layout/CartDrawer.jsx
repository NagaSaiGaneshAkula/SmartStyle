import React, { useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);

  const userId = user ? user.id : undefined;

  // Calculate cart totals
  const cartTotals = useMemo(() => {
    if (!cart || !cart.products) {
      return { totalItems: 0, totalPrice: 0 };
    }

    const totalItems = cart.products.reduce((sum, product) => sum + (product.quantity || 0), 0);
    const totalPrice = cart.products.reduce((sum, product) => {
      return sum + ((product.price || 0) * (product.quantity || 0));
    }, 0);

    return { totalItems, totalPrice };
  }, [cart]);

  const handleCheckOut = () => {
    toggleDrawer();
    
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleDrawer();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998]"
          onClick={handleBackdropClick}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transition-transform duration-300 flex flex-col z-[999] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            Your Cart
            {cartTotals.totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-600">
                ({cartTotals.totalItems} item{cartTotals.totalItems !== 1 ? 's' : ''})
              </span>
            )}
          </h2>
          <button 
            onClick={toggleDrawer}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <IoMdClose className="w-6 h-6 text-gray-600 hover:text-gray-700" />
          </button>
        </div>

        {/* Cart contents with scrolling */}
        <div className="overflow-y-auto flex-grow">
          {loading && (!cart || !cart.products) ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2">Loading cart...</span>
            </div>
          ) : error && (!cart || !cart.products || cart.products.length === 0) ? (
            <div className="p-4 text-center">
              <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
                <p className="font-medium">Error loading cart</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          ) : cart && cart.products && cart.products.length > 0 ? (
            <div className="p-4">
              <CartContent cart={cart} userId={userId} guestId={guestId} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 p-4">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-center">Your cart is empty</p>
              <p className="text-sm text-gray-400 text-center mt-1">
                Add some items to get started
              </p>
            </div>
          )}
        </div>

        {/* Checkout section - fixed at bottom */}
        {cart && cart.products && cart.products.length > 0 && (
          <div className="border-t bg-white p-4">
            {/* Cart Summary */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  ${cartTotals.totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Shipping, taxes, and discount codes calculated at checkout
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckOut}
              disabled={loading}
              className="w-full py-3 font-semibold text-white bg-black rounded-lg transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Checkout • $${cartTotals.totalPrice.toLocaleString()}`
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
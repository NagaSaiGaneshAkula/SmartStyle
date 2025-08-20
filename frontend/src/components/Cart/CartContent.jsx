import React, { useCallback } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { 
  removeItemFromCart, 
  updateCartItemQuantity,
  updateQuantityOptimistic,
  rollbackQuantityUpdate,
  fetchCart,
  addItemToCart
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cart);

  const handleAddToCart = useCallback(
    async (productId, delta, currentQuantity, size, color) => {
      console.log("Quantity change clicked:", { productId, delta, currentQuantity, size, color });
      console.log("Current auth state:", { userId, guestId });
      
      const newQuantity = currentQuantity + delta;
      
      // Don't allow quantity less than 1
      if (newQuantity < 1) {
        console.log("Cannot reduce quantity below 1");
        return;
      }

      // Store previous quantity for rollback
      const previousQuantity = currentQuantity;

      try {
        // Optimistic update - immediately update UI
        dispatch(updateQuantityOptimistic({
          productId,
          size,
          color,
          quantity: newQuantity
        }));

        // Make API call
        const result = await dispatch(updateCartItemQuantity({
          productId,
          size,
          color,
          quantity: newQuantity,
          guestId,
          userId,
        }));

        // Check if the API call failed
        if (updateCartItemQuantity.rejected.match(result)) {
          // Rollback the optimistic update
          dispatch(rollbackQuantityUpdate({
            productId,
            size,
            color,
            previousQuantity
          }));
          console.error("Failed to update quantity:", result.payload);
          
          // If cart not found, try to fetch the cart to refresh it
          if (result.payload?.message?.includes("Cart not found")) {
            console.log("Attempting to fetch cart to refresh state");
            dispatch(fetchCart({ userId, guestId }));
          }
        }
      } catch (error) {
        // Rollback the optimistic update
        dispatch(rollbackQuantityUpdate({
          productId,
          size,
          color,
          previousQuantity
        }));
        console.error("Error updating quantity:", error);
      }
    },
    [dispatch, guestId, userId]
  );

  const handleRemoveFromCart = useCallback(
    async (productId, size, color) => {
      console.log("Removing item from cart:", { productId, size, color });
      
      try {
        const result = await dispatch(removeItemFromCart({ 
          productId, 
          size, 
          color, 
          userId, 
          guestId 
        }));
        
        if (removeItemFromCart.rejected.match(result)) {
          console.error("Failed to remove item:", result.payload);
        }
      } catch (error) {
        console.error("Error removing item:", error);
      }
    },
    [dispatch, userId, guestId]
  );

  // Show error message if there's an error
  if (error) {
    console.error("Cart error:", error);
  }

  // Ensure cart and products exist
  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div>
      {/* Show error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {cart.products.map((product, index) => {
        // Validate product data
        if (!product.productId || product.quantity === undefined) {
          console.warn("Invalid product data:", product);
          return null;
        }

        return (
          <div
            key={`${product.productId}-${product.size}-${product.color}-${index}`}
            className="flex justify-between items-start py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={product.image || '/placeholder-image.jpg'}
                alt={product.name || 'Product'}
                className="object-cover w-20 h-24 rounded"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />

              {/* Main body */}
              <div className="ml-4">
                <h3 className="font-medium">{product.name || 'Unknown Product'}</h3>
                <p className="text-sm text-gray-500">
                  Size: {product.size || 'N/A'} | Color: {product.color || 'N/A'}
                </p>

                {/* Quantity add and remove */}
                <div className="flex items-center mt-2">
                  <button
                    className="px-3 py-1 text-lg font-medium rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color,
                      )
                    }
                    disabled={product.quantity <= 1 || loading}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  
                  <span className="mx-4 min-w-[2rem] text-center font-medium">
                    {product.quantity}
                  </span>
                  
                  <button
                    className="px-3 py-1 text-lg font-medium rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color,
                      )
                    }
                    disabled={loading}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price and delete button */}
            <div className="flex flex-col items-end">
              <p className="font-medium text-lg">
                ${(product.price || 0).toLocaleString()}
              </p>
              
              {/* Delete button */}
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color,
                  )
                }
                disabled={loading}
                className="mt-2 p-1 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Remove item from cart"
              >
                <RiDeleteBin3Line className="w-6 h-6 text-red-600 hover:text-red-700" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-sm text-gray-500">Updating cart...</p>
        </div>
      )}
    </div>
  );
};

export default CartContent;
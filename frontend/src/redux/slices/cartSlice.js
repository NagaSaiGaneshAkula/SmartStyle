import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return { products: [] };
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { params: { userId, guestId } },
      );
      return response.data;
    } catch (error) {
      console.error("Fetch cart error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch cart" }
      );
    }
  },
);

export const addItemToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, quantity, size, color, guestId, userId },
      );
      return response.data;
    } catch (error) {
      console.error("Add item to cart error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to add item to cart" }
      );
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue },
  ) => {
    try {
      console.log("Updating cart item quantity:", { productId, quantity, size, color, guestId, userId });
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId, quantity, guestId, userId, size, color },
      );
      console.log("Update cart response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update cart item quantity error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to update cart item quantity" }
      );
    }
  },
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { data: { productId, guestId, userId, size, color } },
      );
      return response.data;
    } catch (error) {
      console.error("Remove item from cart error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove item from cart" }
      );
    }
  },
);

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ user, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { user, guestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Merge cart error:", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to merge cart" }
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      try {
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Error clearing cart from storage:", error);
      }
    },
    // Optimistic update for quantity changes
    updateQuantityOptimistic: (state, action) => {
      const { productId, size, color, quantity } = action.payload;
      const product = state.cart.products.find(
        (p) => p.productId === productId && p.size === size && p.color === color
      );
      if (product) {
        product.quantity = quantity;
        saveCartToStorage(state.cart);
      }
    },
    // Rollback optimistic update on failure
    rollbackQuantityUpdate: (state, action) => {
      const { productId, size, color, previousQuantity } = action.payload;
      const product = state.cart.products.find(
        (p) => p.productId === productId && p.size === size && p.color === color
      );
      if (product) {
        product.quantity = previousQuantity;
        saveCartToStorage(state.cart);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })

      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add item to cart";
      })

      // Update Cart Item Quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        // Don't set loading to true for quantity updates to keep UI responsive
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart item quantity";
      })

      // Remove Item from Cart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove item from cart";
      })

      // Merge Cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to merge cart";
      });
  },
});

export const { clearCart, updateQuantityOptimistic, rollbackQuantityUpdate } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductCart extends Product {
  quantity: number;
}

interface CartState {
  cart: ProductCart[];
}

const initialState: CartState = {
  cart:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductCart>) {
      const product = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += product.quantity;
      } else {
        state.cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct(state, action: PayloadAction<number>) {
      console.log("test");

      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state, action: PayloadAction) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    updateCartQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (p) => p.id === productId
      );
      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity = quantity;
        if (quantity <= 0) {
          state.cart.splice(existingProductIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addProduct, removeProduct, clearCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../product/productSlice';
interface CartProductType extends ProductType {
  cartQuantity: number;
}

export type SliceState = { cartProducts: {[id:number]: CartProductType}, cartTotalPrice: number }

const initialState: SliceState = {
  cartProducts: {}, // {id1: product1, id2: product2, id3: product3 ...}
  cartTotalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const addedProduct = action.payload;
      if (addedProduct.id in state.cartProducts) {
        state.cartProducts[addedProduct.id].cartQuantity += 1;
      } else {
        state.cartProducts[addedProduct.id] = { ...action.payload, cartQuantity: 1 };
      }
      state.cartTotalPrice += addedProduct.price;
    },
    removeFromCart(state, action) {
      const removedProduct = action.payload;
      state.cartTotalPrice -= removedProduct.price * removedProduct.cartQuantity;
      delete state.cartProducts[removedProduct.id];
    },
    decreaseCartQuantity(state, action) {
      const decreasedProduct = action.payload;
      state.cartTotalPrice -= decreasedProduct.price;
      if (decreasedProduct.cartQuantity === 1) {
        delete state.cartProducts[decreasedProduct.id];
      } else {
        state.cartProducts[decreasedProduct.id].cartQuantity -= 1;
      }
    },
    clearCart(state) {
      state.cartProducts = {};
      state.cartTotalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
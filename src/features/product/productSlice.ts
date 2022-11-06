import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ProductType {
  id: number;
  title: string;
  image: string;
  price: number;
}

export type SliceState = { loading: boolean, products: {[id: number]: ProductType}, error: string }

const initialState: SliceState = {
  loading: false,
  products: {},
  error: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return await fetch('https://fakestoreapi.com/products/')
      .then(async (response) => await response.json())
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.forEach((product: ProductType) => state.products[product.id] = product)
      state.error = '';
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = {};
      state.error = (action.error.message as string);
    });
  },
});

export default productSlice.reducer;
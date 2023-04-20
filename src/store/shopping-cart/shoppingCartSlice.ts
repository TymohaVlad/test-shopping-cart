import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ShoppingCartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

interface ShoppingCart {
  items: ShoppingCartItem[];
}
const initialState = () => {
  const storedCart = localStorage.getItem('shoppingCart');
  if (storedCart) {
    return JSON.parse(storedCart) as ShoppingCart;
  }
  return { items: [] } as ShoppingCart;
};

const saveStateToLocalStorage = (state: ShoppingCart) => {
  localStorage.setItem('shoppingCart', JSON.stringify(state));
};

const shoppingCartSlice = createSlice({
  name: 'shopping-cart',
  initialState: initialState(),
  reducers: {
    addItem: (state: Draft<ShoppingCart>, action: PayloadAction<ShoppingCartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveStateToLocalStorage(state);
    },
    removeItem: (state: Draft<ShoppingCart>, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveStateToLocalStorage(state);
    },
    updateItemQuantity: (
      state: ShoppingCart,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        const itemsToSave = state.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }));
        localStorage.setItem('shoppingCart', JSON.stringify(itemsToSave));
      }
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = shoppingCartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const shoppingCartSelector = (state: RootState) => state;

export default shoppingCartSlice.reducer;

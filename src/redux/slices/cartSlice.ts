import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    size: number;
    quantity: number;
    category: string;
    colorDescription: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<{ id: number; size: number }>) => {
            state.items = state.items.filter(
                (item) => !(item.id === action.payload.id && item.size === action.payload.size)
            );
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; size: number; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

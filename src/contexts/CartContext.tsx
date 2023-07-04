import { createContext, ReactElement, useMemo, useState } from "react";
import { StoreItem } from "../components/StoreItem.tsx";

type CartItem = {
  count: number,
} & StoreItem

export type CartContextValues = {
  cartItems: CartItem[],
  totalPrice: number,
  createToCart: (item: StoreItem) => void,
  removeFromCart: (item: StoreItem) => void
  increaseCount: (item: StoreItem) => void,
  decreaseCount: (item: StoreItem) => void,
}

type CartProviderProps = {
  children: ReactElement,
}

export const CartContext = createContext<CartContextValues | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, cur) => acc + cur.price * cur.count, 0)
  }, [cartItems])

  function createToCart(item: StoreItem): void {
    setCartItems(prev => [...prev, { ...item, count: 1 }])
  }

  function removeFromCart(item: StoreItem): void {
    setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id));
  }

  function increaseCount(item: StoreItem): void {
    setCartItems(prev => prev.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...item, count: cartItem.count + 1 }
      } else {
        return cartItem;
      }
    }))
  }

  function decreaseCount(item: StoreItem): void {
    setCartItems(prev =>
      prev
        .map(cartItem => {
          if (cartItem.id === item.id) {
            if (cartItem.count === 1) {
              return '' as never;
            } else {
              return { ...item, count: cartItem.count - 1 }
            }
          } else {
            return cartItem;
          }
        })
        .filter(cartItem => cartItem),
    )
  }

  const contextValues: CartContextValues = {
    cartItems,
    totalPrice,
    createToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
  }

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  )
}
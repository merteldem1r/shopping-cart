import { formatCurrency } from "../utils/formatCurrency.ts";
import { useContext } from "react";
import { CartContext, CartContextValues } from "../contexts/CartContext.tsx";

export type StoreItem = {
  id: string,
  name: string,
  price: number,
  imgUrl: string,
}

type StoreItemProps = {
  item: StoreItem
}

export function StoreItem({ item }: StoreItemProps) {
  const { id, name, price, imgUrl } = item;
  const {
    cartItems,
    createToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
  } = useContext(CartContext) as CartContextValues;

  const cartItem = cartItems.find(cartItem => cartItem.id === id);

  return (
    <div className="w-[250px] pb-2 bg-white hover:shadow-xl transition-all">
      <img className="block w-full h-[150px] object-cover"
           src={imgUrl}
           alt="store item"
      />

      <div className="flex flex-col gap-3 p-3">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{name}</h3>
          <span className="opacity-85">{formatCurrency(price)}</span>
        </div>

        <CartButtons />
      </div>
    </div>
  )

  function CartButtons() {
    if (cartItem) {
      return (
        <div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => decreaseCount(item)}
              className="item-button px-5">
              -
            </button>

            <div>{cartItem.count} in cart</div>

            <button
              onClick={() => increaseCount(item)}
              className="item-button px-5">
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item)}
            className="item-button w-full mt-5 bg-red-800"
          >
            Remove
          </button>
        </div>
      )
    } else {
      return (
        <button
          onClick={() => createToCart(item)}
          className="item-button w-full"
        >
          + Add to cart
        </button>
      )
    }
  }
}
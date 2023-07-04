import { Dispatch, useContext } from "react";
import { CartContext, CartContextValues } from "../../../contexts/CartContext.tsx";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency } from "../../../utils/formatCurrency.ts";

type isActiveState = boolean;

type ShoppingCartModalProps = {
  isActive: isActiveState,
  setIsActive: Dispatch<isActiveState>
}

export function ShoppingCartModal({ isActive, setIsActive }: ShoppingCartModalProps) {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
  } = useContext(CartContext) as CartContextValues;

  return (
    <div onClick={() => setIsActive(false)} className={isActive ? "cartModal active" : "cartModal"}>
      <div
        onClick={e => e.stopPropagation()}
        className="cartModalContent p-3 w-[50vw] md:w-[40vw] lg:w-[30vw]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl">Your Cart</h3>
          <button onClick={() => setIsActive(false)}>
            <CloseIcon style={{ fontSize: '30px' }} />
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {cartItems.map(item => {
            return (
              <div className="flex">
                <div className="flex flex-1 items-center gap-2">
                  <div className="w-[75%]">
                    <img className="block w-full h-[75px] object-cover" src={item.imgUrl} alt="" />
                  </div>
                  <div className="w-[25%]">
                    <div className="flex items-center gap-1">
                      <span>{item.name}</span>
                      <span className="text-xs opacity-70">x{item.count}</span>
                    </div>
                    <div className="text-sm opacity-70">{formatCurrency(item.price)}</div>
                  </div>
                </div>

                <div className="flex flex-1 gap-2 justify-end items-center">
                  <div>{formatCurrency(item.price * item.count)}</div>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="border-[1px] border-[#ad0000] p-1 rounded-sm"
                  >
                    <DeleteIcon style={{ color: "#ad0000" }} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {cartItems.length > 0
          ? <div className="mt-5 text-end text-xl font-medium">
            Total: {formatCurrency(totalPrice)}
          </div>
          : <div className="opacity-70">Here is empty</div>
        }

      </div>
    </div>
  )
}
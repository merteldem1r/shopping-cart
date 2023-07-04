import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useMemo, useState } from "react";
import { ShoppingCartModal } from "../../Modals/Cart Modal/ShoppingCartModal.tsx";
import { CartContext, CartContextValues } from "../../../contexts/CartContext.tsx";

export function Header() {
  const [isCartActive, setIsCartActive] = useState<boolean>(false)
  const { cartItems } = useContext(CartContext) as CartContextValues;
  const totalItemsInCart: number = useMemo(() => {
    return cartItems.reduce((acc, cur) => acc + cur.count, 0)
  }, [cartItems])

  return (
    <header className="sticky top-0 bg-white shadow-md py-4">
      <div className="container">
        <nav className="flex justify-between items-center">
          <div className="flex gap-3 text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'underline font-medium'
                  : ''
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'underline font-medium'
                  : ''
              }
              to="/store"
            >
              Store
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'underline font-medium'
                  : ''
              }
              to="/about"
            >
              About
            </NavLink>
          </div>

          <div>
            <div
              onClick={() => setIsCartActive(prev => !prev)}
              className="relative border-2 hover:scale-[1.05] transition-all border-sky-600 p-2 rounded-full cursor-pointer"
            >
              <ShoppingCartIcon style={{ color: '#0284C7' }} />

              <div className="cart-count flex items-center justify-center">
                <div>{totalItemsInCart}</div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <ShoppingCartModal isActive={isCartActive} setIsActive={setIsCartActive} />
    </header>
  )
}
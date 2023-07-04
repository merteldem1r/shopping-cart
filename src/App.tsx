import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import { Home } from "./pages/Home.tsx";
import { About } from "./pages/About.tsx";
import { Store } from "./pages/Store.tsx";
import { Item } from "./pages/Item.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="store" element={<Store />} />
    <Route path="store/:id" element={<Item />} />
  </Route>,
))

function App() {
  return (
    <div className="page">
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </div>
  )
}

export default App

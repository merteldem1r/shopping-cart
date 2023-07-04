import { Outlet } from "react-router-dom";
import { Header } from "./UI/Header/Header.tsx";
import { Footer } from "./UI/Footer/Footer.tsx";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
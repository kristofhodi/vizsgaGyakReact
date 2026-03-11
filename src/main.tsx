import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AllPizza from "./pages/AllPizza";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage";
import OnePizza from "./pages/OnePizza";
import NewPizza from "./pages/NewPizza";
import EditPizza from "./pages/EditPizza";
import OrdersPage from "./pages/OrdersPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPizza />} />
        <Route path="/add-pizza" element={<NewPizza />} />
        <Route path="/pizza/:id" element={<OnePizza />} />
        <Route path="/edit-pizza/:id" element={<EditPizza />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/rendelesek" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="colored" />
  </StrictMode>,
);

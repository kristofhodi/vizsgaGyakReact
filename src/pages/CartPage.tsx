import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";

const CartPage = () => {
  const [pizzas, setPizzas] = useState<Array<Pizza>>([]);
  const [cart, setCart] = useState<Array<number>>(
    JSON.parse(localStorage.getItem("cart") ?? "[]"),
  );

  useEffect(() => {
    apiClient
      .get("/pizzak")
      .then((res) => setPizzas(res.data))
      .catch(() => toast.error("Sikertelen"));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItem = (index: Number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const price = cart.reduce((total, id) => {
    const pizza = pizzas.find((p) => p.id == id);
    return total + Number(pizza?.ar);
  }, 0);

  return <></>;
};

export default CartPage;

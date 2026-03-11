import { useEffect, useState } from "react";
import type { Order } from "../types/Order";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const isLogged = () => localStorage.getItem("credentials") !== null;

  useEffect(() => {
    if (!isLogged()) return;

    apiClient
      .get("/rendelesek")
      .then((res) => setOrders(res.data))
      .catch(() => toast.error("Kuka"));
  }, []);
  return (
    <>
      <h1>Rendelések megtekintése</h1>
      {isLogged() ? (
        <>
          {orders.map((o) => (
            <h2>
              {o.pizzaId} - {o.mennyiseg}
            </h2>
          ))}
        </>
      ) : (
        <>
          <h2>jelentkezz be</h2>
        </>
      )}
    </>
  );
};

export default OrdersPage;

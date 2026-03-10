import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import { Button, Table } from "react-bootstrap";

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

  return (
    <>
      <h1>Kosár tartalama</h1>
      {cart.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Név</th>
                <th>Ár</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((id, index) => {
                const pizza = pizzas.find((p) => p.id == id);
                return (
                  <tr>
                    <td>{pizza?.nev}</td>
                    <td>{pizza?.ar} Ft</td>
                    <td>
                      <Button
                        onClick={() => removeItem(index)}
                        variant="warning"
                      >
                        🗑️
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h2>Összesen: {price} Ft</h2>
          <h2>Elemek száma: {cart.length}</h2>
          <Button onClick={() => setCart([])} variant="danger">
            Ürítés
          </Button>
        </>
      ) : (
        <h1>Kosár tartalma üres</h1>
      )}
    </>
  );
};

export default CartPage;

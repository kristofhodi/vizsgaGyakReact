import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const NewPizza = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<Pizza>({
    nev: "",
    leiras: "",
    ar: 0,
    imageUrl: "",
  });

  const submit = () => {
    apiClient
      .post("/pizzak", pizza)
      .then(() => {
        toast.success("Sikeres hozzáadás");
        navigate("/");
      })
      .catch(() => toast.error("Gatya"));
  };
  return (
    <>
      <h1>Pizza hozzáadása</h1>
      <input
        type="text"
        placeholder="Név"
        value={pizza.nev}
        onChange={(e) => setPizza({ ...pizza, nev: e.target.value })}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Leírás"
        value={pizza.leiras}
        onChange={(e) => setPizza({ ...pizza, leiras: e.target.value })}
      />{" "}
      <br />
      <input
        type="number"
        placeholder="Ár"
        value={pizza.ar}
        onChange={(e) => setPizza({ ...pizza, ar: Number(e.target.value) })}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="imageUrl"
        value={pizza.imageUrl}
        onChange={(e) => setPizza({ ...pizza, imageUrl: e.target.value })}
      />{" "}
      <br />
      <Button onClick={submit} variant="success">
        Hozzáadás
      </Button>
    </>
  );
};

export default NewPizza;

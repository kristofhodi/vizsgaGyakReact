import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import type { Pizza } from "../types/Pizza";
import { Button } from "react-bootstrap";

const EditPizza = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<Pizza>({
    nev: "",
    leiras: "",
    ar: 0,
    imageUrl: "",
  });
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => toast.error("Sikertelen"));
  }, [id]);

  const submit = () => {
    const dto = {
      nev: pizza.nev,
      leiras: pizza.leiras,
      ar: pizza.ar,
      imageUrl: pizza.imageUrl,
    };

    apiClient
      .put(`/pizzak/${id}`, dto)
      .then(() => {
        toast.success("Sikeres szerkesztés");
        navigate("/");
      })
      .catch(() => toast.error("Gatya"));
  };

  return (
    <>
      <h1>Pizza szerkesztése</h1>
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
        Szerkesztés
      </Button>
    </>
  );
};

export default EditPizza;

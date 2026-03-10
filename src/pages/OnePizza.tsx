import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import { toast } from "react-toastify";
import apiClient, { baseURL } from "../api/apiClient";
import { Button } from "react-bootstrap";

const OnePizza = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<Pizza>();
  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/pizzak/${id}`)
      .then((res) => setPizza(res.data))
      .catch(() => toast.error("Sikertelen"));
  }, [id]);

  const deletePizza = () => {
    apiClient
      .delete(`/pizzak/${id}`)
      .then(() => {
        toast.success("Sikeres törlés");
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen törlés"));
  };

  const editPizza = () => {
    navigate(`/edit-pizza/${id}`);
  };

  return (
    <>
      <h1>{pizza?.nev}</h1>
      <h2>{pizza?.leiras}</h2>
      <img
        src={`${baseURL}/kepek/${pizza?.imageUrl}`}
        width={300}
        height={300}
      />{" "}
      <br />
      <Button onClick={deletePizza} variant="danger">
        Törlés
      </Button>
      <br />
      <Button onClick={editPizza} variant="warning">
        Szerkesztés
      </Button>
    </>
  );
};

export default OnePizza;

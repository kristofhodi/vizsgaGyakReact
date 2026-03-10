import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const login = () => {
    apiClient
      .post("/login", user)
      .then(() => {
        toast.success("Sikeres");
        localStorage.setItem("credentials", JSON.stringify(user));
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen"));
  };
  return (
    <>
      <h1>Bejelentkezés</h1>
      <h3>Felhasználónév</h3>
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <br />
      <h3>Jelszó</h3>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />
      <Button onClick={login}>Bejelentkezés</Button>
    </>
  );
};

export default LoginPage;

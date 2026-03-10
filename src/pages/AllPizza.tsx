import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Pizza } from "../types/Pizza";
import apiClient, { baseURL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const AllPizza = () => {
  const navigate = useNavigate();
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

  const generateCard = (p: Pizza) => {
    return (
      <Col>
        <Card>
          <Card.Img variant="top" src={`${baseURL}/kepek/${p.imageUrl}`} />
          <Card.Body>
            <Card.Title>{p.nev}</Card.Title>
            <Card.Text>{p.leiras}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col>
                <Card.Title>{p.ar} Ft</Card.Title>
              </Col>

              <Col md={{ span: 3 }}>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/pizza/${p.id}`)}
                >
                  👀
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Sikeresen a kosárba tetted");
                    setCart([...cart, Number(p.id)]);
                  }}
                  variant="success"
                >
                  🛒
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    );
  };
  return (
    <Container>
      <Col>
        <Row xs={"auto"} md={"auto"} lg={5} className="g-4">
          {pizzas.map((p) => generateCard(p))}
        </Row>
      </Col>
    </Container>
  );
};

export default AllPizza;

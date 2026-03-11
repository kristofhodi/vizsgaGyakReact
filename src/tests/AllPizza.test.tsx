// @vitest-environment happy-dom

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AllPizza from "../pages/AllPizza";
import { BrowserRouter } from "react-router-dom";
describe("App (real API)", () => {
  it("igazi API-ból betölti és megjeleníti a Pepperonit", async () => {
    render(
      <BrowserRouter>
        <AllPizza />
      </BrowserRouter>,
    );

    // megvárja, amíg a useEffect lefut + API válasz megjön + render
    const el = await screen.findByText("Pepperoni", {}, { timeout: 10000 });
    expect(el).toBeTruthy();
  });
});

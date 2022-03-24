import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "../mocks/index";
import { getPage } from "next-page-tester";
// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here (from the mocks folder)
// Feel free to add more files to test various other components

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Tests", () => {
  // TODO Add your react-testing-library tests here
  test("Test if the game initiates", async () => {
    const { render } = await getPage({
      route: "/",
    });
    render();
    fireEvent.change(screen.getByTestId("player1"), {
      target: { value: "player1" },
    });
    fireEvent.change(screen.getByTestId("player2"), {
      target: { value: "player2" },
      // expect(await screen.findByTestId("all-games-list")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("start-game"));
    expect(await screen.findByTestId("board")).toBeInTheDocument();
  });
});

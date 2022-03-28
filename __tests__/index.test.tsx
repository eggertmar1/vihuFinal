import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "../mocks/index";
import { getPage } from "next-page-tester";
import { EMOJI, Sign } from "../utils/constants";
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
  // test for player1 to win
  // test("Test for 4 turns, ❌ player1 should be next", async () => {
  //   const { render } = await getPage({
  //     route: "/game/143",
  //   });
  //   render();

  //   fireEvent.click(await screen.findByTestId("cell-0"));
  //   fireEvent.click(await screen.findByTestId("cell-1"));
  //   fireEvent.click(await screen.findByTestId("cell-3"));
  //   fireEvent.click(await screen.findByTestId("cell-2"));
  //   return expect(await screen.findByTestId("nextplayer")).toHaveTextContent(
  //     "❌ player1"
  //   );
  // });
});

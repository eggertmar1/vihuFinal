import React from "react";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "../mocks/index";
import { getPage } from "next-page-tester";
import { EMOJI, Sign } from "../utils/constants";
import { WinnerAnnouncement } from "../components/WinnerAnnouncement";
import { games } from "../mocks/mockData";
import Board from "../components/Board";
import Home from "../pages/index";
// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here (from the mocks folder)
// Feel free to add more files to test various other components

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Tests", () => {
  // TODO Add your react-testing-library tests here
  describe("Gameplay Tests", () => {
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
    test("Test for 5 turns, ❌ player1 should be winner", async () => {
      const { render } = await getPage({
        route: "/",
      });
      render();
      waitFor(() => {
        screen.getByTestId("cell-0").click();
        screen.getByTestId("cell-1").click();
        screen.getByTestId("cell-3").click();
        screen.getByTestId("cell-2").click();
        screen.getByTestId("cell-6").click();
        return expect(screen.getByTestId("winner")).toHaveTextContent(
          "❌ player1"
        );
      });
    });
    test("Test for 1 turn, player2 should be next", async () => {
      const { render } = await getPage({
        route: "/",
      });
      render();
      waitFor(() => {
        screen.getByTestId("cell-0").click();
        expect(screen.getByTestId("player2")).toBeInTheDocument();
      });
    });
    test("Test for a draw", async () => {
      const { render } = await getPage({
        route: "/",
      });
      render();
      waitFor(() => {
        screen.getByTestId("cell-0").click();
        screen.getByTestId("cell-1").click();
        screen.getByTestId("cell-3").click();
        screen.getByTestId("cell-4").click();
        screen.getByTestId("cell-2").click();
        screen.getByTestId("cell-5").click();
        screen.getByTestId("cell-7").click();
        screen.getByTestId("cell-6").click();
        screen.getByTestId("cell-8").click();
        return expect(screen.getByTestId("draw")).toHaveTextContent("Draw!");
      });
    });
  });

  describe("WinnerAnnouncement tests", () => {
    test("WinnerAnnouncement test for winner", async () => {
      render(<WinnerAnnouncement winner={Sign.X} game={games[1]} />);
      await waitFor(() => {
        return expect(screen.getByTestId("winner")).toHaveTextContent(
          "❌ player1"
        );
      });
    });
    test("WinnerAnnouncement test for draw", async () => {
      render(<WinnerAnnouncement winner={"DRAW"} game={games[2]} />);
      await waitFor(() => {
        return expect(screen.getByTestId("draw")).toHaveTextContent(
          "It's a draw!"
        );
      });
    });
  });

  describe("Test Board", () => {
    test("Board test for amount of X", async () => {
      const moves = [Sign.X, Sign.O, "", Sign.O, Sign.X, Sign.O, Sign.X];
      render(<Board onMove={() => {}} moves={moves} />);
      await waitFor(() => {
        return expect(screen.getAllByText(EMOJI.X)).toHaveLength(3);
      });
      await waitFor(() => {
        return expect(screen.getAllByText(EMOJI.O)).toHaveLength(3);
      });
    });
  });

  describe("Cell click validation", () => {
    test("Test for a click on a cell", async () => {
      const { render } = await getPage({
        route: "/",
      });
      render();
      waitFor(() => {
        screen.getByTestId("cell-0").click();
        return expect(screen.getByTestId("cell-0")).toHaveTextContent(EMOJI.X);
      });
    });
    test("Test for a click on a cell", async () => {
      const { render } = await getPage({
        route: "/",
      });
      render();
      waitFor(() => {
        screen.getByTestId("cell-0").click();
        screen.getByTestId("cell-1").click();
        return expect(screen.getByTestId("cell-1")).toHaveTextContent(EMOJI.O);
      });
    });
  });
});

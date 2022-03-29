// TODO create your mock api server here along with your mock data (the data should be in different files)
import React from "react";
import "@testing-library/jest-dom";
import { MockedRequest, rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { games } from "./mockData";

interface GameMoves {
  moves: string[];
}

export const server = setupServer(
  rest.post("/api/new", (req, res, ctx) => {
    return res(ctx.json(games[0]));
  }),

  rest.get("/api/list", (req, res, ctx) => {
    return res(ctx.json(games));
  }),

  rest.get("/api/game", (req, res, ctx) => {
    return res(ctx.json(games[0]));
  }),

  rest.put("/api/game", (req: MockedRequest<GameMoves>, res, ctx) => {
    console.log("HELLO", req.body);
    games[0].moves = req.body.moves;
    return res(ctx.json(games[0]));
  })
);

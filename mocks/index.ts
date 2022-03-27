// TODO create your mock api server here along with your mock data (the data should be in different files)
import React from "react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { game } from "./mockData";

export const server = setupServer(
  rest.post("/api/new", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(game[0]));
  }),

  rest.get("/api/list", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(game));
  }),

  rest.get("/api/game", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(game[0]));
  }),

  rest.put("/api/game", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(game[1]));
  })
);

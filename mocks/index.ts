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
    return res(ctx.status(200), ctx.json(game));
  }),

  rest.get("/api/list", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(game));
  }),

  rest.get("/api/game/", (req, res, ctx) => {
    var currGame;
    // for (let i = 0; i < game.length; i++) {
    //   if (game[i].id == req.params.id) {
    //     currGame = game[i];
    //   }
    // }
    // if (currGame) {
    //   return res(ctx.status(200), ctx.json({ ...currGame }));
    // } else {
    //   return res(ctx.status(404));
    // }
    return res(ctx.status(200), ctx.json(game[0]));
  }),

  rest.put("/api/game/:id", (req, res, ctx) => {
    var currGame;
    if (typeof req.body != "object") {
      req.body = { moves: [] };
    }
    game[1].moves = req.body?.moves;
    for (let i = 0; i < game.length; i++) {
      if (game[i].id == req.params.id) {
        currGame = game[i];
      }
    }

    if (typeof currGame == "undefined") {
      return res(ctx.status(404));
    }

    currGame.moves = req.body?.moves;

    return res(ctx.status(200), ctx.json(currGame));
  })
);

import { calculateWinner } from "../gameUtils";
import { Sign } from "../constants";

describe("GameUtilsTests", () => {
  // test for draw in the tic tac toe game
  it("should return draw", () => {
    const drawBoard: Sign[] = [
      Sign.O,
      Sign.X,
      Sign.O,
      Sign.O,
      Sign.X,
      Sign.O,
      Sign.X,
      Sign.O,
      Sign.X,
    ];
    expect(calculateWinner(drawBoard)).toBe("DRAW");
  });
});

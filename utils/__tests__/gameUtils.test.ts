import {
  calculateWinner,
  getPlayerNameFromSign,
  getWhosTurnItIs,
  getRandomPepTalk,
} from "../gameUtils";
import { pepTalks } from "../constants";
import { Sign } from "../constants";
import { Game } from "../../lib/gameStore";

describe("GameUtilsTests", () => {
  describe("calculateWinner", () => {
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
    it("should return X as the winner", () => {
      const winnerBoard: Sign[] = [
        Sign.X,
        Sign.O,
        Sign.O,
        Sign.O,
        Sign.X,
        Sign.O,
        Sign.X,
        Sign.O,
        Sign.X,
      ];
      expect(calculateWinner(winnerBoard)).toBe(Sign.X);
    });
    it("should return loser", () => {
      const loserBoard: Sign[] = [
        Sign.O,
        Sign.X,
        Sign.O,
        Sign.X,
        Sign.O,
        Sign.X,
        Sign.O,
        Sign.O,
        Sign.X,
      ];
      expect(calculateWinner(loserBoard)).toBe(Sign.O);
    });

    it("Should return null if the game is not finished", () => {
      const unfinishedBoard: Sign[] = [Sign.O, Sign.X, Sign.O, Sign.O, Sign.X];
      expect(calculateWinner(unfinishedBoard)).toBe(null);
    });
  });
  describe("getPlayerNameFromSign", () => {
    it("Tests both player name if they match to their signs", () => {
      const game: Game = {
        player1_name: "Player1",
        player2_name: "Player2",
        id: "1",
        moves: [],
        createdAt: new Date(),
      };
      expect(getPlayerNameFromSign(Sign.X, game)).toBe("❌ Player1 ");
      expect(getPlayerNameFromSign(Sign.O, game)).toBe("⭕ Player2 ");
      expect(getPlayerNameFromSign("", game)).toBe("");
    });
    it("Tests the getPlayerNameFromSign function if the player name is not provided", () => {
      //TODO: Switch this test out for a test that checks if the player name is not provided
      const game: Game = {
        player1_name: "",
        player2_name: "",
        id: "1",
        moves: [],
        createdAt: new Date(),
      };
      expect(getPlayerNameFromSign(Sign.X, game)).toBe("❌  ");
      expect(getPlayerNameFromSign(Sign.O, game)).toBe("⭕  ");
    });
  });
  describe("getWhosTurnItIs", () => {
    it("Tests the getWhosTurnItIs function for O", () => {
      const moves: Sign[] = [Sign.X];
      expect(getWhosTurnItIs(moves)).toBe(Sign.O);
    });
    it("Tests the getWhosTurnItIs function for X", () => {
      const moves: Sign[] = [Sign.O];
      expect(getWhosTurnItIs(moves)).toBe(Sign.X);
    });
    it("Tests the getWhosTurnItIs function when no one has made a move", () => {
      const moves: Sign[] = [];
      expect(getWhosTurnItIs(moves)).toBe(Sign.X);
    });
  });
  describe("getRandomPepTalk", () => {
    // test the getRandomPepTalk function
    it("Tests the getRandomPepTalk function", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      const pepTalk = getRandomPepTalk();
      expect(pepTalk).toEqual(pepTalks[0]);
    });
    it("Tests the getRandomPepTalk function", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.9999);
      const pepTalk = getRandomPepTalk();
      expect(pepTalk).toEqual(pepTalks[pepTalks.length - 1]);
    });
  });
});

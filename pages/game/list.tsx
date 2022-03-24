import axios from "axios";
import { useEffect, useState } from "react";
import { GameRow } from "../../components/GameRow";
import { Game } from "../../lib/gameStore";

const GameList = () => {
  const [gameList, setGameList] = useState<Game[]>();
  useEffect(() => {
    getAllGames();
  }, []);

  async function getAllGames() {
    const { data } = await axios.get("/api/list");
    setGameList(data);
  }

  return (
    <div>
      <h1 data-testid="all-games-title">🎱 All games</h1>
      <div data-testid="all-games-list">
        {gameList?.map((game) => {
          return <GameRow key={game.id} game={game} />;
        })}
      </div>
    </div>
  );
};

export default GameList;

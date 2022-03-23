import { Game } from "../lib/gameStore";
import styles from "../styles/Home.module.css";
import { Sign } from "../utils/constants";
import { getPlayerNameFromSign } from "../utils/gameUtils";

interface Props {
  winner: Sign | string;
  game: Game;
}

export function WinnerAnnouncement({ winner, game }: Props) {
  if (winner == "DRAW") {
    return (
      <h1 data-testid="draw" className={styles.title}>
        It's a draw!
      </h1>
    );
  }
  return (
    <h1 className={styles.title}>
      🎉🎊🍾🏆
      <div data-testid="winner">{getPlayerNameFromSign(winner, game)} Won</div>
    </h1>
  );
}

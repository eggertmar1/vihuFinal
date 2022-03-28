import { formatDistance } from "date-fns";
import Link from "next/link";
import { Game } from "../lib/gameStore";
import styles from "../styles/Row.module.css";
import { Sign } from "../utils/constants";
import { calculateWinner, getPlayerNameFromSign } from "../utils/gameUtils";
import Board from "./Board";

interface Props {
  game: Game;
}

export function GameRow({ game }: Props) {
  const winner = calculateWinner(game.moves);
  return (
    <Link href={`/game/${game.id}`} passHref>
      <div className={styles.row}>
        <div className={styles.gameInfo}>
          <div>
            <div>
              {getPlayerNameFromSign(Sign.X, game)}
              {winner === Sign.X ? "🎉" : null}
            </div>
            <div>
              {getPlayerNameFromSign(Sign.O, game)}
              {winner === Sign.O ? "🎉" : null}
            </div>
          </div>
          <div className={styles.dateFromNow}>
            Created:
            {formatDistance(new Date(game.createdAt), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div>
          <div className={styles.miniBoardContainer}>
            <Board readOnly onMove={() => {}} moves={game.moves} />
          </div>
        </div>
      </div>
    </Link>
  );
}

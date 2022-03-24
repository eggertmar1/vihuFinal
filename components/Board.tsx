import React, { useEffect, useState } from "react";
import styles from "../styles/Board.module.css";
import { Sign } from "../utils/constants";
import { calculateWinner, getWhosTurnItIs } from "../utils/gameUtils";
import Cell from "./Cell";

interface Props {
  onMove: (moves: string[]) => void;
  moves: Sign[] | string[];
  readOnly?: boolean;
}

export default function Board({ onMove, moves, readOnly }: Props): JSX.Element {
  const [currentPlayer, setCurrentPlayer] = useState(getWhosTurnItIs(moves));

  function handleClick(cellNumber: number) {
    if (readOnly) {
      return;
    }
    if (calculateWinner(moves)) {
      return;
    }
    if (moves[cellNumber]) {
      return;
    }

    moves[cellNumber] = currentPlayer;

    const nextPlayer = currentPlayer === Sign.X ? Sign.O : Sign.X;

    setCurrentPlayer(nextPlayer);
    onMove(moves);
  }

  return (
    <div data-testid="board" className={styles.container}>
      <div>
        <div>
          <Cell
            readOnly={readOnly}
            value={moves[0]}
            number={0}
            onClick={() => handleClick(0)}
          />
          <Cell
            readOnly={readOnly}
            value={moves[1]}
            number={1}
            onClick={() => handleClick(1)}
          />
          <Cell
            readOnly={readOnly}
            value={moves[2]}
            number={2}
            onClick={() => handleClick(2)}
          />
        </div>
        <div>
          <Cell
            readOnly={readOnly}
            value={moves[3]}
            number={3}
            onClick={() => handleClick(3)}
          />
          <Cell
            readOnly={readOnly}
            value={moves[4]}
            number={4}
            onClick={() => handleClick(4)}
          />
          <Cell
            readOnly={readOnly}
            value={moves[5]}
            number={5}
            onClick={() => handleClick(5)}
          />
        </div>
        <div>
          <Cell
            readOnly={readOnly}
            value={moves[6]}
            number={6}
            onClick={() => handleClick(6)}
          />
          <Cell
            readOnly={readOnly}
            value={moves[7]}
            number={7}
            onClick={() => handleClick(7)}
          />
          <Cell
            readOnly={readOnly}
            value={moves[8]}
            number={8}
            onClick={() => handleClick(8)}
          />
        </div>
      </div>
    </div>
  );
}

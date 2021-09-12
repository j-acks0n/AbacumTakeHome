import { useEffect, useState } from "react";
import { fetchRandomNames } from "../API";
type RoundValue =
  | "Rock"
  | "Paper"
  | "Scissors"
  | "Lizard"
  | "Spock"
  | null;
export type RoundValues = RoundValue[];
export type RoundState = RoundValues[];
const createRoundState = () =>
  Array.from(Array<RoundState>(5), (_) => Array<RoundValue>(2).fill(null));

function calculateCurrentTurn(roundState: RoundState) {
  for (var i = 0; i < roundState.length; i++) {
    roundState[i].some((value) => value == null);
    if (roundState[i].some((roundValue) => roundValue == null)) return i;
  }
  return 6;
}

export type Move = "Rock" | "Paper" | "Scissors" | "Lizard" | "Spock" | null;
export type Moves = Move[];
const moves: Moves = ["Rock", "Paper", "Scissors", "Lizard", "Spock", null];
export type Player = {
  name: string;
  score: number;
  avatarURL: string;
};

export type GameState = {
  history: RoundState;
  lastTurnWinner: number | null;
  playerOne: Player;
  playerTwo: Player;
  gameStarted: boolean;
  nowButtonClicked: boolean;
  announcement: String;
  winner: Number | null
};

export function getLocalStorage(initialValue: GameState) {
  try {
    const value = window.localStorage.getItem("gameState");
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}

export const initialisedGamestate: GameState = {
  history: createRoundState(),
  lastTurnWinner: null,
  playerOne: {
    name: "",
    score: 0,
    avatarURL: "",
  },
  playerTwo: {
    name: "",
    score: 0,
    avatarURL: "",
  },
  gameStarted: false,
  nowButtonClicked: false,
  announcement: "",
  winner: null
};

type GameStateProps = {
  initialGameState: GameState;
};

export function useGameState({ initialGameState }: GameStateProps) {
  //initialGameState = initialGameState ? initialGameState : getLocalStorage(initialisedGamestate)
  //console.log(initialGameState)
  function setLocalStorage(value: GameState) {
    try {
      window.localStorage.setItem("gameState", JSON.stringify(value));
    } catch (e) {
      // catch possible errors:
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    }
  }

  const [gameState, setGameState] = useState<GameState>(initialGameState);
  let currentTurn = calculateCurrentTurn(gameState.history);
  const whoseTurn =
    currentTurn < 6
      ? gameState.lastTurnWinner !== null
        ? gameState.lastTurnWinner === 0
          ? 1
          : 0
        : gameState.history[currentTurn][0] === null
        ? 0
        : 1
      : 0;

  const winner = gameState.playerOne.score > gameState.playerTwo.score ? 1 : 2;

  const playerTwoMoves: Moves =
    currentTurn < 6
      ? moves.filter((move) => move !== gameState.history[currentTurn][0])
      : [];
  const playerOneMoves: Moves =
    currentTurn < 6
      ? moves.filter((move) => move !== gameState.history[currentTurn][1])
      : [];

  async function createPlayer(playerNumber: number) {
    const playerName = await fetchRandomNames();
    const randomValues = playerNumber === 0 ? [1, 7] : [8, 16];
    const playerRandomAvatarNumber = Math.floor(
      Math.random() * (randomValues[1] - randomValues[0] + 1) + randomValues[0]
    );
    const playerURL = `http://placekitten.com/200/300?image=${playerRandomAvatarNumber}`;
    return {
      playerName,
      playerURL,
    };
  }

  async function gameStartHandler() {
    const playerOne = await createPlayer(0);
    const playerTwo = await createPlayer(1);
    setGameState({
      ...gameState,
      gameStarted: true,
      playerOne: {
        ...gameState.playerOne,
        name: playerOne.playerName,
        avatarURL: playerOne.playerURL,
      },
      playerTwo: {
        ...gameState.playerTwo,
        name: playerTwo.playerName,
        avatarURL: playerTwo.playerURL,
      },
    });
  }
  const nowButtonHandler = () =>
    setGameState({
      ...gameState,
      nowButtonClicked: true,
      announcement: "Round 1: it's player 1's turn first.",
    });

  function moveHandler(move: Move, player: number) {
    if (whoseTurn === player) {
      let message = "";
      let winner = null;
      let newHistory = gameState.history.slice();

      newHistory[currentTurn][whoseTurn] = move;
      const turnMoves = newHistory[currentTurn];
      currentTurn = currentTurn + 1;
      switch (turnMoves[0]) {
        case "Scissors":
          if (turnMoves[1] === "Paper") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Scissors cuts paper. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Lizard") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Scissors decapitates lizard. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Spock") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Spock smashes scissors. Player 2 scores this round! It is player 1's turn now.`;
          } else if (turnMoves[1] === "Rock") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Rock crushes scissors. Player 2 scores this round! It is player 1's turn now.`;
          } else {
            message = `Current turn is: ${currentTurn}. Player 1 just played ${turnMoves[0]}, it is player 2's turn to play now!`;
          }
          break;
        case "Paper":
          if (turnMoves[1] === "Rock") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Paper covers rock. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Spock") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Paper disproves Spock. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Lizard") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Lizard eats paper. Player 2 scores this round! It is player 1's turn now.`;
          } else if (turnMoves[1] === "Scissors") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Spock smashes scissors. Player 2 scores this round! It is player 1's turn now.`;
          } else {
            message = `Current turn is: ${currentTurn}. Player 1 just played ${turnMoves[0]}, it is player 2's turn to play now!`;
          }
          break;
        case "Rock":
          if (turnMoves[1] === "Lizard") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Rock crushes lizard. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Scissors") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Rock crushes scissors. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Paper") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Paper covers rock. Player 2 scores this round! It is player 1's turn now.`;
          } else if (turnMoves[1] === "Spock") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Spock vaporizes rock. Player 2 scores this round! It is player 1's turn now.`;
          } else {
            message = `Current turn is: ${currentTurn}. Player 1 just played ${turnMoves[0]}, it is player 2's turn to play now!`;
          }
          break;
        case "Lizard":
          if (turnMoves[1] === "Spock") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Lizard poisons Spock. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Paper") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Lizard eats paper. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Scissors") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Scissors decapitates lizard. Player 2 scores this round! It is player 1's turn now.`;
          } else if (turnMoves[1] === "Rock") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Rock crushes lizard. Player 2 scores this round! It is player 1's turn now.`;
          } else {
            message = `Current turn is: ${currentTurn}. Player 1 just played ${turnMoves[0]}, it is player 2's turn to play now!`;
          }
          break;
        case "Spock":
          if (turnMoves[1] === "Scissors") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Spock smashes scissors. Player 1 scores this round! It is player 2's turn now. `;
          } else if (turnMoves[1] === "Rock") {
            winner = 0;
            message = `Current turn is: ${currentTurn}. Spock vaporizes rock. Player 1 scores this round! It is player 2's turn now.`;
          } else if (turnMoves[1] === "Paper") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Paper disproves Spock. Player 2 scores this round! It is player 1's turn now.`;
          } else if (turnMoves[1] === "Lizard") {
            winner = 1;
            message = `Current turn is: ${currentTurn}. Lizard poisons Spock. Player 2 scores this round! It is player 1's turn now.`;
          } else {
            message = `Current turn is: ${currentTurn}. Player 1 just played ${turnMoves[0]}, it is player 2's turn to play now!`;
          }
          break;
        case null:
          message = `Current turn is: ${currentTurn}. Player 2 just played ${turnMoves[1]}, it is player 1's turn!`;
          break;
        default:
          winner = null;
          break;
      }
      setGameState({
        ...gameState,
        history: newHistory,
        announcement: message ,
        lastTurnWinner: winner !== null ? winner : null,
        playerOne: {
          ...gameState.playerOne,
          score:
            winner !== null && winner === 0
              ? gameState.playerOne.score + 1
              : gameState.playerOne.score,
        },
        playerTwo: {
          ...gameState.playerTwo,
          score:
            winner !== null && winner === 1
              ? gameState.playerTwo.score + 1
              : gameState.playerTwo.score,
        },
        winner: currentTurn === 5 && winner != null ? gameState.playerOne.score > gameState.playerTwo.score ? 0 :  1 : null
      });
    }
  }
  async function restartGame() {
    const firstPlayer = await createPlayer(0);
    const secondPlayer = await createPlayer(1);
    setGameState({
      history: createRoundState(),
      playerOne: {
        name: firstPlayer.playerName,
        avatarURL: firstPlayer.playerURL,
        score: 0,
      },
      playerTwo: {
        name: secondPlayer.playerName,
        avatarURL: secondPlayer.playerURL,
        score: 0,
      },
      gameStarted: true,
      nowButtonClicked: false,
      announcement: "",
      lastTurnWinner: null,
      winner: null
    });
  }

  // function flushStorage() {
  //   //setLocalStorage(initialisedGamestate);
  //   setGameState(initialisedGamestate);
  // }
  useEffect(() => {
    setLocalStorage(gameState);
  }, [gameState]);
  return {
    currentTurn,
    gameState,
    winner,
    gameStartHandler,
    nowButtonHandler,
    playerOneMoves,
    playerTwoMoves,
    moveHandler,
    restartGame,
    // flushStorage,
  };
}

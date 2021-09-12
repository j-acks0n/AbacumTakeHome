import { Move, Moves } from "./GameState";
import { ReactComponent as LizardIcon } from "../images/icon-lizard.svg";
import { ReactComponent as PaperIcon } from "../images/icon-paper.svg";
import { ReactComponent as RockIcon } from "../images/icon-rock.svg";
import { ReactComponent as ScissorsIcon } from "../images/icon-scissors.svg";
import { ReactComponent as SpockIcon } from "../images/icon-spock.svg";
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core";
type PlayerMovesProps = {
  moves: Moves;
  moveHandler: (move: Move, player: number) => void;
  player: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
    },
    move: {
      margin: "0 0 50px 0",
      '&:hover': {
        transform: "translateY(0) scale(1.4)"
     }
    },
  })
);

export default function PlayerMoves({
  moves,
  moveHandler,
  player,
}: PlayerMovesProps) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const createProps = (move: Move) => {
    return {
      value: move,
      onClick: () => moveHandler(move, player),
    };
  };
  return (
    <>
      <div className={classes.root} />
      {moves.map((move) => {
        switch (move) {
          case "Lizard":
            return (
              <LizardIcon
                key={`player${player + 1}_${move.toLowerCase()}`}
                {...createProps(move)}
                data-testid={`player${player + 1}_lizard_move`}
                className={classes.move}
                fill="white"
              />
            );
          case "Paper":
            return (
              <PaperIcon
                key={`player${player + 1}_${move.toLowerCase()}`}
                {...createProps(move)}
                data-testid={`player${player + 1}_paper_move`}
                className={classes.move}
                fill="white"
              />
            );
          case "Rock":
            return (
              <RockIcon
                key={`player${player + 1}_${move.toLowerCase()}`}
                {...createProps(move)}
                data-testid={`player${player + 1}_rock_move`}
                className={classes.move}
                fill="white"
              />
            );
          case "Scissors":
            return (
              <ScissorsIcon
                key={`player${player + 1}_${move.toLowerCase()}`}
                {...createProps(move)}
                data-testid={`player${player + 1}_scissors_move`}
                className={classes.move}
                fill="white"
              />
            );
          case "Spock":
            return (
              <SpockIcon
                key={`player${player + 1}_${move.toLowerCase()}`}
                {...createProps(move)}
                data-testid={`player${player + 1}_spock_move`}
                className={classes.move}
                fill="white"
              />
            );
          default:
            return (
              <span
                key={`player${player + 1}_null}`}
                {...createProps(null)}
                data-testid={`player${player + 1}_null_move`}
                className={classes.move}
              />
            );
        }
      })}
    </>
  );
}

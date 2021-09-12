import {
  Avatar,
  makeStyles,
  createStyles,
  Typography,
  Grid,
  Button,
  Theme,
  useTheme,
} from "@material-ui/core";
import { Player } from "./GameState";
import "fontsource-roboto";
import "./Lobby.css";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
type LobbyProps = {
  nowButtonHandler: () => void;
  playerOne: Player;
  playerTwo: Player;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    heading: {
      padding: "70px 0 50px 0",
      color: "white",
    },
    // grid: {
    //   margin: "auto",
    //   maxWidth: "auto",
    //   padding: "0 0 30px 0",
    // },
    instruction: {
      maxWidth: 400,
      margin: "auto",
      boxShadow: "",
      padding: "40px 30px 50px 30px",
      color: "white",
      background: "white",
      borderRadius: "8px",
    },
    instructionHeading: {
      color: "black",
      margin: "0 0 20px 0",
    },
    instructionImage: {
      overflow: "inherit",
    },
    move: {
      color: "white",
    },
    innerGrid: {
      flexDirection: "column",
      display: "flex",
      height: "100%",
      alignItems: "center",
    },
    avatar: {
      width: "250px",
      height: "250px",
      marginBottom: "20px",
    },
    score: {
      color: "white",
    },
    button: {
      margin: "20px 0 0 0",
      maxWidth: "32em",
      maxHeight: "9em",
      minWidth: "32em",
      minHeight: "9em",
      [theme.breakpoints.up("sm")]: {
        margin: "100px 0 0 0 ",
      },
    },
    name: {
      color: "white",
    },
  })
);

export function Lobby({ nowButtonHandler, playerOne, playerTwo }: LobbyProps) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const nodeRef = useRef(null)

  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        classNames="fade"
        timeout={500}
        nodeRef={nodeRef}
        // onEnter={() => setShowComponent(true)}
        // onExited={() => setShowComponent(false)}
      >
        <div key="lobby">
          <Typography variant="h1" className={classes.heading}>
            Lobby
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs className={classes.innerGrid}>
              <Avatar
                alt={"Player one avatar"}
                src={playerOne.avatarURL}
                data-testid={`playerOne_avatar`}
                className={classes.avatar}
              />
              <Typography
                variant="h3"
                data-testid={`playerOne_name`}
                className={classes.name}
              >
                {playerOne.name}
              </Typography>
              <Typography
                variant="h5"
                data-testid={`playerOne_score`}
                className={classes.score}
              >
                Score: {playerOne.score}
              </Typography>
            </Grid>
            <Grid item xs className={classes.innerGrid}>
              <Avatar
                alt={"Player one avatar"}
                src={playerTwo.avatarURL}
                data-testid={`playerTwo_avatar`}
                className={classes.avatar}
              />
              <Typography
                variant="h3"
                data-testid={`playerTwo_name`}
                className={classes.name}
              >
                {playerTwo.name}
              </Typography>
              <Typography
                variant="h5"
                data-testid={`playerTwo_score`}
                className={classes.score}
              >
                Score: {playerTwo.score}
              </Typography>
            </Grid>
          </Grid>
          {/* Big button saying 'Start playing' */}
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={nowButtonHandler}
          >
            Now!
          </Button>
        </div>
      </CSSTransition>
    </>
  );
}

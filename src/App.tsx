import Welcome from "./components/Welcome";
import { Lobby } from "./components/Lobby";
import "./App.css";
import {
  GameState,
  getLocalStorage,
  initialisedGamestate,
  useGameState,
} from "./components/GameState";
import PlayerMoves from "./components/Moves";
import {
  makeStyles,
  createStyles,
  Avatar,
  useTheme,
  Theme,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

import wallpaper from "./images/wallpaper.jpg";
import "fontsource-roboto";

export type AppProps = {
  initialisedTestGameState?: GameState;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      backgroundImage: `url(${wallpaper})`,
      backgroundRepeat: "no-repeat",
      height: "100vh",
      overflow: "scroll",
    },
    heading: {
      padding: "70px 0 50px 0",
      color: "white",
    },
    // grid: {
    //   margin: "auto",
    //   maxWidth: "auto",
    //   padding: "0 0 30px 0",
    // },
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
      margin: "0 0 0 0",
      maxWidth: "25m",
      maxHeight: "9em",
      minWidth: "25em",
      minHeight: "9em",
      [theme.breakpoints.up("sm")]: {
        margin: "0 0 0 0 ",
        maxWidth: "32em",
        maxHeight: "9em",
        minWidth: "32em",
        minHeight: "9em",
      },
    },
    name: {
      color: "white",
    },
    announcementHeading: {
      padding: "100px 0",
      color: "white",
    },
    announcement: {
      margin: "0 0 200px 0",
    },
  })
);

function App({ initialisedTestGameState }: AppProps) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
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
  } = useGameState({
    initialGameState: initialisedTestGameState
      ? initialisedTestGameState
      : getLocalStorage(initialisedGamestate),
  });
  return (
    <>
      <div className={classes.root}>
        {/* Game hadn't begun, display welcome screen */}
        {/* <button onClick={flushStorage}>Flush</button> */}
        {!gameState.gameStarted && (
          <Welcome gameStartHandler={gameStartHandler} />
        )}
        {/* Game started but now button hadn't been clicked, display lobby */}
        {gameState.gameStarted && !gameState.nowButtonClicked && (
          <Lobby
            nowButtonHandler={nowButtonHandler}
            playerOne={gameState.playerOne}
            playerTwo={gameState.playerTwo}
          />
        )}
        {/* Game screen */}
        {gameState.gameStarted && gameState.nowButtonClicked && (
          <>
            {/* Player 1 column */}
            {winner && currentTurn === 6 ? (
              <>
                <div
                  data-testid={`announcement`}
                  className={classes.announcement}
                >
                  <Typography
                    variant="h1"
                    className={classes.announcementHeading}
                  >
                    Winner
                  </Typography>
                  {gameState.winner === 0 ? (
                    <>
                      <div className={classes.innerGrid}>
                        <Avatar
                          alt={"Player one avatar"}
                          src={gameState.playerOne.avatarURL}
                          data-testid={`playerOne_avatar`}
                          className={classes.avatar}
                        />
                        <Typography
                          variant="h4"
                          data-testid={`playerOne_name`}
                          className={classes.name}
                        >
                          {gameState.playerOne.name}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={classes.innerGrid}>
                        {/* <span data-testid={`playerOne_name`}>
                          {gameState.playerOne.name}
                        </span>
                        <img
                          data-testid={`playerOne_avatar`}
                          src={gameState.playerOne.avatarURL}
                          alt={"Player one avatar"}
                        /> */}
                        <Avatar
                          alt={"Player two avatar"}
                          src={gameState.playerTwo.avatarURL}
                          data-testid={`playerTwo_avatar`}
                          className={classes.avatar}
                        />
                        <Typography
                          variant="h4"
                          data-testid={`playerTwo_name`}
                          className={classes.name}
                        >
                          {gameState.playerTwo.name}
                        </Typography>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  data-testid={`restart_game`}
                  onClick={restartGame}
                >
                  Restart game
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  className={classes.heading}
                  data-testid={`announcement`}
                >
                  {gameState.announcement}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs className={classes.innerGrid}>
                    <Avatar
                      alt={"Player one avatar"}
                      src={gameState.playerOne.avatarURL}
                      data-testid={`playerOne_avatar`}
                      className={classes.avatar}
                    />
                    <Typography variant="h3" className={classes.name}>
                      Player 1
                    </Typography>
                    <Typography
                      variant="h4"
                      data-testid={`playerOne_name`}
                      className={classes.name}
                    >
                      {gameState.playerOne.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      data-testid={`playerOne_score`}
                      className={classes.score}
                    >
                      Score: {gameState.playerOne.score}
                    </Typography>
                    <PlayerMoves
                      moves={playerOneMoves}
                      player={0}
                      moveHandler={moveHandler}
                    />
                  </Grid>
                  <Grid item xs className={classes.innerGrid}>
                    <Avatar
                      alt={"Player one avatar"}
                      src={gameState.playerTwo.avatarURL}
                      data-testid={`playerTwo_avatar`}
                      className={classes.avatar}
                    />
                    <Typography variant="h3" className={classes.name}>
                      Player 2
                    </Typography>
                    <Typography
                      variant="h4"
                      data-testid={`playerTwo_name`}
                      className={classes.name}
                    >
                      {gameState.playerTwo.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      data-testid={`playerTwo_score`}
                      className={classes.score}
                    >
                      Score: {gameState.playerTwo.score}
                    </Typography>
                    <PlayerMoves
                      moves={playerTwoMoves}
                      player={1}
                      moveHandler={moveHandler}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;

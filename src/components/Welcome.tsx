import { Grid, Typography, Button } from "@material-ui/core";
import { ReactComponent as LizardIcon } from "../images/icon-lizard.svg";
import { ReactComponent as PaperIcon } from "../images/icon-paper.svg";
import { ReactComponent as RockIcon } from "../images/icon-rock.svg";
import { ReactComponent as ScissorsIcon } from "../images/icon-scissors.svg";
import { ReactComponent as SpockIcon } from "../images/icon-spock.svg";
import { ReactComponent as Rule } from "../images/image-rules.svg";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import "fontsource-roboto";
import "./Welcome.css";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
type WelcomeProps = {
  gameStartHandler: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    heading: {
      padding: "125px 0 50px 0",
      color: "white",
    },
    grid: {
      margin: "auto",
      maxWidth: 500,
      padding: "0 0 30px 0",
    },
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
    button: {
      margin: "60px 0 0 0",
      maxWidth: "32em",
      maxHeight: "9em",
      minWidth: "32em",
      minHeight: "9em",
    },
  })
);

const Welcome = ({ gameStartHandler }: WelcomeProps) => {
  const nodeRef = useRef(null)
  const classes = useStyles();
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
        <div className={classes.root}>
          <Typography variant="h3" className={classes.heading}>
            Rock, Paper, Scissors, Lizard, Spock
          </Typography>
          <Grid container spacing={6} className={classes.grid}>
            <Grid item xs>
              <LizardIcon data-testid={`lizard_image`} fill="white" />
            </Grid>
            <Grid item xs>
              <PaperIcon
                data-testid={`paper_image`}
                className={classes.move}
                fill="white"
              />
            </Grid>
            <Grid item xs>
              <RockIcon
                data-testid={`rock_image`}
                className={classes.move}
                fill="white"
              />
            </Grid>
            <Grid item xs>
              <ScissorsIcon
                data-testid={`scissors_image`}
                className={classes.move}
                fill="white"
              />
            </Grid>
            <Grid item xs>
              <SpockIcon
                data-testid={`spock_image`}
                className={classes.move}
                fill="white"
              />
            </Grid>
          </Grid>
          {/* Icons */}
          <div className={classes.instruction}>
            <Typography
              gutterBottom
              variant="h4"
              component="h2"
              className={classes.instructionHeading}
            >
              Instruction
            </Typography>
            <Rule className={classes.instructionImage} />
          </div>

          {/* Big button saying 'Start playing' */}
          <Button
            variant="contained"
            onClick={gameStartHandler}
            className={classes.button}
            color="primary"
          >
            Start Playing
          </Button>
        </div>
      </CSSTransition>
    </>
  );
};

export default Welcome;

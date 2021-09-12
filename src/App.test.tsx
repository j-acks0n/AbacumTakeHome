import 'jest-canvas-mock'
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import {
  GameState,
  getLocalStorage,
  initialisedGamestate,
} from "./components/GameState";



it("renders without crashing", () => {
  //Render the App component
  render(<App />);
});

it("renders the welcome screen and checks if the 5 move icons and a button that says Start Playing are rendered", () => {
  //Render the App component
  render(<App />);
  // Validate that the images of the moves are rendered
  expect(screen.getByTestId("lizard_image")).toBeInTheDocument();
  expect(screen.getByTestId("paper_image")).toBeInTheDocument();
  expect(screen.getByTestId("rock_image")).toBeInTheDocument();
  expect(screen.getByTestId("scissors_image")).toBeInTheDocument();
  expect(screen.getByTestId("spock_image")).toBeInTheDocument();

  //Check that Start playing button exists
  const startPlayingButton = screen.getAllByText("Start Playing");
  expect(startPlayingButton).toBeTruthy();
});

it("checks if clicking the Start Playing button causes two players (with their names and avatars), the current score and a button that says 'Now!' to be rendered", async () => {
  //Render the App component
  render(<App />);
  //Clicking the Start Playing button
  fireEvent.click(screen.getByText("Start Playing"));
  // Validate that the info of player one are rendered
  await waitFor(() => {
    expect(screen.getByTestId("playerOne_name")).toBeInTheDocument();
    expect(screen.getByTestId("playerOne_score")).toBeInTheDocument();
    expect(screen.getByTestId("playerTwo_name")).toBeInTheDocument();
    expect(screen.getByTestId("playerTwo_score")).toBeInTheDocument();
    expect(screen.getByTestId("playerOne_avatar")).toBeInTheDocument();
    expect(screen.getByTestId("playerTwo_avatar")).toBeInTheDocument();
  });

  //Verify if the now button exists
  const nowButton = screen.getAllByText("Now!");
  expect(nowButton).toBeTruthy();
});

it('renders the choices of each player after the "Now!" button is clicked', async () => {
  /*
  The following game state with gameStarted as true
  and nowButtonClicked as false will allow the game to render
  from the the lobby (the screen where two players are shown with a button 'Now!')
  */
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: false,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  fireEvent.click(screen.getByText("Now!"));

  await waitFor(() => {
    for (var i = 1; i < 3; i++) {
      expect(screen.getByTestId(`player${i}_lizard_move`)).toBeInTheDocument();
      expect(screen.getByTestId(`player${i}_paper_move`)).toBeInTheDocument();
      expect(screen.getByTestId(`player${i}_rock_move`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`player${i}_scissors_move`)
      ).toBeInTheDocument();
      expect(screen.getByTestId(`player${i}_spock_move`)).toBeInTheDocument();
    }
  });
});

it("checks whether the score gets updated after a round is played with the result being displayed 'Lizard poisons Spock", async () => {
  /*
  The following game state with gameStarted as true
  and nowButtonClicked as false will allow the game to render
  from the the game screen (the screen where two players are shown with their choices, score and result)
  */
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one makes the lizard move
  fireEvent.click(screen.getByTestId(`player1_lizard_move`));
  //Player two makes the Spock move
  fireEvent.click(screen.getByTestId(`player2_spock_move`));
  await waitFor(() => {
    // expect(screen.getByTestId(`announcement`)).toHaveValue(
    //   `Current turn is: 1. Lizard poisons Spock. Player 1 scores this round! It is player 2's turn now.`
    // );
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Lizard poisons Spock. Player 1 scores this round!"
    );
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
  });
});

it("shows the winner and the 'Restart game' button after 5 rounds", async () => {
  /*
  The following game state with gameStarted as true
  and nowButtonClicked as false will allow the game to render
  from the the game screen (the screen where two players are shown with their choices, score and result)
  */
  const testGameState: GameState = {
    history: [
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      [null, null],
    ],
    lastTurnWinner: 0,
    playerOne: {
      name: "TestOne",
      score: 4,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player two makes the Spock move
  fireEvent.click(screen.getByTestId(`player2_spock_move`));
  //Player one makes the lizard move
  fireEvent.click(screen.getByTestId(`player1_lizard_move`));

  await waitFor(() => {
    //Verify if the player with the highest score at round 5 is the winner
    expect(screen.getByTestId(`playerOne_name`)).toBeInTheDocument();
    expect(screen.getByTestId("playerOne_avatar")).toBeInTheDocument();
    //Verify if the restart game button exists
    const restartButton = screen.getAllByText("Restart game");
    expect(restartButton).toBeTruthy();
  });
});

it("renders the welcome screen after 'Restart game' button is clicked", async () => {
  /*
  The following game state with gameStarted as true
  and nowButtonClicked as false will allow the game to render
  from the the game screen (the screen where two players are shown with their choices, score and result)
  */
  const testGameState: GameState = {
    history: [
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
    ],
    lastTurnWinner: 0,
    playerOne: {
      name: "TestOne",
      score: 5,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: 0,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Clicking Restart Game
  fireEvent.click(screen.getByTestId(`restart_game`));

  await waitFor(() => {
    // Validate that the images of the moves are rendered
    expect(screen.getByTestId("playerOne_name")).toBeInTheDocument();
    expect(screen.getByTestId("playerOne_score")).toBeInTheDocument();
    expect(screen.getByTestId("playerTwo_name")).toBeInTheDocument();
    expect(screen.getByTestId("playerTwo_score")).toBeInTheDocument();
    expect(screen.getByTestId("playerOne_avatar")).toBeInTheDocument();
    expect(screen.getByTestId("playerTwo_avatar")).toBeInTheDocument();
  });
});

it("shows the player two as the winner and the 'Restart game' button after 5 rounds", async () => {
  /*
    The following game state with gameStarted as true
    and nowButtonClicked as false will allow the game to render
    from the the game screen (the screen where two players are shown with their choices, score and result)
    */

  const testGameState: GameState = {
    history: [
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
    ],
    lastTurnWinner: 0,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 5,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: 1,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);

  await waitFor(() => {
    //Verify if the player with the highest score at round 5 is the winner
    expect(screen.getByTestId(`playerTwo_name`)).toBeInTheDocument();
    expect(screen.getByTestId("playerTwo_avatar")).toBeInTheDocument();
    //Verify if the restart game button exists
    const restartButton = screen.getAllByText("Restart game");
    expect(restartButton).toBeTruthy();
  });
});

it("tests whether the game initialises the state with the saved localStorage gamestate", () => {
  //Store basic initialised gameState
  localStorage.setItem("gameState", JSON.stringify(initialisedGamestate));
  /**
   * This gameState is entirely different to the value stored.
   * If the localStorage is setup properly, this particular gameState should be ignored.
   */
  const testGameState: GameState = {
    history: [
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
    ],
    lastTurnWinner: 0,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 5,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: 1,
  };
  //Check local storage to see if the value is correct
  const localStorageValue = getLocalStorage(testGameState);
  expect(localStorageValue).toEqual(initialisedGamestate);
});

it("provides an input of null to moveHandler and no move should be made", async () => {
  /**
   * This game state has one remaining move, when a move is made with null value, the gameState value remains the same
   */
  const testGameState: GameState = {
    history: [
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", "Spock"],
      ["Lizard", null],
    ],
    lastTurnWinner: 0,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 5,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };

  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Clicking the null move
  fireEvent.click(screen.getByTestId(`player2_null_move`));
  await waitFor(() => {
    //Check if all the moves are still the same and a move hadn't been played
    expect(screen.getByTestId(`player2_paper_move`)).toBeInTheDocument();
    expect(screen.getByTestId(`player2_rock_move`)).toBeInTheDocument();
    expect(screen.getByTestId(`player2_scissors_move`)).toBeInTheDocument();
    expect(screen.getByTestId(`player2_spock_move`)).toBeInTheDocument();
  });
});

it("renders the updated score for player 1 and the result after player 1 plays Scissors and player 2 plays paper", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays scissors
  fireEvent.click(screen.getByTestId(`player1_scissors_move`));
  //Player two plays paper
  fireEvent.click(screen.getByTestId(`player2_paper_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Scissors cuts paper. Player 1 scores this round!"
    );
  });
});


it("renders the updated score for player 1 and the result after player 1 plays paper and player 2 plays rock", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays paper
  fireEvent.click(screen.getByTestId(`player1_paper_move`));
  //Player two plays rock
  fireEvent.click(screen.getByTestId(`player2_rock_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Paper covers rock. Player 1 scores this round!"
    );
  });
});


it("renders the updated score for player 1 and the result after player 1 plays rock and player 2 plays lizard", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays rock
  fireEvent.click(screen.getByTestId(`player1_rock_move`));
  //Player two plays lizard
  fireEvent.click(screen.getByTestId(`player2_lizard_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Rock crushes lizard. Player 1 scores this round!"
    );
  });
});


it("renders the updated score for player 1 and the result after player 1 plays lizard and player 2 plays spock", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays lizard
  fireEvent.click(screen.getByTestId(`player1_lizard_move`));
  //Player two plays spock
  fireEvent.click(screen.getByTestId(`player2_spock_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Lizard poisons Spock. Player 1 scores this round!"
    );
  });
});


it("renders the updated score for player 1 and the result after player 1 plays spock and player 2 plays scissors", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays spock
  fireEvent.click(screen.getByTestId(`player1_spock_move`));
  //Player two plays scissors
  fireEvent.click(screen.getByTestId(`player2_scissors_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Spock smashes scissors. Player 1 scores this round!"
    );
  });
});

it("renders the updated score for player 1 and the result after player 1 plays scissors and player 2 plays lizard", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays scissors
  fireEvent.click(screen.getByTestId(`player1_scissors_move`));
  //Player two plays lizard
  fireEvent.click(screen.getByTestId(`player2_lizard_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Scissors decapitates lizard. Player 1 scores this round!"
    );
  });
});


it("renders the updated score for player 1 and the result after player 1 plays lizard and player 2 plays paper", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays lizard
  fireEvent.click(screen.getByTestId(`player1_lizard_move`));
  //Player two plays paper
  fireEvent.click(screen.getByTestId(`player2_paper_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Lizard eats paper. Player 1 scores this round!"
    );
  });
});


it("renders the updated score for player 1 and the result after player 1 plays paper and player 2 plays spock", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays paper
  fireEvent.click(screen.getByTestId(`player1_paper_move`));
  //Player two plays spock
  fireEvent.click(screen.getByTestId(`player2_spock_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Paper disproves Spock. Player 1 scores this round!"
    );
  });
});



it("renders the updated score for player 1 and the result after player 1 plays spock and player 2 plays rock", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays spock
  fireEvent.click(screen.getByTestId(`player1_spock_move`));
  //Player two plays rock
  fireEvent.click(screen.getByTestId(`player2_rock_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Spock vaporizes rock. Player 1 scores this round!"
    );
  });
});



it("renders the updated score for player 1 and the result after player 1 plays rock and player 2 plays scissors", async () => {
  const testGameState: GameState = {
    history: [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
    lastTurnWinner: null,
    playerOne: {
      name: "TestOne",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=1",
    },
    playerTwo: {
      name: "TestTwo",
      score: 0,
      avatarURL: "http://placekitten.com/200/300?image=2",
    },
    gameStarted: true,
    nowButtonClicked: true,
    announcement: "",
    winner: null,
  };
  //Render the App component
  render(<App initialisedTestGameState={testGameState} />);
  //Player one plays rock
  fireEvent.click(screen.getByTestId(`player1_rock_move`));
  //Player two plays scissors
  fireEvent.click(screen.getByTestId(`player2_scissors_move`));
  await waitFor(() => {
    expect(screen.getByTestId(`playerOne_score`)).toHaveTextContent("1");
    expect(screen.getByTestId("announcement")).toHaveTextContent(
      "Rock crushes scissors. Player 1 scores this round!"
    );
  });
});

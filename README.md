# Abacum Frontend Engineer Test (Jackson Hong)

## Task
The task was to create a simple two players game called "Rock, Paper, Scissors, Lizard, Spock" with the rule of the game according to the following:

- Scissors cuts paper
- Paper covers rock
- Rock crushes lizard
- Lizard poisons Spock
- Spock smashes scissors
- Scissors decapitates lizard
- Lizard eats paper
- Paper disproves Spock
- Spock vaporizes rock
- Rock crushes scissors

## Overview

### Story
All stories were completed including the bonus story 4

### Architecture
- The app were initialsed via "create react app" with ts.
- Installed material ui for styling.
- Fetched avatar from placekitten.

The app centralised the game state at a file called "GameState", the reason for that was because tthe max layers of components at once was 2, which meant that useContext API would be an overkill. I was looking for simplicity, therefore a useState hook was sufficient in this case.

App.tsx was responsible for distributing the neccessary states to the perspective components.

### Tests
85.98 percent coverage which includes the core logic of the game.

### Layout
Every page on the application is built with usability for all screen size in mind.

### Animation / Transition
Minimal amount of transition were applied for both the welcome and lobyy screen.

### State persistence
The use of localStorage meant that the state will always be perserved.

## Help

### How to install?
1. Execute yarn install
2. Exeucte yarn build
3. Execute serve -s build
4. At the end of step 3, there will be a local host link, open that link in the browser

Now you have the game open! Just try it out!

### Want to reset on a certain screen?
1. Open up the console log on the browser
2. Type "localStorage.clear();" and enter
3. Reload the page

Now you should see the welcome screen!

### How to run the test?
1. Execute yarn test --coverage

Be aware that for some tests, it fails at times. Re-do the test if that happens.


# Final
Thanks for the opportunity! My email is jacksonhong_@outlook.com

Look forward to hearing from you!

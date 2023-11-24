# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #1: The Game

## ReadMe Project 1 - Minesweeper

## Description

The Three Little Pigs - Wolfsweeper is a game based on Minesweeper, the classic Windows PC game. The set-up follows the folk tale of the Three Little Pigs.
Each level of the game represents a house, build of a specific material as per the story. 
The Big Bad Wolf has help from his pack, and they are trying to get into your house. In order to keep them away, you have to lock them all out.

## Game’s Link

The Three Little Pigs - Wolfsweeper

## Getting Started / Code Installation

If you want it to run locally on your machine, instead of playing online:
* Go to my public GitHub repository https://github.com/Annel18/Minesweeper
* Fork then Clone in via this green button where it is written <>code and copy the link from SSH or HTTPS
* Open the terminal and change the current working directory to the location where you want the cloned directory
* Type git clone, and then paste the URL of SSH link you copied earlier in Step 2
* Press Enter to create your local clone. You have not the code and all the necessary sources to run it locally on your machine

## Timeframe & Working Team (Solo/Pair/Group)

This first project was a solo project
I had one week to build a grid-base game using JavaScript, HTML and CSS

## Technologies Used

HTML
* Calling links to the special fonts related to the stylesheet;
* Setting up the basic layout and DOM structure that JS will be able to query;
* Text for the title, level buttons and rules button;
* Text for the pop-up elements that will appear when required, when clicking on the rules button, or at the end of the game whether won or lost.

CSS
* Grid container is using Flexbox;
* Positioning each element adequately for the browser;
* The colour scheme for each number appearing in the grid has been set up through variables;
* Popup elements have a ‘position: absolute’ and therefore will cover the game with the desired instructions. A close button has been added to these pop-ups;
* Clickable elements (buttons and each cell of the grid) have been assigned a ‘cursor: pointer’ when the mouse hovers over them, the look of these also changes to inform the player which selection is currently active;
* @media queries have been added to remove sides and unnecessary elements when the screen is too narrow.
* Some of the selectors have the “:hover” extension that allows specific styling to be applied only when hovering the elements. 

JavaScript
* Left-click and Right-click events have been added to either open or lock a cell, the first click will initialise the game
‘setInterval’ to start the clock as soon as the game is started, this time will be the game’s score in seconds;
* The grid is built through JS depending on the chosen level;
* The position of the Wolves (mines) is random and redistributed each time the game is reset or the chosen level has changed;
* The grid has to recalculate the numbers appearing in each cell according to their adjacency to the wolves;
* The grid is updated accordingly when the chosen level changes or if the unfortunate faint made the player click on a wolf on the first click;
* A recursive algorithm has been implemented in order to open all surrounding cells if no wolf is present in any of them.
* Pop-up messages are displayed at the end of the game, whether win or lost. 
* If the player wins the game, the message will be tailored to show the score for the chosen level.
* A pop-up form will appear if the player has chosen to play on a customised level. The player has then the possibility to choose its own variables that will dictate the custom set-up of the grid

## Planning

* I started by doing a wireframe sketch for the layout of the browser page
* Searched ideas for a theme that would fit well with the dynamic of the chosen game and collated on Pinterest images and icons that will be used later in the developed game
* I wrote a pseudocode that breaks down the various tasks 
* Implemented the basic HTML and CSS to have to get started, and have an area on the page to host the grid that will be built through JS
* I used Trello as a project management tool to track my progress for this sprint and used labels to track completion 

## Build/Code Process

The management of the process can be read in the snapshot of my Trello board above.
I managed to stick to the plan all week long, and I didn't have any backlog and was able to clearout bugs as they came

Day 1
* Wireframe
* Pseudocode
* Implementing basic HTML and CSS to be able to call the relement elements of the DOM in JavaScript
* Created the various grid sized for each level in JS
* Created a function to generate the mineField() 

Day 2
* Adding the numbers around the wolves
* Working out the edges conditions. These conditions will have to be used many times throughout the code. I, therefore ultimately, implemented them within a class that returns the conditional arrays. This class will be called in each function needing it. This class has been named ‘SurroundingCells’, as it ultimately returns the surrounding cells indexes of a specific cell in question.
* Implemented the reset button to be able to reset the game without having to refresh the game
* Implemented the clock that counts the seconds until the end of the game

Day 3
* Figure out the recursive loop to open all the empty cells (the class ‘SurroundingCells’ has proven to be very helpful to implement this recursive loop)
* Adding the flag function and decreasing the wolf count
* If the flag is removed, the wolf could should increase increase again
* Disable left-click where the flag have been placed
* Re-enable left-click if flag removed

Day 4
* Update the colour of the cells according to the numbers they are holding
* Working out the winning conditions - when all safe cells have been opened
* Losing condition - when you click on a wolf - the clock stops and all the wolves are revealed

Day 5
* I spend this day updated the HTML and CSS to use the appropriate images and graphics suiting the theme
* Adjusted the size and colour of the cells to remain visible with the various background colours
* Add cursor: pointer to the buttons and clickable cells and added hover styles in CSS to make more visible to the user where they are about to click
* Added all the popup div in HTML and assigned a CSS style of display: none;
* Added further EventListener in JavaScript to reassign the style of these popups to be visible when specific buttons are clicked and when the game has ended.

Day 6
* Implementing the custom grid by asking the player to fill out a form and choose their own settings that will then be used in JavaScript to update the grid accordingly

* Various levels give various grid sizes
![](README-images/Screenshot 2023-11-11 at 14.31.33.png)
* The Game Rules call for this popup to appear

* If the player clicks on an empty cell - all empty cells around are revealed

* If the player clicks on a wolf - this message appears, encouraging you to try again

* If you manage to WIN - this popup message appears telling you your score (time in seconds) for which level

* If you choose the custom level - this popup form asks you to enter your desired variables 

## Challenges

* Solving the recursive algorithm is what took me the longest, as expected. It was very satisfying when it ultimately worked and from that point onwards the game was playable.
* The first click cannot be a mine, otherwise, the game is immediately lost. Implementing this condition took me longer than expected
* Assigning the numbers according to their proximity to the wolves was also a challenge but not as much as the recursive algorithm
* Implementing the winning conditions was harder than the losing one
* Removing the eventListeners when appropriate to avoid opening a cell that has been flagged
* Implementing the custom options was also a challenge, the order in which the functions have to run is slightly different, as the player first has to fill in the form before the grid is regenerated.


## Wins

My two biggest wins were the:
* Recursive algorithm to reveal all surrounding empty cells (this was required as an MVP);
* The customised grid;
* The pop-up windows.


## Key Learnings/Takeaways

* Learned a lot about addEventListeners and removeEventListeners
* Learned how to use flex-box to create a grid 
* Made me think a lot about the construction of the recursive algorithm without creating an infinite loop. 


## Bugs

None that I’m aware of at this stage. I should keep playing the game and I’m sure some funny bugs will appear in time.

## Future Improvements

* Due to the nature of the game it is difficult to have it working on mobile phones, the size of the grids is constrained by the number of cells and therefore is likely to be over the mobile device sizes. That being said, there is probably a way to generate grids within those constraints. 
* Add sounds, not much though, minesweeper is not an arcade game and it doesn't really rely on sound effects to enhance its experience, but it could be a nice addition.


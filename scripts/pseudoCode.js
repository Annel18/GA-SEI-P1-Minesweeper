//! Elements
//// queryselector the body //*append all necessary div to the body to populate html
// queryselector the rules button (though could just be a link to elsewhere)
//// queryselector each level button
// queryselector reset button
//// Cells = []

//! Variables
//// const Number of bombs at the start of the game
//// const Time when the game starts = 0s
//// let bombCount =  0 
//// const width 

//! Grid
//? function to create grid depeding on level
//// create a collection of objects, 1 for each difficulty level
//// objects to hold (levelChoice, width of grid size, numbers of bombs)
//// create grid accordingly

//? function to create the mines field
//// Radomly position the bombs - number of bombs depending on level  //*Add class of .bomb to these cells
//// each cell has to be be assigned a number according to its proximity to the bombs
//// forEach - check if any of the 8 cells around have a bomb and increase bombCount by 1 when condition is true //*Add class .nbr to these cells
//// cells[i+1, i-1, i+widht, i+width+1, i+width-1, i-widht, i-width+1, i-width-1]
//// take care of special condition on the edges
// all other cells remaining on 0 //*Add class of .safeZone
// display either the bomb logo if element has .bomb class or display the number if the element has .nbr class

//! Execution
//? function start the clock
//// on first cell click or on start game click - star set interval for the clock count increasing every second
// if all cells have been reasigned new classes //* run function win()

//? function to place flags
//// if right click on a cell //*replace class with .flag and maybe disable the cell

//? function to reveal te cell
//// click a cell to reveal what is behind -> class is reasigned (ie .bomb will become .clickedBomb)
// if .clickedBomb -> GAME OVER, stop the clock, reveal all cells //* run function gameOver()
//// if .clickedNbr -> just reveal that one cell
// if .clickedSafeZone -> pop the bubble //* This will need a recursive loop to open all the adjacent cells with .safeZone 
//// foreach of adjacent cells[i+1, i-1, i+widht, i+width+1, i+width-1, i-widht, i-width+1, i-width-1]
// check if class !== .safeZone -> dont do anything
// else if class ===.safezone //*replace class with .clickedSafeZone 
// repeat this process to each of their adjacent cells....... (This will be tricky )
// take care of the edges conditions when popping the bubbles

//? function WIN
// stop time 
// Add pop up Alerts and/or sounds with animations
// store score in loca database if higher the previous scores

//? function GAME OVER
//// stop time 
// Add pop up Alerts and/or sounds with animations
// store score in loca database if higher the previous scores

//! Events
//// EventListerner on click forEach Levels buttons -> will call function to change size of the grid 
//// EventListerner on click for reset button -> will call function to reset the game based on the same chosen level
//// EventListerner on click for each cell button -> will call function to play the game
//// EventListerner on right click for each cell button -> will call function to place flag 
// EventListerner on click for the rules button -> alert to show the rules


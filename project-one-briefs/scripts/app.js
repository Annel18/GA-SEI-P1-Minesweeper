//! Elements
const grid = document.querySelector('.grid')
const gridContainer = document.querySelector('.grid-container')
const levelButtons = document.getElementsByClassName('levels')
const resetButton = document.querySelector('#reset')
const timeDisplay = document.querySelector('#time')
let cells = []

//! Variables
let gameActive = false
let time = 0

const levels = [
  { difficulty: 'easy', bombsNbr: 6, width: 6, height: 6 },
  { difficulty: 'hard', bombsNbr: 24, width: 12, height: 12 },
  { difficulty: 'expert', bombsNbr: 48, width: 24, height: 12 }
]

const levelChoice = {
}

let width = levels[0].width
let height = levels[0].height
let cellCount = width * height
let bombsNbr = levels[0].bombsNbr
let interval

//! Grid

function resetVariables() {
  clearInterval(interval)
  width = 0
  height = 0
  cellCount = 0
  bombsNbr = 0
  time = 0
  cells = []
  cells.slice(0)
  gameActive = false
}

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
    cell.innerText = i
    grid.append(cell)
    cells.push(cell)
    cell.classList.add('cell')
    eventsOnCells()
  }
  mineField()
}


//! Execution

function updateGrid(evt) {
  resetVariables()
  gameActive = true
  if (evt.target.classList.contains('easy')) {
    levelChoice.bombsNbr = levels[0].bombsNbr
    levelChoice.width = levels[0].width
    levelChoice.height = levels[0].height
  }
  if (evt.target.classList.contains('hard')) {
    levelChoice.bombsNbr = levels[1].bombsNbr
    levelChoice.width = levels[1].width
    levelChoice.height = levels[1].height
  } else if (evt.target.classList.contains('expert')) {
    levelChoice.bombsNbr = levels[2].bombsNbr
    levelChoice.width = levels[2].width
    levelChoice.height = levels[2].height
  }
  width = levelChoice.width
  height = levelChoice.height
  cellCount = width * height
  bombsNbr = levelChoice.bombsNbr

  grid.replaceChildren()
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
    if (evt.target.classList.contains('expert')) {
      grid.style.width = '600px'
    } else {
      grid.style.width = '300px'
    }
    cell.innerText = '-'
    grid.append(cell)
    cells.push(cell)
    cell.classList.add('cell')
    eventsOnCells()
    /* WHY IS THIS NOT HAVING ANY EFFECT
    while (cells[i].classList.contains('bomb nbr') || cells[i].classList.contains('nbr bomb')) {
      cells[i].classList.remove('nbr')
    } */
  }

  mineField()
}

function mineField() {
  const bombsArray = []
  let hotSpots = bombsArray.filter((value, index) => bombsArray.indexOf(value) === index)
  for (let i = 0; i < bombsNbr; i++) {
    while (hotSpots.length < bombsNbr) {
      const index = Math.floor(Math.random() * cellCount)
      bombsArray.push(index)
      hotSpots = bombsArray.filter((value, index) => bombsArray.indexOf(value) === index)
      // console.log(hotSpots)
      cells[index].classList.add('bomb')
      dangerNbr(index)
    }
  }
}

function dangerNbr(index) {
  const cellQuery1 = index - width - 1
  const cellQuery2 = index - width
  const cellQuery3 = index - width + 1
  const cellQuery4 = index + 1
  const cellQuery5 = index + width + 1
  const cellQuery6 = index + width
  const cellQuery7 = index + width - 1
  const cellQuery8 = index - 1
  if (index < width && index % height === 0) { // console.log('topLeftCorner: ' + index)
    cells[cellQuery4].classList.add('nbr')
    cells[cellQuery5].classList.add('nbr')
    cells[cellQuery6].classList.add('nbr')
  } else if (index < width && (index + 1) % height === 0) { // console.log('topRigtCorner: ' + index)
    cells[cellQuery6].classList.add('nbr')
    cells[cellQuery7].classList.add('nbr')
    cells[cellQuery8].classList.add('nbr')
  } else if (index >= cellCount - width && (index + 1) % height === 0) { // console.log('bottomRigtCorner: ' + index)
    cells[cellQuery1].classList.add('nbr')
    cells[cellQuery2].classList.add('nbr')
    cells[cellQuery8].classList.add('nbr')
  } else if (index >= cellCount - width && index % height === 0) { // console.log('bottomLeftCorner: ' + index)
    cells[cellQuery2].classList.add('nbr')
    cells[cellQuery3].classList.add('nbr')
    cells[cellQuery4].classList.add('nbr')
  } else if (index < width) { // console.log('first row: ' + index)
    cells[cellQuery4].classList.add('nbr')
    cells[cellQuery5].classList.add('nbr')
    cells[cellQuery6].classList.add('nbr')
    cells[cellQuery7].classList.add('nbr')
    cells[cellQuery8].classList.add('nbr')
  } else if (index >= cellCount - width) { // console.log('last row: ' + index)
    cells[cellQuery1].classList.add('nbr')
    cells[cellQuery2].classList.add('nbr')
    cells[cellQuery3].classList.add('nbr')
    cells[cellQuery4].classList.add('nbr')
    cells[cellQuery8].classList.add('nbr')
  } else if (index % height === 0) { // console.log('first column: ' + index)
    cells[cellQuery2].classList.add('nbr')
    cells[cellQuery3].classList.add('nbr')
    cells[cellQuery4].classList.add('nbr')
    cells[cellQuery5].classList.add('nbr')
    cells[cellQuery6].classList.add('nbr')
  } else if ((index + 1) % height === 0) { // console.log('last column: ' + index)
    cells[cellQuery1].classList.add('nbr')
    cells[cellQuery2].classList.add('nbr')
    cells[cellQuery6].classList.add('nbr')
    cells[cellQuery7].classList.add('nbr')
    cells[cellQuery8].classList.add('nbr')
  } else { // console.log('midField: ' + index)
    cells[cellQuery1].classList.add('nbr')
    cells[cellQuery2].classList.add('nbr')
    cells[cellQuery3].classList.add('nbr')
    cells[cellQuery4].classList.add('nbr')
    cells[cellQuery5].classList.add('nbr')
    cells[cellQuery6].classList.add('nbr')
    cells[cellQuery7].classList.add('nbr')
    cells[cellQuery8].classList.add('nbr')
  }
}


function startTime(event) {
  console.log(event.target)
  clearInterval(interval)
  interval = setInterval(() => {
    time++
    timeDisplay.innerText = time
  }, 1000)
  reveal(event)
}

function clearAllInterval() {
}


function reveal(event) {
  // startTime()
  console.log(event.target)
  if (event.target.classList.contains('bomb')) {
    event.target.classList.remove('bomb')
  }
}

function addFlag(event) {
  event.target.classList.add('flag')
}


//! Events
for (const button of levelButtons) {
  button.addEventListener('click', updateGrid)
}

function eventsOnCells() {
  for (const cell of cells) {
    cell.addEventListener('click', startTime)
    cell.addEventListener('contextmenu', addFlag)
  }
}

resetButton.addEventListener('click', resetVariables)



//! Page Load
createGrid()
// mineField()
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

const level = {
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

function updateGrid(evt) {
  resetVariables()
  gameActive = true
  if (evt.target.classList.contains('easy')) {
    level.bombsNbr = levels[0].bombsNbr
    level.width = levels[0].width
    level.height = levels[0].height
  }
  if (evt.target.classList.contains('hard')) {
    level.bombsNbr = levels[1].bombsNbr
    level.width = levels[1].width
    level.height = levels[1].height
  } else if (evt.target.classList.contains('expert')) {
    level.bombsNbr = levels[2].bombsNbr
    level.width = levels[2].width
    level.height = levels[2].height
  }
  width = level.width
  height = level.height
  cellCount = width * height
  bombsNbr = level.bombsNbr

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
    cell.innerText = i
    grid.append(cell)
    cells.push(cell)
    cell.classList.add('cell')
    eventsOnCells()
  }
  mineField()
}


function mineField() {
  const bombsArray = []
  for (let i = 0; i < bombsNbr; i++) {
    let hotSpots = bombsArray.filter((value, index) => bombsArray.indexOf(value) === index)
    while (hotSpots.length < bombsNbr) {
      const index = Math.floor(Math.random() * cellCount)
      bombsArray.push(index)
      hotSpots = bombsArray.filter((value, index) => bombsArray.indexOf(value) === index)
      // console.log(hotSpots)
      cells[index].classList.add('bomb')
      // return cells
    }
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

function addFlag(event){
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
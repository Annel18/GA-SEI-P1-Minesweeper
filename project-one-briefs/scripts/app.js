//! Elements
const grid = document.querySelector('.grid')
const gridContainer = document.querySelector('.grid-container')
const levelButtons = document.getElementsByClassName('levels')
const resetButton = document.querySelector('#reset')
const timeDisplay = document.querySelector('#time')
const bombsDisplay = document.querySelector('#bombsNbr')
let cells = []


//! Variables
let gameActive = false
let time

const levels = [
  { difficulty: 'easy', bombsNbr: 6, width: 6, height: 6 },
  { difficulty: 'hard', bombsNbr: 24, width: 12, height: 12 },
  { difficulty: 'expert', bombsNbr: 48, width: 24, height: 12 }
]

let levelChoice = levels[0]

let width = levelChoice.width
let height = levelChoice.height
let cellCount = width * height
let bombsNbr = levelChoice.bombsNbr
let interval

//! Grid

function resetVariables() {
  clearInterval(interval)
  grid.replaceChildren()
  cells = []
  time = 0
  timeDisplay.innerText = time
  bombsDisplay.innerText = bombsNbr
  gameActive = false



}

//! Execution

function createGrid() {
  resetVariables()
  gameActive = true
  grid.replaceChildren()
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / height}%`
    cell.innerText = '-'
    grid.append(cell)
    cells.push(cell)
    cell.classList.add('cell')
    eventsOnCells()
  }
  mineField()

  for (let cell = 0; cell < cellCount; cell++) {
    dangerNbr(cell)
  }

  cells.forEach(function (index) {
    if (index.classList.contains('bomb')) {
      index.classList.remove('nbr')
    }
    if (!index.classList.contains('nbr') && !index.classList.contains('bomb')) {
      index.classList.add('safeZone')
    }
  })

  if (levelChoice === levels[2]) {
    grid.style.width = '600px'
  } else {
    grid.style.width = '300px'
  }
}

function updateGrid(evt) {

  resetVariables()
  gameActive = true
  if (evt.target.classList.contains('easy')) {
    levelChoice = levels[0]
  } else if (evt.target.classList.contains('hard')) {
    levelChoice = levels[1]
  } else if (evt.target.classList.contains('expert')) {
    levelChoice = levels[2]
  }
  width = levelChoice.width
  height = levelChoice.height
  cellCount = width * height
  bombsNbr = levelChoice.bombsNbr

  createGrid()
}

function dangerNbr(cell) {
  let dangerCount = 0

  const NW = cell - width - 1
  const N = cell - width
  const NE = cell - width + 1
  const E = cell + 1
  const SE = cell + width + 1
  const S = cell + width
  const SW = cell + width - 1
  const W = cell - 1

  function updateDangerCount(query) {
    if (cells[query].classList.contains('bomb')) {
      dangerCount++
    }
  }

  if (cell < width && cell % height === 0) { // console.log('topLeftCorner: ' + cell)
    [E, SE, S].forEach(updateDangerCount)
  } else if (cell < width && (cell + 1) % height === 0) { // console.log('topRigtCorner: ' + cell)
    [S, SW, W].forEach(updateDangerCount)
  } else if (cell >= cellCount - width && (cell + 1) % height === 0) { // console.log('bottomRigtCorner: ' + cell)
    [NW, N, W].forEach(updateDangerCount)
  } else if (cell >= cellCount - width && cell % height === 0) { // console.log('bottomLeftCorner: ' + cell)
    [N, NE, E].forEach(updateDangerCount)
  } else if (cell < width) { // console.log('first row: ' + cell)
    [E, SE, S, SW, W].forEach(updateDangerCount)
  } else if (cell >= cellCount - width) { // console.log('last row: ' + cell)
    [NW, N, NE, E, W].forEach(updateDangerCount)
  } else if (cell % height === 0) { // console.log('first column: ' + cell)
    [N, NE, E, SE, S].forEach(updateDangerCount)
  } else if ((cell + 1) % height === 0) { // console.log('last column: ' + cell)
    [NW, N, S, SW, W].forEach(updateDangerCount)
  } else { // console.log('midField: ' + cell)
    [NW, N, NE, E, SE, S, SW, W].forEach(updateDangerCount)
  }
  cells[cell].innerText = dangerCount
  if (cells[cell].innerText > 0) {
    cells[cell].classList.add('nbr')
  }
}

function mineField() {
  const bombsArray = []
  let hotSpots = []
  for (let i = 0; i < bombsNbr; i++) {
    while (hotSpots.length < bombsNbr) {
      const index = Math.floor(Math.random() * cellCount)
      bombsArray.push(index)
      // remove duplicates
      hotSpots = bombsArray.filter((value, index) => bombsArray.indexOf(value) === index)
      cells[index].classList.add('bomb')
    }
  }
}

function startTime(event) {
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
  const cellClicked = event.target
  if (cellClicked.classList.contains('bomb')) {
    const allBombs = document.querySelectorAll('.bomb')
    allBombs.forEach(function (item) {
      item.classList.replace('bomb', 'bombClicked')
      clearInterval(interval)
    })
  } else if (cellClicked.classList.contains('nbr')) {
    cellClicked.classList.replace('nbr', 'nbrClicked')
  } else if (cellClicked.classList.contains('safeZone')){
    cellClicked.classList.replace('safeZone', 'safeZoneClicked')
    openEmptyBubbles(cellClicked)
  }
}

function revealAdjacentCells(query) {
  if (cells[query].classList.contains('safeZone')) {
    cells[query].classList.replace('safeZone', 'safeZoneClicked')
  } else if (cells[query].classList.contains('nbr')) {
    cells[query].classList.replace('nbr', 'nbrClicked')
  } 
}

function openEmptyBubbles(cellClicked) {
  const cellClickedIndex = cells.indexOf(cellClicked)
  console.log('cellClickedIndex; ' + cellClickedIndex)
  class FieldTocCheck {
    constructor(cell) {
      this.cell = cell
      this.N = this.cell - width
      this.E = this.cell + 1
      this.S = this.cell + width
      this.W = this.cell - 1
    }
    array() {
      if (this.cell === 0) {
        return [this.E, this.S]
      } else if (this.cell === width - 1) {
        return [this.S, this.W]
      } else if (this.cell === cellCount - 1) {
        return [this.N, this.W]
      } else if (this.cell === cellCount - width - 1) {
        return [this.N, this.E]
      } else if (this.cell < width) {
        return [this.E, this.S, this.W]
      } else if ((this.cell + 1) % height === 0) {
        return [this.N, this.S, this.W]
      } else if (this.cell > cellCount - width) {
        return [this.N, this.E, this.W]
      } else if (this.cell % height === 0) {
        return [this.N, this.E, this.S]
      } else {
        return [this.N, this.E, this.S, this.W]
      }
    }
  }

  let objects = new FieldTocCheck(cellClickedIndex)
  let arrayToCheck = objects.array(cellClickedIndex)

  arrayToCheck.forEach(extendFieldToCheck)

  function extendFieldToCheck(query) {
    while (cells[query].classList.contains('safeZone')) {
      arrayToCheck.forEach(revealAdjacentCells)
      objects = new FieldTocCheck(query)
      arrayToCheck = objects.array(query)
      arrayToCheck.forEach(extendFieldToCheck)
    }
  }
}

function addFlag(event) {
  event.target.classList.add('flag')
  const bombsCountdown = bombsNbr--
  bombsDisplay.innerText = bombsCountdown - 1
  startTime()
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

resetButton.addEventListener('click', updateGrid)

//! Page Load
createGrid()
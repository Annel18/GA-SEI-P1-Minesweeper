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

class SurroundingCells {
  constructor(cell) {
    this.cell = cell
    this.NW = this.cell - width - 1
    this.N = this.cell - width
    this.NE = this.cell - width + 1
    this.E = this.cell + 1
    this.SE = this.cell + width + 1
    this.S = this.cell + width
    this.SW = this.cell + width - 1
    this.W = this.cell - 1
  }

  arrayOfAdjacentCells() {
    if (this.cell === 0) { //Top Left Corner
      return [this.E, this.S]
    } else if (this.cell === width - 1) { //Top Right Corner
      return [this.S, this.W]
    } else if (this.cell === cellCount - 1) { //Bottom Right Corner
      return [this.N, this.W]
    } else if (this.cell === cellCount - width) { //Bottom Left Corner
      return [this.N, this.E]
    } else if (this.cell < width) { //First Row
      return [this.E, this.S, this.W]
    } else if ((this.cell + 1) % width === 0) { //Last Column
      return [this.N, this.S, this.W]
    } else if (this.cell >= cellCount - width) { //Bottom Row
      return [this.N, this.E, this.W]
    } else if (this.cell % width === 0) { //First Column
      return [this.N, this.E, this.S]
    } else {
      return [this.N, this.E, this.S, this.W]
    }
  }

  arrayOfSurroundingCells() {
    if (this.cell === 0) { //Top Left Corner
      return this.arrayOfAdjacentCells().push([this.SE])
    } else if (this.cell === width - 1) { //Top Right Corner
      return this.arrayOfAdjacentCells().push([this.SW])
    } else if (this.cell === cellCount - 1) { //Bottom Right Corner
      return this.arrayOfAdjacentCells().push([this.NW])
    } else if (this.cell === cellCount - width) { //Bottom Left Corner
      return this.arrayOfAdjacentCells().push([this.NE])
    } else if (this.cell < width) { //First Row
      return this.arrayOfAdjacentCells().push([this.SE, this.SW])
    } else if ((this.cell + 1) % width === 0) { //Last Column
      return this.arrayOfAdjacentCells().push([this.NW, this.SW])
    } else if (this.cell >= cellCount - width) { //Bottom Row
      return this.arrayOfAdjacentCells().push([this.NE, this.NW])
    } else if (this.cell % width === 0) { //First Column
      return this.arrayOfAdjacentCells().push([this.NE, this.SE])
    } else {
      return this.arrayOfAdjacentCells().push([this.NE, this.NW, this.SW, this.SE])
    }
  }
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

  if (levelChoice === levels[0]) {
    grid.style.width = '150px'
    grid.style.height = '150px'
  } else if (levelChoice === levels[1]) {
    grid.style.width = '300px'
    grid.style.height = '300px'
  } else if (levelChoice === levels[2]) {
    grid.style.width = '600px'
    grid.style.height = '300px'
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
  // cells[cell].setAttribute('id', 'nbr' + dangerCount)

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

function startTime() {
  clearInterval(interval)
  interval = setInterval(() => {
    time++
    timeDisplay.innerText = time
  }, 1000)
}

function reveal(event) {
  startTime()
  const allBombs = document.querySelectorAll('.bomb')
  const cellClicked = event.target
  if (cellClicked.classList.contains('bomb')) {
    allBombs.forEach(function (item) {
      item.classList.replace('bomb', 'bombClicked')
      clearInterval(interval)
    })
  } else if (cellClicked.classList.contains('nbr')) {
    cellClicked.classList.replace('nbr', 'nbrClicked')
  } else if (cellClicked.classList.contains('safeZone')) {
    cellClicked.classList.replace('safeZone', 'safeZoneClicked')
    openEmptyBubbles(cellClicked)
  }
  if (cellClicked.classList.contains('nbrClicked')) {
    cellClicked.setAttribute('id', 'nbr' + cellClicked.innerText)
  }
}

function openEmptyBubbles(cellClicked) {
  const cellClickedIndex = cells.indexOf(cellClicked)

  let fieldInPlay = new SurroundingCells(cellClickedIndex)
  let arrayToCheck = fieldInPlay.arrayOfAdjacentCells()

  arrayToCheck.forEach(extendFieldToCheck)

  function extendFieldToCheck(query) {
    while (cells[query].classList.contains('safeZone')) {
      cells[query].classList.replace('safeZone', 'safeZoneClicked')
      fieldInPlay = new SurroundingCells(query)
      arrayToCheck = fieldInPlay.arrayOfAdjacentCells(query)
      arrayToCheck.forEach(extendFieldToCheck)
    } if (cells[query].classList.contains('nbr')) {
      cells[query].classList.replace('nbr', 'nbrClicked')
      cells[query].setAttribute('id', 'nbr' + cells[query].innerText)
    }
  }
}

function addFlag(event) {
  startTime()
  const allBombs = document.querySelectorAll('.bomb')
  console.log(allBombs)
  if (event.target.classList.contains('flag')) {
    event.target.classList.remove('flag')
    bombsNbr++
    bombsDisplay.innerText = bombsNbr
  } else if (!event.target.classList.contains('flag')) {
    event.target.classList.add('flag')
    bombsNbr--
    bombsDisplay.innerText = bombsNbr
  }

  const allFlags = []
  allBombs.forEach(function (item) {
    if (item.classList.contains('flag')) {
      allFlags.push(item)
      if (allFlags.length === allBombs.length){
        clearInterval(interval)
      }
    }
  })
}



function clearAllInterval() {
}
//! Events
for (const button of levelButtons) {
  button.addEventListener('click', updateGrid)
}

function eventsOnCells() {
  for (const cell of cells) {
    cell.addEventListener('click', reveal)
    cell.addEventListener('contextmenu', addFlag)
  }
}

resetButton.addEventListener('click', updateGrid)

//! Page Load
createGrid()
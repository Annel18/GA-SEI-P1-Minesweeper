//! Elements
const grid = document.querySelector('.grid')
const gridContainer = document.querySelector('.grid-container')
const levelButtons = document.getElementsByClassName('levels')
const resetButton = document.querySelector('#reset')
const timeDisplay = document.querySelectorAll('#time')
const difficultyDisplay = document.getElementById('difficulty')
const bombsDisplay = document.querySelector('#bombsNbr')
const rulesButton = document.querySelector('.rules')
const closeButtons = document.querySelectorAll('.close')
const levelCustom = document.querySelector('.levelCustom')
const customForm = document.getElementById('custom-form')
const customWidth = document.querySelector('.custom-width')
const customHeight = document.querySelector('.custom-height')
const customBombs = document.querySelector('.custom-wolfs')
const applyButton = document.querySelector('.apply')

//! Variables

const levels = [
  { difficulty: 'BEGINNER', bombsNbr: 10, width: 8, height: 8 },
  { difficulty: 'INTERMEDIATE', bombsNbr: 40, width: 16, height: 16 },
  { difficulty: 'EXPERT', bombsNbr: 80, width: 32, height: 16 },
  { difficulty: 'CUSTOM', bombsNbr: 0, width: 0, height: 0 }
]

let levelChoice = levels[0]
let width = levelChoice.width
let height = levelChoice.height
let cellCount = width * height
let bombsNbr = levelChoice.bombsNbr
let difficulty = levelChoice.difficulty
let cells = []
let allCellClicked = []
let time
let interval

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

  arrayOfSurroundingCells() {
    if (this.cell === 0) { //Top Left Corner
      return [this.E, this.S, this.SE]
    } else if (this.cell === width - 1) { //Top Right Corner
      return [this.S, this.W, this.SW]
    } else if (this.cell === cellCount - 1) { //Bottom Right Corner
      return [this.N, this.W, this.NW]
    } else if (this.cell === cellCount - width) { //Bottom Left Corner
      return [this.N, this.E, this.NE]
    } else if (this.cell < width) { //First Row
      return [this.E, this.S, this.W, this.SE, this.SW]
    } else if ((this.cell + 1) % width === 0) { //Last Column
      return [this.N, this.S, this.W, this.NW, this.SW]
    } else if (this.cell >= cellCount - width) { //Bottom Row
      return [this.N, this.E, this.W, this.NE, this.NW]
    } else if (this.cell % width === 0) { //First Column
      return [this.N, this.E, this.S, this.NE, this.SE]
    } else { // midfield
      return [this.N, this.E, this.S, this.W, this.NW, this.NE, this.SE, this.SW]
    }
  }
}

//! Grid

function resetVariables() {
  clearInterval(interval)
  grid.replaceChildren()
  cells = []
  allCellClicked = []
  time = 0
  for (const display of timeDisplay) {
    display.innerText = time
  }
  bombsDisplay.innerText = bombsNbr
  resetButton.style.backgroundImage = 'url(images/reset.png)'
}

function createGrid() {
  resetVariables()
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
    grid.style.width = '200px'
    grid.style.height = '200px'
    grid.style.backgroundImage = 'url(images/hay-house.jpeg)'
    gridContainer.style.backgroundImage = 'url(images/hayStack.jpeg)'
  } else if (levelChoice === levels[1]) {
    grid.style.width = '400px'
    grid.style.height = '400px'
    grid.style.backgroundImage = 'url(images/timber-house.jpeg)'
    gridContainer.style.backgroundImage = 'url(images/oak-cobbles.jpeg)'
  } else if (levelChoice === levels[2]) {
    grid.style.width = '800px'
    grid.style.height = '400px'
    grid.style.backgroundImage = 'url(images/brick-house.jpeg)'
    gridContainer.style.backgroundImage = 'url(images/brick-bckgnd.jpeg)'
  } else if (levelChoice === levels[3]) {
    grid.style.width = `${(levels[3].width * 100 / 4).toString()}px`
    grid.style.height = `${(levels[3].height * 100 / 4).toString()}px`
    grid.style.backgroundImage = 'url(images/brick-house.jpeg)'
    gridContainer.style.backgroundImage = 'url(images/brick-bckgnd.jpeg)'
  }
}

function updateGrid(evt) {
  resetVariables()
  if (evt.target.classList.contains('easy')) {
    levelChoice = levels[0]
  } else if (evt.target.classList.contains('hard')) {
    levelChoice = levels[1]
  } else if (evt.target.classList.contains('expert')) {
    levelChoice = levels[2]
  } else if (evt.target.classList.contains('apply')) {
    levelChoice = levels[3]
  }

  width = levelChoice.width
  height = levelChoice.height
  cellCount = width * height
  bombsNbr = levelChoice.bombsNbr
  difficulty = levelChoice.difficulty
  createGrid()
}

function customGrid(evt) {
  resetVariables()
  evt.preventDefault()
  levels[3].width = parseInt(customWidth.value)
  levels[3].height = parseInt(customHeight.value)
  levels[3].bombsNbr = parseInt(customBombs.value)
  updateGrid(evt)
  popupClose()
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

function dangerNbr(cell) {
  let dangerCount = 0

  const fieldInPlay = new SurroundingCells(cell)
  const arrayToCheck = fieldInPlay.arrayOfSurroundingCells()

  arrayToCheck.forEach(updateDangerCount)

  function updateDangerCount(query) {
    if (cells[query].classList.contains('bomb')) {
      dangerCount++
    }
  }

  cells[cell].innerText = dangerCount

  if (cells[cell].innerText > 0) {
    cells[cell].classList.add('nbr')
  }
}

//! Execution

function startGame() {
  clearInterval(interval)
  interval = setInterval(() => {
    time++
    for (const display of timeDisplay) {
      display.innerText = time
    }
  }, 1000)
}

function reveal(event) {
  startGame()
  const cellClicked = event.target
  const allBombs = document.querySelectorAll('.bomb')
  const allCells = document.querySelectorAll('.cell')
  if (cellClicked.classList.contains('bomb')) {
    cellClicked.classList.replace('bomb', 'bombClicked')
    allCellClicked.push(cellClicked)
    if (allCellClicked[0].classList.contains('bombClicked')) {
      updateGrid(event)
    } else {
      allBombs.forEach(function (item) {
        item.classList.replace('bomb', 'bombClicked')
        clearInterval(interval)
        resetButton.style.backgroundImage = 'url(images/badWolf.png)'
        document.getElementById('lost').classList.add('popupDisplay')
        allCells.forEach(function (cell) {
          cell.setAttribute('disabled', true)
          cell.removeEventListener('contextmenu', addFlag)
          cell.removeEventListener('click', reveal)
        })
      })
    }
  } else if (cellClicked.classList.contains('nbr')) {
    cellClicked.classList.replace('nbr', 'nbrClicked')
    cellClicked.removeEventListener('contextmenu', addFlag)
    allCellClicked.push(cellClicked)
    winGame()
  } else if (cellClicked.classList.contains('safeZone')) {
    cellClicked.classList.replace('safeZone', 'safeZoneClicked')
    cellClicked.removeEventListener('contextmenu', addFlag)
    allCellClicked.push(cellClicked)
    openEmptyBubbles(cellClicked)
  }
  if (cellClicked.classList.contains('nbrClicked')) {
    cellClicked.setAttribute('id', 'nbr' + cellClicked.innerText)
  }
  // console.log(allCellClicked[0])
}

function openEmptyBubbles(cellClicked) {
  const cellClickedIndex = cells.indexOf(cellClicked)

  let fieldInPlay = new SurroundingCells(cellClickedIndex)
  let arrayToCheck = fieldInPlay.arrayOfSurroundingCells()

  arrayToCheck.forEach(extendFieldToCheck)

  function extendFieldToCheck(query) {
    while (cells[query].classList.contains('safeZone')) {
      cells[query].classList.replace('safeZone', 'safeZoneClicked')
      cells[query].removeEventListener('contextmenu', addFlag)
      fieldInPlay = new SurroundingCells(query)
      arrayToCheck = fieldInPlay.arrayOfSurroundingCells()
      arrayToCheck.forEach(extendFieldToCheck)
    } if (cells[query].classList.contains('nbr')) {
      cells[query].classList.replace('nbr', 'nbrClicked')
      cells[query].removeEventListener('contextmenu', addFlag)
      cells[query].setAttribute('id', 'nbr' + cells[query].innerText)
    }
  }
}

function addFlag(event) {
  event.preventDefault()
  startGame()
  if (event.target.classList.contains('flag')) {
    event.target.classList.remove('flag')
    eventsOnCells()
    bombsNbr++
    bombsDisplay.innerText = bombsNbr
  } else if (!event.target.classList.contains('flag')) {
    event.target.classList.add('flag')
    event.target.removeEventListener('click', reveal)
    bombsNbr--
    bombsDisplay.innerText = bombsNbr
    winGame()
  }
}

function winGame() {
  const allCells = document.querySelectorAll('.cell')
  const openCells = []
  allCells.forEach(function (cell) {
    if (cell.classList.contains('nbrClicked') || cell.classList.contains('flag') || cell.classList.contains('safeZoneClicked') || cell.classList.contains('bomb')) {
      openCells.push(cell)
      if (openCells.length === cellCount) {
        clearInterval(interval)
        difficultyDisplay.innerText = levelChoice.difficulty
        document.getElementById('win').classList.add('popupDisplay')
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

levelCustom.addEventListener('click', function () {
  customForm.classList.add('popupDisplay')
})

applyButton.addEventListener('click', customGrid)

rulesButton.addEventListener('click', popupRules)

function eventsOnCells() {
  for (const cell of cells) {
    cell.addEventListener('click', reveal)
    cell.addEventListener('contextmenu', addFlag)
  }
}

function popupRules() {
  document.getElementById('rules').classList.add('popupDisplay')
}

for (const button of closeButtons) {
  button.addEventListener('click', popupClose)
}

function popupClose() {
  document.getElementById('rules').classList.remove('popupDisplay')
  document.getElementById('lost').classList.remove('popupDisplay')
  document.getElementById('win').classList.remove('popupDisplay')
  document.getElementById('custom-form').classList.remove('popupDisplay')
}

resetButton.addEventListener('click', updateGrid)

//! Page Load
createGrid()
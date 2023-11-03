//! Elements
const grid = document.querySelector('.grid')
const gridContainer = document.querySelector('.grid-container')
const levelButtons = document.getElementsByClassName('levels')
const cells = []

//! Variables
let gameActive = false

const levels = [
  { difficulty: 'easy', bombsNbr: 6, width: 6, height: 6 },
  { difficulty: 'hard', bombsNbr: 24, width: 12, height: 12 },
  { difficulty: 'expert', bombsNbr: 48, width: 24, height: 12 }
]

const level = {
}

let width = levels[0].width
let height = levels[0].height
let cellCount = levels[0] * height
let bombsNbr = levels[0].bombsNbr
let interval

//! Grid

function resetVariables() {
  clearInterval(interval)
  width = levels[0].width
  height = levels[0].height
  cellCount = levels[0] * height
  bombsNbr = levels[0].bombsNbr
}

function createGrid(evt) {
  if (!gameActive) {
    resetVariables()
    gameActive = true
    // if (evt.target.classList.contains('easy')) {
    // level.bombsNbr = levels[0].bombsNbr
    // level.width = levels[0].width
    // level.height = levels[0].height
    // } 
    // if (evt.target.classList.contains('hard')) {
    //   level.bombsNbr = levels[1].bombsNbr
    //   level.width = levels[1].width
    //   level.height = levels[1].height
    // } else if (evt.target.classList.contains('expert')) {
    //   level.bombsNbr = levels[2].bombsNbr
    //   level.width = levels[2].width
    //   level.height = levels[2].height
    // } else {
    level.bombsNbr = levels[0].bombsNbr
    level.width = levels[0].width
    level.height = levels[0].height
    // }
    width = level.width
    height = level.height
    cellCount = width * height
    bombsNbr = level.bombsNbr
    console.log(cellCount)

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.style.width = `${100 / width}%`
      cell.style.height = `${100 / height}%`
      // if (evt.target.classList.contains('expert')) {
      //   grid.style.width = '600px'
      // }
      cell.innerText = i
      grid.append(cell)
      cells.push(cell)
    }
    mineField()
  }
}

function mineField() {
  const bombsArray = []
  for (let i = 0; i < bombsNbr; i++) {
    let hotSpots = bombsArray.filter((value, index) => bombsArray.indexOf(value) === index)
    while (hotSpots.length < bombsNbr) {
      const index = Math.floor(Math.random() * cellCount)
      bombsArray.push(index)
      hotSpots = bombsArray.filter((value, index) => bombsArray.indexOf(value) === index)
      console.log(hotSpots)
      cells[index].classList.add('bomb')
    }
  }
}

function reveal(event) {
  if (event.target.classList.contains('bomb')) {
    event.target.classList.remove('bomb')
  }
}

//! Events
for (const button of levelButtons) {
  button.addEventListener('click', createGrid)
}

for (const cell of cells) {
  cell.addEventListener('click', reveal)
}


//! Page Load
createGrid()
// mineField()
const body = document.querySelector('body')
const header = document.createElement('header')
const main = document.createElement('main')
const footer = document.createElement('footer')
const side1 = document.createElement('div')
side1.classList.add('side1')
const side2 = document.createElement('div')
side2.classList.add('side2')
const game = document.createElement('section')
const hero = document.createElement('div')
hero.classList.add('hero')
const gridContainer = document.createElement('div')
gridContainer.classList.add('grid-container')
const grid = document.createElement('.grid')
grid.classList.add('grid')
const rules = document.createElement('a')
const credits = document.createElement('a')

body.append(header)
body.append(main)
body.append(footer)
main.append(side1)
main.append(game)
main.append(side2)
game.append(hero)
game.append(gridContainer)
gridContainer.append(grid)
footer.append(rules)
footer.append(credits)


  unction createGrid(evt) {
  if (!gameActive) {
    resetVariables()
    gameActive = true

    interval = setTimeout(() => {
      if (evt.target.classList.contains('easy')) {
        level.bombsNbr = levels[0].bombsNbr
        level.width = levels[0].width
        level.height = levels[0].height
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

      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.style.width = `${100 / width}%`
        cell.style.height = `${100 / height}%`
        if (evt.target.classList.contains('expert')) {
          grid.style.width = '600px'
        }
        cell.innerText = i
        grid.append(cell)
        cells.push(cell)
        cell.classList.add('cell')
      }
      mineField()
      
    }, 20)
  }
  // resetVariables()
}
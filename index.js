const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $result = document.querySelector('#result')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGaming = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setTime)

function handleBoxClick(event) {
  if (event.target.dataset.box) {
    renderBox()
    score++
  }
}

function show($el) {
  $el.classList.add('hide')
}
function hide($el) {
  $el.classList.remove('hide')
}

function startGame() {
  score = 0
  setTime()
  $gameTime.setAttribute('disabled', '')

  isGaming = true
  show($start)
  $game.style.background = '#ffffff'
  let interval = setInterval(() => {
    let time = $time.textContent

    if (time <= 0) {
      endGame()
      clearInterval(interval)
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}
function setTime() {
  let inputTime = +$gameTime.value
  $time.textContent = inputTime.toFixed(1)
  hide($timeHeader)
  show($resultHeader)
}

function getScore() {
  $result.textContent = score
}

function endGame() {
  isGaming = false
  getScore()
  $game.innerHTML = ''
  $game.style.background = '#ccc'
  hide($start)
  show($timeHeader)
  hide($resultHeader)
  $gameTime.removeAttribute('disabled', '')
}

function renderBox() {
  if (!isGaming) return
  $game.innerHTML = ''
  const boxSize = getRandom(30, 100) + 10
  const boxPosition = $game.getBoundingClientRect()
  const maxTop = boxPosition.height - boxSize
  const maxLeft = boxPosition.width - boxSize

  let box = document.createElement('div')

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.background = 'red'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')
  box.style.filter = `hue-rotate(${getRandom(0, 360) + 'deg'})`
  $game.append(box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + min))
}

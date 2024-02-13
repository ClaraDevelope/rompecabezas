import './puzzle.css'
export const puzzle = (array) => {
  let currentElement = ''
  let movesCount,
    imagesArray = []

  const randomNumber = () => Math.floor(Math.random() * 8) + 1
  const getCoords = (element) => {
    const [row, col] = element.getAttribute('data-position').split('_')
    return [parseInt(row), parseInt(col)]
  }
  const checkAdjacent = (row1, row2, col1, col2) => {
    if (row1 == row2) {
      //left/right
      if (col2 == col1 - 1 || col2 == col1 + 1) {
        return true
      }
    } else if (col1 == col2) {
      //up/down
      if (row2 == row1 - 1 || row2 == row1 + 1) {
        return true
      }
    }
    return false
  }
  const selectImage = (e) => {
    e.preventDefault()
    //Set currentElement
    currentElement = e.target
    //target(blank image)
    let targetElement = document.querySelector('.target')
    let currentParent = currentElement.parentElement
    let targetParent = targetElement.parentElement

    //get row and col values for both elements
    const [row1, col1] = getCoords(currentParent)
    const [row2, col2] = getCoords(targetParent)

    if (checkAdjacent(row1, row2, col1, col2)) {
      //Swap
      currentElement.remove()
      targetElement.remove()
      //Get image index(to be used later for manipulating array)
      let currentIndex = parseInt(currentElement.getAttribute('data-index'))
      let targetIndex = parseInt(targetElement.getAttribute('data-index'))
      //Swap Index
      currentElement.setAttribute('data-index', targetIndex)
      targetElement.setAttribute('data-index', currentIndex)
      //Swap Images
      currentParent.appendChild(targetElement)
      targetParent.appendChild(currentElement)
      //Array swaps
      let currentArrIndex = imagesArray.indexOf(currentIndex)
      let targetArrIndex = imagesArray.indexOf(targetIndex)
      ;[imagesArray[currentArrIndex], imagesArray[targetArrIndex]] = [
        imagesArray[targetArrIndex],
        imagesArray[currentArrIndex]
      ]
      //Win condition
      if (imagesArray.join('') == '123456789') {
        const winMessage = document.createElement('h2')
        winMessage.innerHTML = 'Enhorabuena, has ganado!'
        const app = document.querySelector('#app')
        app.append(winMessage)
      }
      //Increment a display move
      movesCount += 1
    }
  }
  const printBoard = () => {
    const divContainerPuzzle = document.createElement('div')
    divContainerPuzzle.id = 'container-puzzle'

    const divDisorderedPuzzle = document.createElement('div')
    divDisorderedPuzzle.id = 'disordered'

    const divResultPuzzle = document.createElement('div')
    divResultPuzzle.id = 'result'
    const imageResult = document.createElement('img')
    imageResult.className = 'image-result'
    imageResult.src = 'public/original_image.jpg'
    divResultPuzzle.append(imageResult)

    divContainerPuzzle.append(divDisorderedPuzzle, divResultPuzzle)
    const app = document.querySelector('#app')
    app.append(divContainerPuzzle)
  }
  const randomImages = () => {
    while (imagesArray.length < 8) {
      let randomVal = randomNumber()
      if (!imagesArray.includes(randomVal)) {
        imagesArray.push(randomVal)
      }
    }
    imagesArray.push(9)
  }
  const renderImages = () => {
    let count = 0
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let divPiece = document.createElement('div')
        divPiece.setAttribute('data-position', `${i}_${j}`)
        divPiece.addEventListener('click', selectImage)
        divPiece.classList.add('image-container')
        divPiece.innerHTML =
          imagesArray[count] === 9
            ? `<div class="image target" data-index="${imagesArray[count]}"></div>`
            : `<img src="public/${imagesArray[count]}.jpg" class="image" data-index="${imagesArray[count]}"/>`

        count += 1
        const divDisorderedPuzzle = document.querySelector('#disordered')
        divDisorderedPuzzle.append(divPiece)
      }
    }
  }

  printBoard()
  randomImages()
  renderImages()
}

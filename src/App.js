import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
// import './App.css'
import Birds from './seed/birds'
import winningTemplate from './seed/winning.template.js'
import ShowHide from './components/Rules'
import Credits from './components/Credits'

// Styled Components

const DivContainer = styled.div`
  background-color: black;
  display: grid;
  gap: 3.5rem;
  margin: 4rem auto;
  padding: 1rem 0;
`
const HeaderOne = styled.h1`
  text-align: center;
  color: #afb950;
`
const HeaderTwo = styled(HeaderOne)`
  color: #ff9800;
`
const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #b3d8e6;
  border: none;
  margin: 0 1rem;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    background-color: ${(props) => (props.disabled ? 'none' : '#c0d164')};
  }
`
const StartButton = styled(Button)`
  &:hover {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    background-color: ${(props) => (props.disabled ? 'none' : '#c0d164')};
  }
`
const ShuffleBirdButton = styled(StartButton)``

// 2. Cards Container

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
padding: 0 1rem;
`

const CardBody = styled.div`
  background-color: #e0ffff00;
  margin: 2rem auto;
  border-radius: 1.5rem;
  box-shadow: -0.1rem -0.2rem 2rem 0 #61809c;
  padding:1rem;
`

const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`
const CardContents = styled.div`
  padding: 1rem;
  font-size: 1rem;
  background-color: ${(props) =>
    props.birdMatched ? '#f7b048f2' : '#2f5f7040'};
  color: ${(props) => (props.birdMatched ? 'black' : 'white')};
  text-align: center;
  width: 4rem;
  height: 2rem;
`
const PlayerPara = styled.p`
  text-align: center;
  font-size: 2rem;
  color: #ff9800;
`
const Span = styled.span`
  color: #58f11a;
  font-weight: bold;
  font-size: 2rem;
`
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
`

//Tasks
//1. Bird will not appears twice.
//2 Update the old bird array with new modified array.
//3. Change the background color of bird on the card, when generated bird matches with the bird on the card.
//4. Create an algorithm for row,column and diagonal.

// check player 1 or player 2 array check, check first horizontal 0-4 then column 0 5 10 15 20 and so on 2 6 11 16 21  and then diagonal let side 4 table and from right side table of 6

function shuffleArray(array) {
  let shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let eachBird = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = eachBird
  }
  let birdToReplace = shuffledArray[12]
  shuffledArray[12] = 'Bingo Bird'
  shuffledArray.push(birdToReplace)
  return shuffledArray
}

export default function App() {
  const [bird, setBird] = useState('')
  const [birds, setBirds] = useState(Birds)
  const [updatedBirdsPlayerOne, setUpdatedBirdsPlayerOne] = useState([])
  const [updatedBirdsPlayerTwo, setUpdatedBirdsPlayerTwo] = useState([])
  const [disable, setDisable] = useState(false)
  const [enable, setEnable] = useState(false)
  const [startBtnState, setStartBtnState] = useState(true)

  const [winner, setWinner] = useState('')
  const [winnerTwo, setWinnerTwo] = useState('')

  useEffect(() => {
    randomBirdGeneratorPlayerOne()
    randomBirdGeneratorPlayerTwo()
  },[])
  //1 . Generate randomBirdHandler

  const randomBirdHandler = () => {
    //1.2 Not to repeat bird once appeared
    const randomBird = birds[Math.floor(Math.random() * birds.length)]
    setBird(randomBird)
    // 1.2 Highlight Bird from cards when generated bird appears.

    // 1.2.1 Clone birds of Player one
    let updatedBirdClonePlayerOne = updatedBirdsPlayerOne.map((bird) => {
      if (bird === randomBird) {
        return `${bird}-matched!`
      }
      return bird
    })
    // 1.2.2 Clone birds of Player two
    let updatedBirdClonePlayerTwo = updatedBirdsPlayerTwo.map((bird) => {
      if (bird === randomBird) {
        return `${bird}-matched!`
      }
      return bird
    })

    //1.3.1 Winner Decider

    let checkTemplate = Object.values(winningTemplate)

    for (let checkWinner of checkTemplate) {
      let isWinner = 0
      let isWinnerTwo = 0
      let BingoBirdCounter = 0

      // let fourElementWinner= 0
      for (let checkMatchedBird of checkWinner) {
        // Player 1  winner matched Array

        const newWinnerMatchedArray =
          updatedBirdClonePlayerOne[checkMatchedBird]

        //Player 2 winner matched array
        const newWinnerMatchedArrayTwo =
          updatedBirdClonePlayerTwo[checkMatchedBird]

        console.log('newWinnerMatchedArray', newWinnerMatchedArray)
        //Player 1

        if (newWinnerMatchedArray.includes('match')) {
          isWinner = isWinner + 1
          // fourElementWinner = fourElementWinner+1
          // console.log('isWinner', isWinner)
        }
        //4 Elements Winner

        

        if (isWinner === 5) {
          setWinner('wins!')
          setEnable(true)
          setStartBtnState(false)
        }

        //Player 2

        if (newWinnerMatchedArrayTwo.includes('match')) {
          isWinnerTwo = isWinnerTwo + 1
          // console.log('isWinner', isWinner)
        }

        if (isWinnerTwo === 5) {
          setWinnerTwo('wins!')
          setEnable(true)
          setStartBtnState(false)
        }
      }
    }
    setUpdatedBirdsPlayerOne(updatedBirdClonePlayerOne)
    setDisable(true)
    setUpdatedBirdsPlayerTwo(updatedBirdClonePlayerTwo)
  }

  //2. Generate Random Birds for cards

  const randomBirdGeneratorPlayerOne = () => {
    const randomBirds = shuffleArray(birds)
    setUpdatedBirdsPlayerOne(randomBirds)
  }
  const randomBirdGeneratorPlayerTwo = () => {
    const randomBirds = shuffleArray(birds)
    setUpdatedBirdsPlayerTwo(randomBirds)
  }

  //3. Start game from Beginning
  const startGameHandler = () => {
    setStartBtnState(true)
    setEnable(false)
    setDisable(false)
    randomBirdGeneratorPlayerOne()
    randomBirdGeneratorPlayerTwo()
    setWinner('')
    setWinnerTwo('')
  }

  return (
    <DivContainer>
      <ShowHide />
      <HeaderOne>Let's Bingo Bird!!!</HeaderOne>
      <HeaderTwo>{`The generated bird is : ${bird}`}</HeaderTwo>
      <ButtonsDiv>
        <Button disabled={enable} onClick={randomBirdHandler}>
          Generate Bird
        </Button>
        <StartButton disabled={startBtnState} onClick={startGameHandler}>
          Game Start
        </StartButton>
      </ButtonsDiv>
      <CardsContainer>
        <CardBody>
          <Card>
            {updatedBirdsPlayerOne.map((bird) => (
              <CardContents birdMatched={bird.includes('match')} key={bird}>
                {bird}
              </CardContents>
            ))}
          </Card>
          <PlayerPara>
            Player 1 <Span>{winner}</Span>
          </PlayerPara>
          <ButtonsDiv>
            <ShuffleBirdButton
              disabled={disable}
              onClick={randomBirdGeneratorPlayerOne}
            >
              Shuffle Birds
            </ShuffleBirdButton>
            {/* <ResetButton onClick={randomBirdGeneratorPlayerOne}>Reset</ResetButton> */}
          </ButtonsDiv>
        </CardBody>
        <CardBody>
          <Card>
            {updatedBirdsPlayerTwo.map((bird) => (
              <CardContents birdMatched={bird.includes('match')} key={bird}>
                {bird}
              </CardContents>
            ))}
          </Card>
          <PlayerPara>
            Player 2 <Span>{winnerTwo}</Span>
          </PlayerPara>
          <ButtonsDiv>
            <ShuffleBirdButton
              disabled={disable}
              onClick={randomBirdGeneratorPlayerTwo}
            >
              Shuffle Birds
            </ShuffleBirdButton>
            {/* <ResetButton onClick= {randomBirdGeneratorPlayerTwo}>Reset</ResetButton> */}
          </ButtonsDiv>
        </CardBody>
      </CardsContainer>
      <Credits />
    </DivContainer>
  )
}

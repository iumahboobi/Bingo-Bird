import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
// import './App.css'
import Birds from './data/birds'
import winningTemplate from './data/winning.template.js'
import ShowHide from './components/Rules'
import Credits from './components/Credits'

// Styled Components

const DivContainer = styled.div`
  background-color: black;
  display: grid;
  margin: 2rem auto;
  /* padding: 1rem 0; */
  @media (max-width:700px){
  
    margin:0.5rem auto;
    display: grid-column;
    background-color:red

  }


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
  font-size: 1.4rem;
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
  box-shadow: 0rem 0rem 1rem 0rem #03a9f4;
  padding: 1rem;
`

const Card = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  list-style-type: none;
  padding: 0;
`
const CardContents = styled.li`
  padding: 1.5rem;
  font-size: 1rem;
  /* transition-duration: ${(props) => (props.birdMatched ? '0s' : '1s')}; */
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
  }, [])
  //1 . Generate randomBirdHandler

  const randomBirdHandler = () => {
    //1.2 Generate Random Bird
    const randomBird = Birds[Math.floor(Math.random() * Birds.length)]
    setBird(randomBird)

    // 1.2 Clone Birds function for both players

    const birdClones = (player) => {
      const result = player.map((bird, ind) => {
        if (ind === 12) return `${bird}-matched!`
        if (bird === randomBird) {
          return `${bird}-matched!`
        }
        return bird
      })
      return result
    }
    birdClones(updatedBirdsPlayerOne)
    birdClones(updatedBirdsPlayerTwo)
    // 1.2.1 Clone Birds of Player one
    const updatedBirdClonePlayerOne = birdClones(updatedBirdsPlayerOne)
    // 1.2.2 Clone Birds of Player two
    const updatedBirdClonePlayerTwo = birdClones(updatedBirdsPlayerTwo)

    //1.3.1 Winner Decider
    for (let templates of winningTemplate) {
      let isWinner = 0
      let isWinnerTwo = 0
      for (let eachEle of templates) {
        // Player 1  winner matched
        console.log('eachEle',eachEle)
        const winnerMatched = updatedBirdClonePlayerOne[eachEle]
        //Player 1
        if (winnerMatched.includes('match')) {
          isWinner = isWinner + 1
          // console.log('isWinner', isWinner)
        }
        if (isWinner === 5) {
          setWinner('wins!')
          setEnable(true)
          setStartBtnState(false)
        }

        //Player 2
        //Player 2 winner matched
        const winnerMatchedTwo = updatedBirdClonePlayerTwo[eachEle]
        if (winnerMatchedTwo.includes('match')) {
          isWinnerTwo = isWinnerTwo + 1
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
    const randomBirds = shuffleArray(Birds)
    setUpdatedBirdsPlayerOne(randomBirds)
  }
  const randomBirdGeneratorPlayerTwo = () => {
    const randomBirds = shuffleArray(Birds)
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
          Start Game
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
          </ButtonsDiv>
        </CardBody>
      </CardsContainer>
      <Credits />
    </DivContainer>
  )
}

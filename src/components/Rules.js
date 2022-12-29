import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const ShowHideButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ButtonMax = styled.button`
  background-color: #9c27b0;
  cursor: pointer;
  margin-right: 0.5rem;
  border: none;
  font-size: 1.5rem;
  /* border-radius: 50%; */
`
// const ButtonMin = styled(ButtonMax)`
//   background-color: #ffc762ab;
// `
const HeadOne = styled.h1`
  text-align: center;
  color: #e91e63;
`
const MinMaxContainer = styled.div`
  background-color: #e0ffff00;
  border-radius: 1rem;
  max-width: 586px;
  margin: 0 auto;
  box-shadow: -0.1rem -0.2rem 1rem 0rem #61809c;
  padding: 1rem;
`
const InstContainer = styled(MinMaxContainer)`
  display: ${(props) => (props.showHide ? 'none' : 'block')};
`

const UnOrderedlist = styled.ul`
  list-style-type: number;
  justify-content: left;
`

const List = styled.li`
  color: #ffffff;
  letter-spacing: 0.1rem;
  line-height: 2;
`
export default function ShowHide() {
  const [isShown, setIsShown] = useState(false)

  // 1. HandleClick function
  const handleClick = () => {
    setIsShown((current) => !current)
  }

  return (
    <div>
      <MinMaxContainer>
        <ShowHideButtons>
          {/* <ButtonMin onClick={handleClick}>-</ButtonMin> */}
          <ButtonMax onClick={handleClick}>Rules</ButtonMax>
        </ShowHideButtons>
      </MinMaxContainer>

      {isShown &&
      <InstContainer>
        <HeadOne>Rules and Instructions!</HeadOne>
        <UnOrderedlist>
          <List>
            You may generate random birds many times when the game starts.
          </List>
          <List>
            You may shuffle birds name on the card many times before the game
            starts.
          </List>
          <List>
            You may not able to shuffle the birds' names on the Cards once the
            game starts.
          </List>
          <List>
            The name of the birds will be highlighted on the card only once when
            match is found.
          </List>
          <List>
            Either player or both players win the game by completing a row,
            column, or diagonal.
          </List>
        </UnOrderedlist>
      </InstContainer>}
    </div>
  )
}

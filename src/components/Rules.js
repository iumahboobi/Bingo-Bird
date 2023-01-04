import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const RulesContainer = styled.div`
  background-color: #e0ffff00;
  border-radius: 1rem;
  max-width: 586px;
  margin: 0 auto;
  box-shadow: 0rem 0rem 1rem 0rem #03a9f4;
  padding: 1rem;
`
const InstContainer = styled(RulesContainer)`
  display: ${(props) => (props.showHide ? 'none' : 'block')};
`
const ShowHideButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ButtonRules = styled.button`
  background-color: #c431de;
  cursor: pointer;
  margin-right: 0.5rem;
  border: none;
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
    background-color: #ff9800;
  }
`
const HeaderOne = styled.h1`
  text-align: center;
  color: #e91e63;
`

const UnOrderList = styled.ul`
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
      <RulesContainer>
        <ShowHideButtons>
          <ButtonRules onClick={handleClick}>Rules</ButtonRules>
        </ShowHideButtons>
      </RulesContainer>

      {isShown && (
        <InstContainer>
          <HeaderOne>Rules and Instructions!</HeaderOne>
          <UnOrderList>
            <List>
              You may generate random birds many times during playing the game.
            </List>
            <List>
              You may shuffle birds name on the cards many times before the game
              starts.
            </List>
            <List>
              You may not be able to shuffle the birds' names on the Cards once
              the game starts.
            </List>
            <List>
              The name of the birds will be highlighted on the card only once
              when match is found.
            </List>
            <List>
              Either player or both players win the game by completing a row,
              column, or diagonal.
            </List>
          </UnOrderList>
        </InstContainer>
      )}
    </div>
  )
}

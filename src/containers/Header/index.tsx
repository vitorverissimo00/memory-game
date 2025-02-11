import React from 'react'
import {
  HeaderTitle,
  MainContainer,
  ContentContainer,
  TrophyContainer,
} from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  return (
    <MainContainer className="glass-effect">
      <ContentContainer>
        <HeaderTitle className="noselect">Memory Game</HeaderTitle>
        <TrophyContainer>
          <FontAwesomeIcon icon="trophy" fontSize="26px" />
        </TrophyContainer>
      </ContentContainer>
    </MainContainer>
  )
}

export default Header

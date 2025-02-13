import React from 'react'
import {
  MainContainer,
  ContentContainer,
  HeaderTitle,
  TrophyIcon,
} from './styles'

const Header: React.FC = () => {
  return (
    <MainContainer className="glass-effect">
      <ContentContainer>
        <HeaderTitle className="noselect">Memory Game</HeaderTitle>
        <TrophyIcon icon="trophy" />
      </ContentContainer>
    </MainContainer>
  )
}

export default Header

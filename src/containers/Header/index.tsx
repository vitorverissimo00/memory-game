import React from 'react'
import {
  MainContainer,
  ContentContainer,
  HeaderTitle,
  TrophyIcon,
} from './styles'

interface HeaderPropsInterface {
  onClickTrophy: VoidFunction
}
const Header: React.FC<HeaderPropsInterface> = ({ onClickTrophy }) => {
  return (
    <MainContainer className="glass-effect">
      <ContentContainer>
        <HeaderTitle className="noselect">Memory Game</HeaderTitle>
        <TrophyIcon icon="trophy" onClick={onClickTrophy} />
      </ContentContainer>
    </MainContainer>
  )
}

export default Header

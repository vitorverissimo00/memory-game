import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MainContainer = styled.header`
  position: relative;
  top: 0;

  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  font-size: calc(10px + 2vmin);
  padding: 0 64px;
  z-index: 5;
  color: white;

  @media (min-width: 384px) and (max-width: 768px) {
    position: relative;
    padding: 8px;
    height: 56px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`

export const HeaderTitle = styled.h2`
  pointer-events: none;
  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const TrophyIcon = styled(FontAwesomeIcon)`
  font-size: 26px;
  transition: color 0.3s;

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 18px;
  }

  &:hover {
    color: gold;
  }
`

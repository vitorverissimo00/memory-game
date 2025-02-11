import styled from 'styled-components'

export const MainContainer = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  font-size: calc(10px + 2vmin);
  padding-left: 64px;
  padding-right: 64px;

  z-index: 2;

  color: white;
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
`

export const TrophyContainer = styled.div`

  & > :hover {
    color: gold;

    transition: .3s;
  }
`

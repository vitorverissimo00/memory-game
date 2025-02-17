import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 16px;

  width: fit-content;
`

export const WinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`

export const DescriptionBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  padding: 16px;

  width: 40%;
`

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  width: 60vw;
  height: 66vh;
`

export const CardsMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 660px;
  max-height: 600px;

  @media (max-width: 1400px) {
    max-width: 430px;
    max-height: auto;
  }
`

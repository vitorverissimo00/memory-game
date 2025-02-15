import styled from 'styled-components'

export const MainContainer = styled.div``

export const StartGameButton = styled.div`
  @property --myColor1 {
    syntax: '<color>';
    initial-value: rgb(217, 98, 119);
    inherits: false;
  }

  @property --myColor2 {
    syntax: '<color>';
    initial-value: rgb(51, 30, 91);
    inherits: false;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  width: 230px;
  height: 40px;
  padding: 13px 30px 10px 30px;

  font-family: 'Bebas Neue';
  font-size: 2rem;

  color: #fafafa;
  border-radius: 50px;

  background: linear-gradient(90deg, var(--myColor1), var(--myColor2) 65%);
  transition: --myColor1 0.8s, --myColor2 0.8s;
  align-self: center;

  cursor: pointer;

  &:hover {
    --myColor1: rgb(51, 30, 91);
    --myColor2: rgb(217, 98, 119);
  }

  margin-top: 32px;

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 24px;
    width: 120px;
    height: auto;
    padding: 8px;
  }

  @media (max-width: 320px) {
    font-size: 18px;
    width: 100px;
    height: auto;
    padding: 8px;
  }
`

export const StartGameMainContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 384px) and (max-width: 768px) {
    overflow-y: scroll;
    height: 75vh;
    padding-left: 8px;
    padding-right: 8px;
  }
`

export const ModalContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: white;
  padding: 32px;
  border-radius: 24px;
  width: 30vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;

  min-height: 40vh;
  max-height: 80vh;
`

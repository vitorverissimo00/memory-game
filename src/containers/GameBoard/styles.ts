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

export const Title = styled.span`
  font-size: 2.5rem;
  color: #333;

  font-weight: 700;
  margin-bottom: 8px;

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 4px;
  }
`

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 8px;

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 4px;
  }
`

export const Section = styled.section`
  margin-bottom: 16px;
`

export const Text = styled.p`
  font-family: 'Roboto';
  font-size: 1rem;
  color: #444;
  line-height: 1.6;

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 0.8rem;
  }
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`

export const ListItem = styled.li`
  font-family: 'Roboto';
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
  padding-left: 16px;
  position: relative;

  &:before {
    content: '🔹';
    margin-right: 8px;
    left: 0;
  }

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 0.8rem;
  }
`

export const StartButton = styled.button`
  background: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1.24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }
`

export const SectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

`

import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
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

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #000;
  }
`

export const LeaderboardList = styled.ol`
  list-style-type: decimal;
  padding: 0;
`

export const LeaderboardItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  font-family: 'Roboto';
  font-size: 1rem;
  color: #444;
  line-height: 1.6;

  .player-name {
    text-align: left;
    font-weight: 700;
  }

  .player-score {
    text-align: right;
  }

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 0.8rem;
  }
`

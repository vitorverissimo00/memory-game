import styled from 'styled-components'

export const MainContainer = styled.div<{ isDisabled: boolean }>`
  width: 80px;
  height: 120px;
  margin: 16px;
  perspective: 1000px;
  position: relative;
  overflow: visible;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: transform 0.3s ease;

  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.4;
  `}

  &:hover {
    transform: ${({ isDisabled }) =>
      isDisabled ? 'none' : 'translateY(-8px) rotateZ(1deg)'};
  }
`

export const CardInner = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) =>
    isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`

export const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  border-radius: 18px;
  box-shadow: 0px 0px 3px rgba(117, 117, 117, 1);
  color: #5d597b;
`

export const CardFront = styled(CardFace)<{ isDisabled: boolean }>`
  background: rgb(250, 250, 250);
  background: linear-gradient(
    211deg,
    rgba(250, 250, 250, 1) 23%,
    rgba(228, 231, 238, 1) 100%
  );

  ${({ isDisabled }) =>
    isDisabled &&
    `
    background-color: #4b4b4b;
    color: #e0e0e0;
  `}
`

export const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: rgb(250, 250, 250);
  background: linear-gradient(
    211deg,
    rgba(250, 250, 250, 1) 23%,
    rgba(228, 231, 238, 1) 100%
  );
`

export const CardShadow = styled.div<{ isFlipped: boolean }>`
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 80%;
  height: 8px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  transform: translateX(-50%)
    ${({ isFlipped }) => (isFlipped ? 'scaleX(1.2)' : 'scaleX(1)')};
  opacity: ${({ isFlipped }) => (isFlipped ? '0.15' : '0.3')};
  transition: all 0.6s;
  filter: blur(5px);
  z-index: -1;
`

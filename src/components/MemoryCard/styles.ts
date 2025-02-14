import styled from 'styled-components'

export const MainContainer = styled.div<{
  isFlipped: boolean
  isDisabled: boolean
}>`
  background-color: ${({ isFlipped, isDisabled }) =>
    isFlipped ? (isDisabled ? 'brown' : 'blue') : 'yellow'};
  width: 30px;
  height: 50px;
`

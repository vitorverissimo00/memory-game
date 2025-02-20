import styled from 'styled-components'

export const MainContainer = styled.div<{
  dimensions: { width?: string; height?: string }
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #fafafa;

  padding: 32px 64px;

  border-radius: 45px;

  ${({ dimensions }) =>
    dimensions && `max-width: ${dimensions.width}; height: ${dimensions.height};`}

  -webkit-box-shadow: 0px 0px 22px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 22px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 22px -9px rgba(0, 0, 0, 0.75);

  @media (max-width: 1024px) {
    padding: 32px 32px;
  }

  @media (max-width: 1200px) {
    padding: 32px 32px;
  }
`

import styled from 'styled-components'

// Styled components
export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`

export const Input = styled.input`
  padding: 14px;
  font-size: 16px;
  border-width: 1px;
  border-color: #cccccc;
  background-color: #ffffff;
  color: #cccccc;
  border-style: solid;
  border-radius: 24px;
  box-shadow: 0px 0px 0px rgba(66, 66, 66, 0.75);
  text-shadow: 0px 0px 0px rgba(66, 66, 66, 0.75);

  text-align: center;

  &:focus {
    color: #331e5b;
    outline: none;
  }
`

export const Button = styled.button`
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
  border: none;

  background: linear-gradient(90deg, var(--myColor1), var(--myColor2) 65%);
  transition: --myColor1 0.8s, --myColor2 0.8s;
  align-self: center;

  cursor: pointer;

  &:hover {
    --myColor1: rgb(51, 30, 91);
    --myColor2: rgb(217, 98, 119);
  }

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

  margin-top: 32px;
  margin-bottom: 8px;
`

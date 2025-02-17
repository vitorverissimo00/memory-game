import styled from 'styled-components'

export const MainContainer = styled.div``

export const Title = styled.span`
  font-size: 2.5rem;
  color: #333;

  font-weight: 700;
  margin-bottom: 8px;

  @media (min-width: 384px) and (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 4px;
  }

  @media (max-width: 1024px) {
    font-size: 1.5rem;
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

  @media (max-width: 1024px) {
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

  @media (max-width: 1024px) {
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

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
`

export const SectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

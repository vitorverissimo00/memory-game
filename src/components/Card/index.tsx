import React from 'react'
import { MainContainer } from './styles'

type CardProps = {
  children: React.ReactNode
  width?: string
  height?: string
}

const Card = ({ children, width, height }: CardProps) => {
  return (
    <MainContainer dimensions={{ width, height }}>{children}</MainContainer>
  )
}

export default Card

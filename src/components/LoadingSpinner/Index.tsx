import React from 'react'
import { Spinner, SpinnerContainer } from './styles'
import { Text } from '../GameInstructions/styles'

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <Text>
        The application may be slower due to the demo server&apos;s limitations.
        Please wait.
      </Text>
    </SpinnerContainer>
  )
}

export default LoadingSpinner

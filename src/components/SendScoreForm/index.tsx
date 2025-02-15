import React, { useState } from 'react'
import { Button, Form, Input, MainContainer } from './styles'
import { Subtitle, Text } from '../GameInstructions/styles'

interface SendScoreFormPropsInterface {
  onSend: (formData: { name: string }) => void
}

const SendScoreForm: React.FC<SendScoreFormPropsInterface> = ({ onSend }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSend({ name })
  }

  return (
    <MainContainer>
      <Subtitle>Congratulations!</Subtitle>
      <Text>
        Congratulations on completing the memory game! To save your score and
        see how you rank against others, please enter your name below and send
        your score.{' '}
        <strong>Your name will be displayed on the leaderboard,</strong> so make
        sure to use a name you&apos;d like to be recognized by.
      </Text>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit">Send</Button>
      </Form>
    </MainContainer>
  )
}

export default SendScoreForm

import React from 'react'
import {
  List,
  ListItem,
  Section,
  SectionsContainer,
  Subtitle,
  Text,
  Title,
} from './styles'

const GameInstructions: React.FC = () => (
  <>
    <Title>Welcome to Memory Game! 🎮</Title>
    <Text>
      Get ready to challenge your memory and reasoning skills with a dynamic and
      fun experience! Here’s everything you need to know before you start:
    </Text>

    <SectionsContainer>
      <Section>
        <Subtitle>How to Play:</Subtitle>
        <Text>
          <strong>Objective:</strong> Find all matching pairs of cards in the
          shortest time possible.
        </Text>
        <Text>
          <strong>Future</strong> Features: Progressive Levels:
        </Text>
        <List>
          <ListItem>Level 1: 8 cards (4 pairs)</ListItem>
          <ListItem>Level 2: 12 cards (6 pairs)</ListItem>
          <ListItem>Level 3: 16 cards (8 pairs)</ListItem>
          <ListItem>Level 4: 20 cards (10 pairs)</ListItem>
        </List>
        <Text>
          <strong>Tip:</strong> In advanced levels, cards shuffle automatically
          every 10 seconds!
        </Text>
      </Section>

      <Section>
        <Subtitle>Scoring System:</Subtitle>
        <List>
          <ListItem>
            Points per Pair: Earn points for each correct match.
          </ListItem>
          <ListItem>Time Bonus: Finish faster to get extra points.</ListItem>
          <ListItem>Penalties: Each wrong attempt reduces your score.</ListItem>
        </List>
        <Subtitle style={{ marginTop: '14px' }}>Special Features:</Subtitle>
        <List>
          <ListItem>⏱️ Timer: Track your time for each level.</ListItem>
          {/* <ListItem>
            🔄 Automatic Shuffle: In higher levels, cards shuffle again after 10
            seconds.
          </ListItem> */}
          <ListItem>
            🏆 Global Ranking: Compete with your friends and players worldwide.
          </ListItem>
        </List>
      </Section>
    </SectionsContainer>

    <Text>
      Ready to test your memory and become the champion?
      <strong> Click &quot;Start Game&quot; and good luck! 🚀</strong>
    </Text>
  </>
)

export default GameInstructions

import * as React from "react";
import {
  Title,
  Box,
  Center,
  Group,
  Button,
  Space,
  TextInput,
  Text,
  ActionIcon,
  Anchor,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowNarrowRight } from "tabler-icons-react";

const GameCodeEntry = () => {
  const [gameCode, setGameCode] = useState<string>("");
  const handleJoinButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    alert(`Joining game ${gameCode}`);
  };
  return (
    <Group spacing="xs">
      <TextInput
        placeholder="Game Code"
        value={gameCode}
        onChange={(e) => {
          setGameCode(e.currentTarget.value);
        }}
      />
      <ActionIcon
        color="blue"
        variant="light"
        size="lg"
        disabled={gameCode.length < 1}
        onClick={handleJoinButton}
      >
        <ArrowNarrowRight />
      </ActionIcon>
    </Group>
  );
};
const Home = () => {
  const [gameCode, setGameCode] = useState<string>("");
  const handleJoinButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    alert(`Joining game ${gameCode}`);
  };
  return (
    <Center>
      <Box mt="xl">
        <Title align="center" mb="xl">
          Song Trivia
        </Title>
        <GameCodeEntry />
        <Text align="center" mt="xs">
          or{" "}
          <Anchor component={Link} to="/host">
            host a game
          </Anchor>
          .
        </Text>
      </Box>
    </Center>
  );
};
export default Home;

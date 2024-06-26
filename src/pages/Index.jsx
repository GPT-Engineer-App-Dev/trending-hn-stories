import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Input, Box, Link, useColorMode, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    fetchTopStories();
  }, []);

  useEffect(() => {
    filterStories();
  }, [searchTerm, stories]);

  const fetchTopStories = async () => {
    try {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();
      const top5StoryIds = storyIds.slice(0, 5);
      const storyPromises = top5StoryIds.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json()));
      const stories = await Promise.all(storyPromises);
      setStories(stories);
      setFilteredStories(stories);
    } catch (error) {
      console.error("Error fetching top stories:", error);
    }
  };

  const filterStories = () => {
    const filtered = stories.filter(story => story.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredStories(filtered);
  };

  return (
    <Container centerContent maxW="container.md" py={8} bg={useColorModeValue("orange.100", "orange.900")}>
      <VStack spacing={4} width="100%">
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Hacker News Top Stories</Text>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </Box>
        <Input
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredStories.map(story => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" width="100%" bg={useColorModeValue("orange.200", "orange.800")}>
            <Text fontSize="lg" fontWeight="bold" color="orange.700">{story.title}</Text>
            <Link href={story.url} color="orange.500" isExternal>Read more</Link>
            <Text color="orange.600">Upvotes: {story.score}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
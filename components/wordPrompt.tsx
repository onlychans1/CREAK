import React, { useEffect, useState } from "react";
import { Box, Center, Progress } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";

const WordPrompt = () => {
  useEffect(() => {
    const interval = setInterval(tickTimer, 70);
    fetchWords();
    // Clear service worker to prevent underflow
    return () => clearInterval(interval);
  }, []);
  const changeWordHandler = () => {
    
    setWords((lastWords) => {
      if (lastWords.length <= 3) {
        fetchWords();
      }
      lastWords.shift();
      return [...lastWords];
    });
  };
  const [words, setWords] = useState([]);
  const fetchWords = () => {
    fetch("https://random-word-api.herokuapp.com/word?number=10", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setWords((lastWords) => {
          return [...lastWords, ...data];
        });
      });
  };

  const [timer, setTimer] = useState(100);

  const tickTimer = () => {
    setTimer((lastTime) => {
      if (lastTime <= 0) {
        changeWordHandler();
        return 100;
      } 
      return lastTime - 1;
    });
  };

  return (
    <Center>
      <Box className="flex flex-col m-10" w="350px">
        <p className="text-center text-5xl">{words[0]}</p>
        <Progress value={timer} w="%100" size="xs" colorScheme="yellow" />
        <p className="text-center text-3xl">Words left: {words.length}</p>
        <button
          onClick={changeWordHandler}
          className="text-center border-5 border-black-600 border-solid"
        >
          Change Word
        </button>
        <button onClick={fetchWords}>Fetch Words</button>
      </Box>
    </Center>
  );
};

export default WordPrompt;
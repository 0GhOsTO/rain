import { useState, useEffect } from 'react'
import styled from "styled-components";
import RainFunction from "./RainFunction.tsx";

//#TODO:
//1. Finish conversion from javascript --> react
//START: 06:38
//2. Create the keyframe that convert from raining(HORIZONTAL)
//3. Convert that keyframe to raining(VERTICAL)


const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const Testing = styled.p<{ color?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.color || "black"};
`;

const Rain = styled.p`
    display:flex;
`;

function App() {
  // const [count, setCount] = useState(0)
  //   const [color, setColor] = useState<string>("#000");
  //
  //   useEffect(() => {
  //       // Function to generate a random color
  //       const getRandomColor = () => {
  //           return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  //       };
  //
  //       // Change color every 500 milliseconds (adjust as needed)
  //       const intervalId = setInterval(() => {
  //           setColor(getRandomColor());
  //       }, 500);
  //
  //       return () => clearInterval(intervalId);
  //   }, []);


  return (
    <>
        <Container>
            {/*<Testing color = {color}>Check</Testing>*/}
            <RainFunction/>
        </Container>

    </>
  );
}

export default App

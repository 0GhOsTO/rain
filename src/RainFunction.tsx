import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Create keyframes for raindrop animation


const Cloud = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #b0c4de;
`;

const Drop = styled.div<{ left: number }>`
  position: absolute;
  width: 2px;
  height: 10px;
  background-color: blue;
  top: 0;
  left: ${(props) => `${props.left}%`};
`;

type DropType = {
    id: number;
    left: number;
};

export default function Rain() {
    //Calling DropType Array: id: its own unique id / left: horizontal axis
    const [drops, setDrops] = useState<DropType[]>([]);

    useEffect(() => {
        const createDrop = () => {
            const newDrop = {
                id: Date.now(),             //Creates UNIQUE ID based on time
                left: Math.random() * 100,  // Random horizontal position
            };

            //... operator unpack the inner elements
            //create the new Drop
            setDrops((prevDrops) => [...prevDrops, newDrop]);
            //Why we are not doing setDrops([...drops, newDrops])?
            //setDrops update the value

            // Remove the drop after 2 seconds to prevent memory leaks
            setTimeout(() => {
                setDrops((prevDrops) =>
                    prevDrops.filter((drop) => drop.id !== newDrop.id)
                );
            }, 2000);
        };

        // Generate raindrops every 20ms
        const interval = setInterval(createDrop, 20);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <Cloud>
            {drops.map((drop) => (
                <Drop key={drop.id} left={drop.left} />
            ))}
        </Cloud>
    );
}

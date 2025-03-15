import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Create keyframes for raindrop animation

const fall = keyframes`
    0% {
        transform: translateY(0) scale(1);
    }
    70%{
        transform: translateY(90vh) scale(1);
    }
    100%{
        transform: translateY(90vh) scale(0);
    }
`;

const Cloud = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow:hidden;
`;

const Drop = styled.div<{ left: number }>`
    position: absolute;
    width: 2px;
    height: 10px;
    background-color: blue;
    top: 0;
    left: ${(props) => `${props.left}%`};
    
    animation: ${fall} 2s linear forwards;
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
            //setDrops([...drops, newDrop]);
            //this one creates the new drop immidiately before it's saved.
            //setDrops take long time compare to newDrop. newDrop creates before the setDrop
            //(prevDrops) prevent


            // Remove the drop after 2 seconds to prevent memory leaks
            setTimeout(() => {
                setDrops((tempDrops) =>
                    tempDrops.filter((drop) => drop.id !== newDrop.id)
                    //.filter creates the new array
                    //Only keeping the ones that have the same exact condition
                );
            }, 2000);

        };

        // call the method every 20milliseconds
        const interval = setInterval(createDrop, 20);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <Cloud>
            {drops.map((drop) => (
                <Drop left={drop.left} />
            ))}
        </Cloud>
    );
}

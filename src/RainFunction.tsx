import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Create keyframes for raindrop animation
const fall = keyframes`
    0% {
        transform: translateY(0) scale(1);
    }
    70% {
        transform: translateY(90vh) scale(1);
    }
    100% {
        transform: translateY(90vh) scale(0);
    }
`;

const Cloud = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
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
    const [drops, setDrops] = useState<DropType[]>([]);

    useEffect(() => {
        const createDrop = () => {
            if (drops.length < 100) {
                const newDrop = {
                    id: Date.now(),
                    left: Math.random() * 100,
                };
                setDrops((prevDrops) => [...prevDrops, newDrop]);
            }
        };

        // Create a drop every 200ms
        const interval = setInterval(createDrop, 20);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [drops]);

    // Function to remove drop on animation end
    const handleAnimationEnd = (id: number) => {
        setDrops((prevDrops) => prevDrops.filter((drop) => drop.id !== id));
    };

    return (
        <Cloud>
            {drops.map((drop) => (
                <Drop
                    key={drop.id}
                    left={drop.left}
                    onAnimationEnd={() => handleAnimationEnd(drop.id)}
                />
            ))}
        </Cloud>
    );
}

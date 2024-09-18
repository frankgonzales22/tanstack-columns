// ChartButton.tsx
import React, { ReactNode, MouseEvent } from "react";
import { Button, Tooltip } from "@chakra-ui/react"; // Import necessary components from your UI library
import { IconType } from "react-icons"; // Import IconType from react-icons for type safety

interface ChartButtonProps {
  label: string;
  icon: ReactNode; // ReactNode allows any type of children to be passed
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Use MouseEvent to capture click events
}

const ChartButton: React.FC<ChartButtonProps> = ({ label, icon, onClick }) => {
  return (
    <Tooltip hasArrow label={label} bg="blue.600">
      <Button
        color={"white"}
        colorScheme="teal"
        height={"50px"}
        width={"60px"}
        onClick={onClick}
        fontSize={"xx-large"}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default ChartButton;

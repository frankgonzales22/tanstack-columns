import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import DraggableItem from "./DraggableItem";

import DroppableArea from "./DroppableArea";

interface DragAndDropComponentProps {
  handleClear: () => void;
  data: any[];
  handleRow: (item: { name: string }) => void;
  handleColumn: (item: { name: string }) => void;
  handleValue: (item: { name: string }) => void;
  selectedRowDrop: string[];
  selectedColumnDrop: string[];
  selectedValueDrop: string[];
  setSelectedRowDrop: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedColumnDrop: React.Dispatch<React.SetStateAction<string[]>>;
}

const DragAndDropComponent: React.FC<DragAndDropComponentProps> = ({
  handleClear,
  data,
  handleRow,
  handleColumn,
  handleValue,
  selectedRowDrop,
  selectedColumnDrop,
  selectedValueDrop,
  setSelectedRowDrop,
  setSelectedColumnDrop,
}) => {
  return (
    <HStack>
      <Button _hover={{ cursor: "pointer" }} onClick={handleClear}>
        Clear
      </Button>
      <Box border={"1px solid black"} w={300}>
        <ul>
          {data.length > 0 &&
            Object.keys(data[0]).map((i) => (
              <DraggableItem key={i} name={i} />
            ))}
        </ul>
      </Box>
      <Box >
        <DroppableArea
          onDrop={handleRow}
          title="ROW"
          droppedItems={selectedRowDrop}
          setDroppedItems={setSelectedRowDrop}
        />
        <DroppableArea
          onDrop={handleColumn}
          title="COLUMNS"
          droppedItems={selectedColumnDrop}
          setDroppedItems={setSelectedColumnDrop}
        />
        <DroppableArea
          onDrop={handleValue}
          title="VALUES"
          droppedItems={selectedValueDrop}
          setDroppedItems={() => {}} // Dummy setDroppedItems function
        />
      </Box>
    </HStack>
  );
};

export default DragAndDropComponent;
// DroppableArea.tsx
import React from 'react';
import { useDrop } from 'react-dnd';

interface DroppableAreaProps {
  onDrop: (item: { name: string }) => void;
  title : string
  droppedItem : string[]
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, title, droppedItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    drop: (item: { name: string }) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: `2px dashed ${isOver ? 'green' : 'black'}`,
        padding: '16px',
        // minHeight: '100px',
      }}
    >
      {title}
      <h4>{droppedItem.join(' ')}</h4>
    </div>
  );
};

export default DroppableArea;

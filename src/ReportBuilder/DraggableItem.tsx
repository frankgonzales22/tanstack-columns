// DraggableItem.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  name: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #000',
        padding: '8px',
        marginBottom: '8px',
      }}
    >
      {name}
    </div>
  );
};

export default DraggableItem;

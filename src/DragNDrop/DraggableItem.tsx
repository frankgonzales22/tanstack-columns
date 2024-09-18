// DraggableItem.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { names } from '../Utilities/RenameDraggableItem';

interface DraggableItemProps {
  name: string;
}

export const findLabelByName = (name: string) => {
  const foundItem = names.find((item) => item.values.includes(name));
  return foundItem ? foundItem.label : name;
};


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

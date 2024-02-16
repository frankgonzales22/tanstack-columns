import React, { useEffect, useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend';

// Draggable Item component
const DraggableItem = ({ id, text }: { id: string; text: string }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BOX_ITEM', // Add type property here
    item: { id, text, type: 'BOX_ITEM' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {text}
    </div>
  );
};

// Draggable BoxItem component
const DraggableBoxItem = ({ id, text }: { id: string; text: string }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'BOX_ITEM',
    item: { id, text, type: 'BOX_ITEM' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect(() => {
    const handleStart = () => {
      console.log("Item being dragged:", id);
    };

    if (isDragging) {
      handleStart();
    }
  }, [isDragging, id]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {text}
    </div>
  );
};
// Box component
const Box = () => {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);

  const [{ isOver }, drop] = useDrop<{ id: string; text: string }, void, { isOver: boolean }>({
    accept: 'BOX_ITEM',
    drop: (item, monitor) => {
      // Check if the item is already in the box
      if (!items.some(existingItem => existingItem.id === item.id)) {
        const newItem = { id: item.id, text: item.text };
        setItems([...items, newItem]);
      }
    },
  });

  const [, dropRef] = useDrop<{ id: string; text: string }, void, { isOver: boolean }>({
    accept: 'BOX_ITEM',
    drop: (item, monitor) => {
      // Rearrange items within the box
      const dragIndex = items.findIndex(i => i.id === item.id);
      const hoverIndex = items.length;
      const newItems = [...items.slice(0, dragIndex), ...items.slice(dragIndex + 1)];
      newItems.splice(hoverIndex, 0, { id: item.id, text: item.text });
      setItems(newItems);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div ref={drop} style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
      <h2>Box</h2>
      <div ref={dropRef}>
        {items.map(item => (
          <DraggableBoxItem key={item.id} id={item.id} text={item.text} />
        ))}
      </div>
      {isOver && <div style={{ marginTop: '10px' }}>Drop here to rearrange</div>}
    </div>
  )
}

// App component
const RearrangeAAAA = () => {
  const initialItems = [
    { id: '1', text: 'Drag me to the box' },
    { id: '2', text: 'Drag me to the 2' },
    { id: '3', text: 'Drag me to the 1' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {initialItems.map(item => (
          <DraggableItem key={item.id} id={item.id} text={item.text} />
        ))}
        <Box />
      </div>
    </DndProvider>
  )
}

export default RearrangeAAAA;

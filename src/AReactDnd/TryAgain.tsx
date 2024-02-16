import React, { useState, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Item {
  id: string;
  text: string;
}

interface ContainerProps {
  items: Item[];
  onItemMove: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem: React.FC<{ id: string; text: string }> = ({ id, text }) => {
  const [, drag] = useDrag({
    type: 'ITEM' ,
  });

  return (
    <div ref={drag} style={{ border: '1px solid black', padding: '8px', marginBottom: '4px', cursor: 'move' }}>
      {text}
    </div>
  );
};

const Container: React.FC<ContainerProps> = ({ items, onItemMove }) => {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (item: Item, monitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }

      const dragIndex = items.findIndex((i) => i.id === item.id);
      const hoverIndex = items.findIndex((i) => i.id !== item.id);

      onItemMove(dragIndex, hoverIndex);
    },
  });

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  return (
    <div ref={drop} style={{ minHeight: '100px', padding: '8px', border: '1px solid black' }}>
      {items.map((item, index) => (
        <div key={item.id} ref={(el) => (itemRefs.current[index] = el)} style={{ width: '100%' }}>
          <DraggableItem id={item.id} text={item.text} />
        </div>
      ))}
    </div>
  );
};

const ParentComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ]);

  const handleItemMove = (dragIndex: number, hoverIndex: number) => {
    const newItems = [...items];
    const dragItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);

    setItems(newItems);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <Container items={items} onItemMove={handleItemMove} />
    </div>
  );
};

export const TryAgain: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ParentComponent />
    </DndProvider>
  );
};

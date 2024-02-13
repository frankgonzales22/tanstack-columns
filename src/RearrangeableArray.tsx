import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Item {
  id: string;
  text: string;
}

const RearrangeableArray: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
  ]);

  const moveItem = (dragIndex: any, hoverIndex: any) => {
    const draggedItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setItems(newItems);
  };

  const renderDraggableItem = (item: Item, index: any) => {
    const [, drag] = useDrag({
      type: 'ITEM',
      item: { index },
    });

    const [, drop] = useDrop({
      accept: 'ITEM',
      hover: (item: { index: any }, monitor) => {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    })

    return (
      <div ref={node => drag(drop(node))} key={item.id} style={{ padding: '8px', border: '1px solid #ccc', marginBottom: '4px', cursor: 'move', backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }}>
        {item.text}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Rearrangeable Array</h2>
        {items.map((item, index) => renderDraggableItem(item, index))}
      </div>
    </DndProvider>
  );
};

export default RearrangeableArray;

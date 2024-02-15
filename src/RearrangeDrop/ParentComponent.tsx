// ParentComponent.tsx
import React, { useState } from 'react';
import DroppableArea from './DroppableArea';

const ParentComponent: React.FC = () => {
  const [items, setItems] = useState<string[]>(['item 1', 'item 2', 'item 3']);
  const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
  const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
  const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);

  const handleRowDrop = (droppedItem: string) => {
    setSelectedRowDrop((prevItems) => [...prevItems, droppedItem]);
  };

  const handleColumnDrop = (droppedItem: string) => {
    setSelectedColumnDrop((prevItems) => [...prevItems, droppedItem]);
  };

  const handleValueDrop = (droppedItem: string) => {
    setSelectedValueDrop((prevItems) => [...prevItems, droppedItem]);
  };

  return (
    <div>
      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
        <h2>Main Box</h2>
        {items.map((item, index) => (
          <div key={index} draggable onDragStart={(e) => e.dataTransfer.setData('text', item)}>
            {item}
          </div>
        ))}
      </div>
      <DroppableArea onDrop={handleRowDrop} title='ROW' droppedItems={items}  setDroppedItems={setItems}/>
      {/* <DroppableArea onDrop={handleColumnDrop} title='COLUMNS' droppedItems={selectedColumnDrop} />
      <DroppableArea onDrop={handleValueDrop} title='VALUES' droppedItems={selectedValueDrop} /> */}
    </div>
  )
}

export default ParentComponent;

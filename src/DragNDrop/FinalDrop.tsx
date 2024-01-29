// App.tsx
import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import DroppableArea from './DroppableArea';

const FinalDrop: React.FC = () => {
    const [selectedRow, setSelectedRow] = useState<string[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string[]>([]);

    const handleRow = (item: { name: string }) => {
        setSelectedRow([item.name]);
        console.log(item)
    };


    const handleColumn = (item: { name: string }) => {
        setSelectedColumn([item.name])
    };


    const handleValue = (item: { name: string }) => {
        setSelectedValue([item.name])
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Simple Drag and Drop Example</h1>
            <DraggableItem name="Item 1" />
            <DraggableItem name="Item 2" />
            <DraggableItem name="Item 3" />
            <DroppableArea onDrop={handleRow} title='ROW' droppedItem={selectedRow}/>
            <DroppableArea onDrop={handleColumn} title='COLUMNS' droppedItem={selectedColumn}/>
            <DroppableArea onDrop={handleValue} title='VALUES' droppedItem={selectedValue}/>
            {/* <div>
                <h3>Dropped Items:</h3>
                <ul>
                    {droppedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div> */}
            {/* <h1>{otherDrop}</h1> */}
        </div>
    );
};

export default FinalDrop;
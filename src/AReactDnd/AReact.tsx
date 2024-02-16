import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Define item type
const ItemTypes = {
    ITEM: 'item',
};

// Item component
const Item: React.FC<{ name: string }> = ({ name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ITEM,
        item: { type: ItemTypes.ITEM, name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    // Log the draggable item when it is being dragged
    console.log("Dragging item:", name);

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                border: '1px solid black',
                padding: '0.5rem',
                margin: '0.5rem',
                backgroundColor: 'lightgray',
            }}
        >
            {name}
        </div>
    )
}

// MainSource component
const MainSource: React.FC = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
    return (
        <div style={{}}>
            <h2>Main Source</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {items.map((item, index) => (
                    <Item key={index} name={item} />
                ))}
            </div>
        </div>
    );
};

// Row component
const Row: React.FC = () => {
    const [droppedItems, setDroppedItems] = useState<string[]>([]);
    
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item: { name: string }) => {
            setDroppedItems([...droppedItems, item.name]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const draggedItem = droppedItems[dragIndex]
        const newItems = [...droppedItems]
        newItems.splice(dragIndex, 1)
        newItems.splice(hoverIndex, 0, draggedItem)
        setDroppedItems(newItems);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
                ref={drop}
                style={{
                    width: '100px',
                    height: '300px',
                    border: '2px dashed gray',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isOver ? 'lightblue' : 'transparent',
                }}
            >
                <h2>Row</h2>
                {droppedItems.map((item, index) => (
                    <DraggableItem key={index} index={index} name={item} moveItem={moveItem} />
                ))}
            </div>
            <div style={{ marginTop: '1rem', border: '1px solid black', padding: '1rem' }}>
                <h3>Row Display</h3>
                {droppedItems.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    )
}

// DraggableItem component within Row
const DraggableItem: React.FC<{ index: number, name: string, moveItem: (dragIndex: number, hoverIndex: number) => void }> = ({ index, name, moveItem }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ITEM,
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.ITEM,
        hover: (item: { index: number }) => {
            const dragIndex = item.index;
            if (dragIndex === index) {
                return;
            }
            moveItem(dragIndex, index);
            item.index = index;
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Item name={name} />
        </div>
    );
};

// App component
const AReact: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <MainSource />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '2rem' }}>
                    <Row />
                </div>
            </div>
        </DndProvider>
    );
};

export default AReact;

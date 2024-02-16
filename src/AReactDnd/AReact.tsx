import React, { useState, useRef, useCallback } from 'react';
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
        item: { type: ItemTypes.ITEM, name, fromMainSource: true }, // Indicates if the item is from the main source
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

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        const draggedItem = droppedItems[dragIndex];
        const newItems = [...droppedItems];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        setDroppedItems(newItems);
    }, [droppedItems]);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item: { name: string, fromMainSource: boolean }) => {
            if (item.fromMainSource) { // Only add the item if it's from the main source
                setDroppedItems([...droppedItems, item.name]);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

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

// DraggableItem component
interface DraggableItemProps {
    index: number;
    name: string;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ index, name, moveItem }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ITEM,
        item: { type: ItemTypes.ITEM, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    console.log("Dragging draggables:", name);


    const [, drop] = useDrop({
        accept: ItemTypes.ITEM,
        hover: (item: { index: number }) => {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
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
    );
};

// App component
const AReact: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <MainSource />
                    <Row />
                </div>
            </div>
        </DndProvider>
    );
};

export default AReact;

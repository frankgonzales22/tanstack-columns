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
    );
};

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
    const moveItem = (dragIndex: any, hoverIndex: any) => {
        const draggedItem = droppedItems[dragIndex]
        const newItems = [...droppedItems]
        newItems.splice(dragIndex, 1)
        newItems.splice(hoverIndex, 0, draggedItem)
        setDroppedItems(newItems);
    }

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item: { name: string }) => {
            setDroppedItems([...droppedItems, item.name]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
    const renderDraggableItem = (item: string, index: any) => {
        const [, dragItem] = useDrag({
            type: 'item',
            item: { index },
        })

        const [, drop] = useDrop({
            accept: 'item',
            drop: (item: { index: any }, monitor) => {
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
            <div ref={node => dragItem(drop(node))} key={index}
                style={{
                    padding: '8px', border:
                        '1px solid #ccc', marginBottom:
                        '4px', cursor:
                        'move', backgroundColor: index % 2 === 0 ? 'lightblue' : '#ffffff'
                }}>
                {item}
            </div>
        )
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
                    <div key={index}>{item}</div>
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

// Column component
const Column: React.FC = () => {
    const [droppedItems, setDroppedItems] = useState<string[]>([]);
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop: (item: { name: string }) => {
            setDroppedItems([...droppedItems, item.name]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
                ref={drop}
                style={{
                    width: '300px',
                    height: '300px',
                    border: '2px dashed gray',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isOver ? 'lightgreen' : 'transparent',
                }}
            >
                <h2>Column</h2>
                {droppedItems.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
            <div style={{ marginTop: '1rem', border: '1px solid black', padding: '1rem' }}>
                <h3>Column Display</h3>
                {droppedItems.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    )
}

// App component
const AReact: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <MainSource />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '2rem' }}>
                    <Row />
                    <Column />
                </div>
            </div>
        </DndProvider>
    );
};

export default AReact;

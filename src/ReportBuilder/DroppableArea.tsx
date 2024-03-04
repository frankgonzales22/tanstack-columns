// DroppableArea.tsx
import React, { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DroppableAreaProps {
    onDrop: (item: { name: string }) => void;
    title: string
    droppedItems: string[]
    setDroppedItems?: (any: any) => void
}
interface DraggableItemRearrangeProps {
    index: number;
    name: string;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}
const DraggableItemRearrange: React.FC<DraggableItemRearrangeProps> = ({ index, name, moveItem }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag({
        type: 'row',
        item: { type: 'item', index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const [, drop] = useDrop({
        accept: 'row',
        drop: (item: { index: number }) => {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex;
        },
    })
    drag(drop(ref))
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
    )
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, title, droppedItems, setDroppedItems }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'item',
        drop: (item: { name: string }) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
        const draggedItem = droppedItems[dragIndex]
        const newItems = [...droppedItems]
        newItems.splice(dragIndex, 1)
        newItems.splice(hoverIndex, 0, draggedItem)
        if (setDroppedItems) {
            setDroppedItems(newItems)
        }
    }, [droppedItems])

    return (
        <div
            ref={drop}
            style={{
                width: '200px',
                height: '200px',
                border: '2px dashed gray',
                alignItems: 'center',
                backgroundColor: isOver ? 'lightblue' : 'transparent',
            }}
        >
            {title}
            {droppedItems.map((item, index) => (
                <DraggableItemRearrange
                    key={index}
                    index={index}
                    name={item}
                    moveItem={moveItem}
                />
            ))}
        </div>
    );
};

export default DroppableArea;

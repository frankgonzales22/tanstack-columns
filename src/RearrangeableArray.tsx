import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface Item {
  id: string;
  text: string;
}
interface RearrangeableArrayProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  // setItems: (any : any) => void
}

const RearrangeableArray: React.FC<RearrangeableArrayProps> = ({ items, setItems }) => {
  // const [, drag] = useDrag({
  //   item: { type: ItemTypes.ITEM, name, index },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: ItemTypes.ITEM,
  //   item: { type: ItemTypes.ITEM, name },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  const moveItem = (dragIndex: any, hoverIndex: any) => {
    const draggedItem = items[dragIndex]
    const newItems = [...items]
    newItems.splice(dragIndex, 1)
    newItems.splice(hoverIndex, 0, draggedItem)
    setItems(newItems)
  }

  const renderDraggableItem = (item: Item, index: any) => {
    const [, drag] = useDrag({
      type: 'ITEM',
      item: { index },
    })

    const [, drop] = useDrop({
      accept: 'ITEM',
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
      <div ref={node => drag(drop(node))} key={item.id}
        style={{
          padding: '8px', border:
            '1px solid #ccc', marginBottom:
            '4px', cursor:
            'move', backgroundColor: index % 2 === 0 ? 'lightblue' : '#ffffff'
        }}>
        {item.text}
      </div>
    )
  }



  return (
      <div style={{backgroundColor : 'gray'}}>
        <h2>Rearrangeable Array</h2>
        {items.map((item, index) => renderDraggableItem(item, index))}
      </div>
  )
}

export default RearrangeableArray;  

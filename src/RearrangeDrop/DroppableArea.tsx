// // DroppableArea.tsx
// import React from 'react';

// interface DroppableAreaProps {
//   onDrop: (item: string) => void;
//   title: string;
//   droppedItems: string[];
// }

// const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, title, droppedItems }) => {
//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedItem = e.dataTransfer.getData('text');
//     onDrop(droppedItem);
//   };

//   const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <div
//       style={{ border: '1px solid black', margin: '10px', padding: '10px' }}
//       onDrop={handleDrop}
//       onDragOver={allowDrop}
//     >
//       <h3>{title}</h3>
//       <ul>
//         {droppedItems.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DroppableArea;


// DroppableArea.tsx
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DroppableAreaProps {
    onDrop: (item: string) => void;
    title: string;
    droppedItems: string[];
    setDroppedItems: React.Dispatch<React.SetStateAction<string[]>>;

}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, title, droppedItems, setDroppedItems }) => {
    const moveItem = (dragIndex: any, hoverIndex: any) => {
        const draggedItem = droppedItems[dragIndex]
        const newItems = [...droppedItems]
        newItems.splice(dragIndex, 1)
        newItems.splice(hoverIndex, 0, draggedItem)
        setDroppedItems(newItems);
    }

    const renderDraggableItem = (item: string, index: any) => {
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
          <div ref={node => drag(drop(node))} key={index}
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
    

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedItem = e.dataTransfer.getData('text');
        onDrop(droppedItem);
    };

    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            style={{ border: '1px solid black', margin: '10px', padding: '10px' }}
            onDrop={handleDrop}
            onDragOver={allowDrop}
        >
            <h3>{title}</h3>
            {droppedItems.map((item, index) => renderDraggableItem(item, index))}

              {/* <ul>
                  {droppedItems.map((item, index) => (
                      <li key={index}>{item}</li>
                  ))}
              </ul> */}
        </div>
    );
};

export default DroppableArea;

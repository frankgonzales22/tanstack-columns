import React, { useState, useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

interface BoxItem {
  id: number;
  text: string;
  index: number;
}

interface DragItem {
  type: string;
  id: number;
  index: number;
}

interface BoxProps {
  id: number;
  text: string;
  index: number;
  moveBox: (dragIndex: number, hoverIndex: number) => void;
}

const ItemTypes = {
  BOX: 'box',
};

const Box: React.FC<BoxProps> = ({ id, text, index, moveBox }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveBox(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={ref} style={{ opacity }} className="box">
      {text}
    </div>
  )
};

const Rearrange: React.FC = () => {
  const [boxes, setBoxes] = useState<BoxItem[]>([
    { id: 1, text: 'Box 1', index: 0 },
    { id: 2, text: 'Box 2', index: 1 },
    { id: 3, text: 'Box 3', index: 2 },
    { id: 4, text: 'Box 4', index: 3 },
  ]);

  const moveBox = (dragIndex: number, hoverIndex: number) => {
    const dragBox = boxes[dragIndex];
    const newBoxes = [...boxes];
    newBoxes.splice(dragIndex, 1);
    newBoxes.splice(hoverIndex, 0, dragBox);
    setBoxes(newBoxes.map((box, index) => ({ ...box, index })));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {boxes.map((box) => (
          <Box key={box.id} index={box.index} id={box.id} text={box.text} moveBox={moveBox} />
        ))}
      </div>
    </DndProvider>
  )
}

export default Rearrange;

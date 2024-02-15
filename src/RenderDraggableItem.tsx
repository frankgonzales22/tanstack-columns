import React, { useState } from 'react'
// import RearrangeableArray, { Item } from './RearrangeableArray';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RearrangeableArray from './RearrangeableArray';

const RenderDraggableItem = () => {
    const [items, setItems] = useState<any[]>([
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
    ]);
    const [items1, setItems1] = useState<any[]>([
        'Item 3',
        'Item 4',
        'Item 5',
    ]);
    return (
        <DndProvider backend={HTML5Backend}>
            <RearrangeableArray items={items} setItems={setItems} />
            <RearrangeableArray items={items1} setItems={setItems1} />
            <RearrangeableArray items={items} setItems={setItems} />
        </DndProvider>
    )
}

export default RenderDraggableItem
import React, { useState } from 'react';
import ChildProp from './ChildProp';


const ParentProp: React.FC = () => {
  const [array, setArray] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);

  return (
    <div>
      <h1>ParentProp</h1>
      <ChildProp initialArray={array} setArray={setArray} />
    </div>
  );
};

export default ParentProp;
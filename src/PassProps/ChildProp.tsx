import React, { useState } from 'react';

interface Props {
  initialArray: string[];
  setArray: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChildProp: React.FC<Props> = ({ initialArray, setArray }) => {
  const handleClick = () => {
    // Add a new string to the array
    const updatedArray = [...initialArray, `Item ${initialArray.length + 1}`];
    setArray(updatedArray);
  };

  return (
    <div>
      <p>Array items:</p>
      <ul>
        {initialArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleClick}>Add Item</button>
    </div>
  );
};

export default ChildProp;
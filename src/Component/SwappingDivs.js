import React, { useState } from 'react';

const SwappingDivs = () => {
  // State to hold the selected value
  const [selectedValue, setSelectedValue] = useState('');

  // Event handler for dropdown change
  const handleDropdownChange = (event) => {
    // Update the state with the selected value
    console.log(event)
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      {/* Dropdown/select element */}
      <select value={selectedValue} onChange={handleDropdownChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      {/* Display the selected value */}
      <p>Selected value: {selectedValue}</p>
    </div>
  );
};

export default SwappingDivs;

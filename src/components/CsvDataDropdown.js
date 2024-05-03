import React from 'react';

const CsvDataDropdown = ({ label, columns, selectedColumn, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select value={selectedColumn} onChange={(e) => onChange(e.target.value)}>
        {columns.map(column => (
          <option key={column} value={column}>{column}</option>
        ))}
      </select>

      
    </div>
  );
}

export default CsvDataDropdown;

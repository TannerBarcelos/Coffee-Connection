import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const filterOptions = [
  {
    key: 'High to Low',
    text: 'High to Low',
    value: 'High to Low',
  },
  {
    key: 'Low to High',
    text: 'Low to High',
    value: 'Low to High',
  },
  {
    key: 'Alphabetically',
    text: 'Alphabetically',
    value: 'Alphabetically',
  },
  {
    key: 'By Distance',
    text: 'By Distance',
    value: 'By Distance',
  },
];

const FilterShops = ({ filter }) => {
  return (
    <Dropdown
      className="filterable"
      placeholder="Select a Filter Method"
      fluid
      selection
      options={filterOptions}
      onChange={(e) => filter(e.target.textContent)}
      style={{ marginTop: '1.5rem', marginBottom: '2rem' }}
    />
  );
};

export default FilterShops;

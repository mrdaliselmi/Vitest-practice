import React, { useState } from 'react';

const Folder = ({ name, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleFolder} style={{ cursor: 'pointer' }}>
        {isOpen ? '📂' : '📁'} {name}
      </div>
      {isOpen && (
        <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
          {items.map((item, index) => (
            <li key={index}>
              {typeof item === 'string' ? item : <Folder {...item} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Folder;

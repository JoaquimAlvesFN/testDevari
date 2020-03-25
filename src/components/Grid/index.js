import React from 'react';

import './index.css';

export default function Grid(props) {
  return (
    <div className="gridContainer">
        {props.children}        
    </div>
  );
}

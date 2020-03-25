import React from 'react';

import './index.css';

export default function Form(props) {
  return (
    <div className="container">
        {props.children}
    </div>
  );
}

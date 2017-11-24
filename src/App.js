import './App.css';
import React from 'react';
import Scroll from './Scroll';

const App = props => {
  let names = [];
  for (let i = 1; i <= 7000; i++) {
    names.push('random name ' + i);
  }

  return (
    <div className="app">
      <Scroll numRows={100000} rowHeight={50} />
    </div>
  );
};

export default App;

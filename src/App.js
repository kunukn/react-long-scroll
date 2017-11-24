import './App.css';
import React from 'react';
import Scroll from './Scroll';


const renderItem = (id) => <div>item {id + 1}</div>;

const App = props => (
  <div className="app">
    <Scroll items={1000} itemHeight={50} renderItem={renderItem} />
  </div>);
  
export default App;

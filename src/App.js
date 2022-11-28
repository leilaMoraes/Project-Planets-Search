import React from 'react';
import Filters from './components/Filters';
import Header from './components/Header';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Filters />
      <Table />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import EventSchedule from './components/EventSchedule';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <button className="nav-button">EVENTS</button>
          <button className="nav-button">CALENDAR</button>
        </nav>
      </header>
      <EventSchedule />
    </div>
  );
}

export default App;

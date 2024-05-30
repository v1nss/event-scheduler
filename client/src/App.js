import React from 'react';
import EventSchedule from './components/EventSchedule';

function App() {
  return (
    <div className="text-center font-sans overflow-hidden">
      <header className="bg-blue-700 text-white p-5 overflow-hidden">
        <nav>
          <button className="bg-transparent border-none text-white text-lg mx-2">EVENTS</button>
          <button className="bg-transparent border-none text-white text-lg mx-2">CALENDAR</button>
        </nav>
      </header>
      <EventSchedule />
    </div>
  );
}

export default App;

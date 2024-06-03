import React from 'react';
import EventSchedule from './components/EventSchedule';

function App() {
  return (
    <div className="text-center font-sans h-80p overflow-y-hidden">
      <header className="bg-blue-700 text-white p-5 absolute w-100p">
        <nav>
          <button className="bg-transparent border-none text-white text-lg mx-2 font-bold">EVENTS</button>
          {/* <button className="bg-transparent border-none text-white text-lg mx-2 font-bold">CALENDAR</button> */}
        </nav>
      </header>
      <EventSchedule />
    </div>
  );
}

export default App;

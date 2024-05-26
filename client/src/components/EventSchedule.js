import React from 'react';
import './EventSchedule.css';
import EventItem from './EventItem';


function EventSchedule() {
  return (
    <div className="event-schedule">
      <div className="event-schedule-header">
        <h2>Event Schedule</h2>
        <button className="add-event-button">ADD AN EVENT</button>
      </div>
        <EventItem/>
    </div>
  );
}

export default EventSchedule;

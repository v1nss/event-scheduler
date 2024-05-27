import React, { useState } from 'react';
import './EventSchedule.css';
import EventItem from './EventItem';
import ShowForm from './ShowForm';

function EventSchedule() {

    const [showForm, setShowForm] = useState(false);



  return (
    <>
    
    <div className="event-schedule">
      <div className="event-schedule-header">
        <h2>Event Schedule</h2>
        { showForm ? (
        <ShowForm/>
        ) : (
        <button className="add-event-button" 
            onClick={()=> setShowForm(true)}>
            ADD AN EVENT
        </button>
        )}
      </div>
        <div className='eventItem-container'>
            <EventItem/>
        </div>
    </div>
    </>
  );
}

export default EventSchedule;

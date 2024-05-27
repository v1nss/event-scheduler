import React, { useState } from 'react';
import './styles/EventSchedule.css';
import EventItem from './EventItem';
import ShowForm from './ShowForm';
import Modal from './Modal';


function EventSchedule() {

  const [showForm, setShowForm] = useState(false);

  return (
   <>
    <div className="event-schedule">
      <div className="event-schedule-header">
        <h2>Event Schedule</h2>
      </div>
        <button className="add-event-button" 
          onClick={()=> setShowForm(true)}>
          ADD AN EVENT
        </button>
      <div className='eventItem-container'>
          <EventItem/>
      </div>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ShowForm onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
   </>
  );
}

export default EventSchedule;

import React, { useState } from 'react';
// import './styles/EventSchedule.css';
import EventItem from './EventItem';
import ShowForm from './ShowForm';
import Modal from './Modal';


function EventSchedule() {

  const [showForm, setShowForm] = useState(false);

  return (
   <>
    <div className="flex flex-col items-center bg-slate-200 h-screen">

      <div className="flex flex-row m-6 w-80p justify-between items-center">
        <h2 className='font-bold text-2xl px-2.5 '>Event Schedule</h2>
        <button className="font-bold text-sm px-2.5 rounded-lg bg-blue-500 h-14" 
          onClick={()=> setShowForm(true)}>
          ADD AN EVENT
        </button>
      </div>

      <EventItem/>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ShowForm onCancel={() => setShowForm(false)} />
      </Modal>

    </div>
   </>
  );
}

export default EventSchedule;

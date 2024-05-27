import React, { useEffect, useState} from 'react';
import './styles/EventItem.css';
import EventEdit from './EventEdit';
import Modal from "./Modal";

const EventItem = () => {
    const [events, setEvents] = useState([]);
    const [showEditEvent, setShowEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);


    const deleteEvent = async id => {
        try {
          const deleteEvent = await fetch(`http://localhost:5000/events/${id}`, {
            method: "DELETE"
          });

          setEvents(events.filter(event => event.event_id !== id))
        } catch (err) {
          console.error(err.message);
        }
    }
    
    const getEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/events");
            const jsonData = await response.json();

            setEvents(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleEditClick = (event) => {
      setSelectedEvent(event);
      setShowEditEvent(true);
    };


    console.log(events);

  return (
    <table className='event-table'>
    <thead>
        <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Event Start</th>
            <th>Event End</th>
            <th>Location</th>
            <th>Cost</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {events.map(event => (
            <tr key={event.event_id}>
                <td>{event.event_name}</td>
                <td>{event.event_description}</td>
                <td>{event.event_start}</td>
                <td>{event.event_end}</td>
                <td>{event.location}</td>
                <td>₱{event.event_cost}</td>
                <td>
                    <button 
                        className="edit-button" 
                        onClick={() => handleEditClick(event)}
                    >
                    </button>
                    <button 
                        className="delete-button" 
                        onClick={() => deleteEvent(event.event_id)}
                    >
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
    <Modal isOpen={showEditEvent} onClose={() => setShowEditEvent(false)}>
        {selectedEvent && (
            <EventEdit onCancel={() => setShowEditEvent(false)} event={selectedEvent} />
        )}
    </Modal>
</table>
  );
}

export default EventItem;

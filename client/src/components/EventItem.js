import React, { useEffect, useState} from 'react';
// import './styles/EventItem.css';
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
    <div className="mt-20 rounded-lg shadow-lg bg-white w-80p h-70p overflow-auto ">
        <div className='h-20 items-center flex justify-between '>
            <input
                type="search"
                name="search-form"
                id="search-form"
                className="px-4 h-10 w-70p ml-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                // onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event"
            />
            <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
                {/* Dropdown content goes here */}
            </div>

        </div>
        <table className="w-full border-collapse border-none">
            <thead className='h-20 sticky top-0 z-10 bg-slate-200'>
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
                    <tr key={event.event_id} className='h-20'>
                        <td>{event.event_name}</td>
                        <td>{event.event_description}</td>
                        <td>{event.event_start}</td>
                        <td>{event.event_end}</td>
                        <td>{event.location}</td>
                        <td>₱{event.event_cost}</td>
                        <td>
                            <button 
                                className="bg-no-repeat bg-contain w-8 h-8 m-3 bg-edit-icon"
                                onClick={() => handleEditClick(event)}
                            >
                            </button>
                            <button 
                                className="bg-no-repeat bg-contain w-8 h-8 m-3 bg-edit-icon"
                                onClick={() => handleEditClick(event)}
                            >
                            </button>
                            <button 
                                className="bg-no-repeat bg-contain w-8 h-8 m-3 bg-delete-icon" 
                                
                                onClick={() => {if (window.confirm('Are you sure you want to delete this event?')) {
                                    deleteEvent(event.event_id);
                                }}}
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
    </div>
  );
}

export default EventItem;

import React, { useEffect, useState} from 'react';
import './EventItem.css';

const EventItem = () => {
    const [events, setEvents] = useState([]);

    const deleteEvent = async id => {
        try {
          const deleteEvent = await fetch(`http:localhost:5000/events/${id}`, {
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
      {events.map(events => (
        <tr key={events.event_id}>
          <td>{events.event_name}</td>
          <td>{events.event_description}</td>
          <td>{events.event_start}</td>
          <td>{events.event_end}</td>
          <td>{events.location}</td>
          <td>{events.event_cost}</td>
          <button className="edit-button"/>
          <button 
            className="delete-button"
            onClick={() => deleteEvent(events.event_id)}  
          />
        </tr>
      ))}
    </tbody>
  </table>
  );
}

export default EventItem;

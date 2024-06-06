import React, { useEffect, useState } from 'react';
import EventEdit from './EventEdit';
import EventInfo from './EventInfo';
import Modal from "./Modal";
import { format, parseISO, isValid } from 'date-fns';

const EventItem = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showEditEvent, setShowEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false)
    const [showInfoEvent, setShowInfoEvent] = useState(false);

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

    const handleInfoClick = (event) => {
        setSelectedEvent(event);
        setShowInfoEvent(true);
      };

    function handleSearch(searchQuery){
        setSearchQuery(searchQuery);
        if (searchQuery === ""){
            setIsSearching(false);
        } else {
            setIsSearching(true);
        }
    }
    
    useEffect(() => {
        const filtered = events.filter(event =>
          event.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.event_description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEvents(filtered);
      }, [searchQuery, events]);

      const formatDate = (dateString) => {
        if (!dateString) {
          console.error('Date string is undefined or empty');
          return 'Invalid date';
        }
      
        try {
          const parsedDate = parseISO(dateString);
          console.log('Parsed Date:', parsedDate);
          if (isValid(parsedDate)) {
            return format(parsedDate, 'PPpp');
          } else {
            console.error('Invalid date string:', dateString);
            return 'Invalid date';
          }
        } catch (error) {
          console.error('Error parsing date:', dateString, error);
          return 'Invalid date';
        }
      };
    

  return (
    <div className=" rounded-lg shadow-lg bg-white w-80p h-70p overflow-auto scrollbar-thin hover:scrollbar-show">
        <div className='h-20 items-center flex justify-between '>
            <input
                type="search"
                name="search-form"
                id="search-form"
                className="px-4 h-10 w-75p ml-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={(e) => {handleSearch(e.target.value)}}
                placeholder="Search event"
            />
            <select className="pl-90p px-4 h-10 w-20p mx-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
                <option>Default</option>
                <option>Newer</option>
                <option>Oldest</option>
            </select>

        </div>
        <table className="w-full table-fixed border-collapse ">
            <thead className='h-20 sticky top-0 z-10 bg-slate-300'>
                <tr className=''>
                    <th>Company Name</th>
                    <th>Event Description</th>
                    <th>Start & End</th>
                    <th>Location</th>
                    <th>Event Space</th>
                    <th>More Option</th>
                </tr>
            </thead>
            {isSearching ? (
                <tbody>
                {filteredEvents.map(events => (
                    <tr className='h-20' key={events.event_id}>
                        <td>{events.event_name}</td>
                        <td><span className="block max-w-xs truncate" title={events.event_description}>
                            {events.event_description}
                        </span>
                        </td>
                        <td>{formatDate(events.event_start)} <br/> {formatDate(events.event_end)}</td>
                        <td>{events.location}</td>
                        <td>{events.event_space}</td>
                        <td>
                            <button 
                                className="bg-no-repeat bg-contain w-8 h-8 m-3 bg-info-icon"
                                onClick={() => handleInfoClick(events)}
                            >
                            </button>
                            <button 
                                className="bg-no-repeat bg-contain w-8 h-8 m-3 bg-edit-icon"
                                onClick={() => handleEditClick(events)}
                            >
                            </button>
                            <button 
                                className="bg-no-repeat bg-contain w-8 h-8 m-3 bg-delete-icon" 
                                
                                onClick={() => {if (window.confirm('Are you sure you want to delete this event?')) {
                                    deleteEvent(events.event_id);
                                }}}
                                >
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            ) : (
            <tbody>
            {events.map(event => (
                <tr key={event.event_id} className='h-20'>
                        <td>{event.event_name}</td>
                        <td><span className="block max-w-xs truncate" title={event.event_description}>
                            {event.event_description}
                        </span>
                        </td>
                        <td>{formatDate(event.event_start)} <br/> {formatDate(event.event_end)}</td>
                        <td>{event.location}</td>
                        <td>{event.event_space}</td>
                    <td>
                        <button 
                            className="bg-no-repeat bg-contain w-8 h-8 m-3 bg-info-icon"
                            onClick={() => handleInfoClick(event)}
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
            )}
            
            <Modal isOpen={showEditEvent} onClose={() => setShowEditEvent(false)}>
                {selectedEvent && (
                    <EventEdit onCancel={() => setShowEditEvent(false)} event={selectedEvent} />
                )}
            </Modal>
            <Modal isOpen={showInfoEvent} onClose={() => setShowInfoEvent(false)}> 
                {selectedEvent && (
                    <EventInfo onCancel={() => setShowInfoEvent(false)} event={selectedEvent} />
                )}
            </Modal>
        </table>
    </div>
  );
}

export default EventItem;

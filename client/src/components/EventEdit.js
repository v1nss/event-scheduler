import React, { useState } from "react";

const EventEdit = ({ event, onCancel }) => {
    const [eventName, setEventName] = useState(event.event_name);
    const [eventDescription, setEventDescription] = useState(event.event_description);
    const [eventStart, setEventStart] = useState(event.event_start);
    const [eventEnd, setEventEnd] = useState(event.event_end);
    const [location, setLocation] = useState(event.location);
    const [eventCost, setEventCost] = useState(event.event_cost);

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {
                event_name: eventName,
                event_description: eventDescription,
                event_start: eventStart,
                event_end: eventEnd,
                location,
                event_cost: eventCost
            };
            await fetch(`http://localhost:5000/events/${event.event_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            onCancel();
            window.location = "/"; // Refresh the page after updating
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>Edit Event</h1>
            <form onSubmit={onSubmitForm}>
                <div>
                    <label>Event Name:</label>
                    <input
                        type="text"
                        name="event_name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Description:</label>
                    <textarea
                        name="event_description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Start:</label>
                    <input
                        type="datetime-local"
                        name="event_start"
                        value={eventStart}
                        onChange={(e) => setEventStart(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event End:</label>
                    <input
                        type="datetime-local"
                        name="event_end"
                        value={eventEnd}
                        onChange={(e) => setEventEnd(e.target.value)}
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div>
                    <label>Event Cost:</label>
                    <input
                        type="number"
                        name="event_cost"
                        value={eventCost}
                        onChange={(e) => setEventCost(e.target.value)}
                    />
                </div>
                <button type="submit">Edit Event</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EventEdit;

import React, { useState } from "react";

function ShowForm() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [location, setLocation] = useState("");
  const [eventCost, setEventCost] = useState("");
  const [error, setError] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Input validation
    if (!eventName || !eventDescription || !eventStart || !eventEnd || !location || !eventCost) {
      setError("All fields are required.");
      return;
    }

    try {
      const body = {
        event_name: eventName,
        event_description: eventDescription,
        event_start: eventStart,
        event_end: eventEnd,
        location,
        event_cost: eventCost,
      };
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        window.location = "/";
      } else {
        console.error("Failed to create event");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default ShowForm;

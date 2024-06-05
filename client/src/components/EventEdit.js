import React, { useState } from "react";

const EventEdit = ({ event, onCancel }) => {
    const [eventName, setEventName] = useState(event.event_name);
    const [eventDescription, setEventDescription] = useState(event.event_description);
    const [eventStart, setEventStart] = useState(event.event_start);
    const [eventEnd, setEventEnd] = useState(event.event_end);
    const [location, setLocation] = useState(event.location);
    const [eventCost, setEventCost] = useState(event.event_cost);
    
    const [eventEditPage, setEventEditPage] = useState(1)
    const [currentNotAllowed, setCurrentNotAllowed] = useState('');
    const [currentMaterial, setCurrentMaterial] = useState('');
    const [currentRequirement, setCurrentRequirement] = useState('');

    const [notAllowed, setNotAllowed] = useState([]);
    const [materialsToBring, setMaterialsToBring] = useState([]);
    const [requirements, setRequirements] = useState([]);
    
  
    const handleAddNotAllowed = () => {
      setNotAllowed([...notAllowed, currentNotAllowed]);
      setCurrentNotAllowed('');
    };
  
    const handleAddMaterial = () => {
      setMaterialsToBring([...materialsToBring, currentMaterial]);
      setCurrentMaterial('');
    };
  
    const handleAddRequirement = () => {
      setRequirements([...requirements, currentRequirement]);
      setCurrentRequirement('');
    };

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
      <div className="min-h-80p w-100p flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Event Info</h1>
        <form onSubmit={onSubmitForm}>
          {eventEditPage === 1 && (
            <>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Company Name:</label>
                <input
                  type="text"
                  name="company_name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Name:</label>
                <input
                  type="text"
                  name="event_name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Start:</label>
                <input
                  type="datetime-local"
                  name="event_start"
                  value={eventStart}
                  onChange={(e) => setEventStart(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event End:</label>
                <input
                  type="datetime-local"
                  name="event_end"
                  value={eventEnd}
                  onChange={(e) => setEventEnd(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Location:</label>
                <input
                  type="text"
                  name="event_location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Product:</label>
                <input
                  type="text"
                  name="product"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Type:</label>
                <select
                  type="drop-down"
                  name="event_type"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Description:</label>
                <textarea
                  name="event_description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setEventEditPage(2)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </>
          )}
  
          {eventEditPage === 2 && (
            <>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Mobile Number:</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Email:</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Space:</label>
                <select
                  type="text"
                //   name="location"
                //   value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Space Rental Fee:</label>
                <input
                  type="number"
                  name="event_cost"
                  value={eventCost}
                  onChange={(e) => setEventCost(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Cost:</label>
                <input
                  type="number"
                  name="event_cost"
                  value={eventCost}
                  onChange={(e) => setEventCost(e.target.value)}
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Number of Participants:</label>
                <input
                  type="number"
                  name="event_cost"
                  value={eventCost}
                  onChange={(e) => setEventCost(e.target.value)}
                  className="w-30p ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Number of Guest/s:</label>
                <input
                  type="number"
                  name="event_cost"
                  value={eventCost}
                  onChange={(e) => setEventCost(e.target.value)}
                  className="w-30p ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Number of Staff/s:</label>
                <input
                  type="number"
                  name="event_cost"
                  value={eventCost}
                  onChange={(e) => setEventCost(e.target.value)}
                  className="w-30p ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setEventEditPage(3)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </>
          )}

        {eventEditPage === 3 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium text-left">Not Allowed</label>
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    name="not_allowed"
                    value={currentNotAllowed}
                    onChange={(e) => setCurrentNotAllowed(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentNotAllowed('')}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handleAddNotAllowed}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="mb-4 p-2 border border-gray-300 rounded-md">
                  {notAllowed.join(' | ')}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium text-left">Materials to Bring</label>
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    name="materials_to_bring"
                    value={currentMaterial}
                    onChange={(e) => setCurrentMaterial(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentMaterial('')}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="mb-4 p-2 border border-gray-300 rounded-md">
                  {materialsToBring.join(' | ')}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium text-left">Requirements</label>
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    name="requirements"
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentRequirement('')}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="mb-4 p-2 border border-gray-300 rounded-md">
                  {requirements.join(' | ')}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                >
                  Finish
                </button>
              </div>
            </>
          )}
          </form>
        </div>
      </div>
    );
};

export default EventEdit;

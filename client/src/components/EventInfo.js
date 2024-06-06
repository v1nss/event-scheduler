import React, { useState } from "react";
import { format, parseISO, isValid } from 'date-fns';


const EventInfo = ({ event, onCancel }) => {
    const [eventName, setEventName] = useState(event.event_name);
    const [eventDescription, setEventDescription] = useState(event.event_description);
    const [eventStart, setEventStart] = useState(event.event_start);
    const [eventEnd, setEventEnd] = useState(event.event_end);
    const [location, setLocation] = useState(event.location);
    const [eventCost, setEventCost] = useState(event.event_cost);
    // const [durationHours, setDurationHours] = useState(null);
    const [companyName, setCompanyName] = useState(event.company_name);
    const [eventProduct, setEventProduct] = useState(event.event_product);
    // const [otherProduct, setOtherProduct] = useState('');
    const [eventType, setEventType] = useState(event.event_type);
    const [mobileNumber, setMobileNumber] = useState(event.mobile_number);
    const [eventEmail, setEventEmail] = useState(event.event_email);
    const [eventStaff, setEventStaff] = useState(event.event_staff);
    const [eventSpace, setEventSpace] = useState(event.event_space);
    const [rentalFee, setRentalFee] = useState(event.rental_fee);

    const [eventEditPage, setEventEditPage] = useState(1)
    const [currentNotAllowed, setCurrentNotAllowed] = useState('');
    const [currentMaterial, setCurrentMaterial] = useState('');
    const [currentRequirement, setCurrentRequirement] = useState('');

    const [notAllowed, setNotAllowed] = useState([]);
    const [materialsToBring, setMaterialsToBring] = useState([]);
    const [requirements, setRequirements] = useState([]);
    
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
      <div className="min-h-80p w-100p flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Event Info</h1>
        <form>
          {eventEditPage === 1 && (
            <>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Company Name:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {companyName}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Name:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {eventName}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Start:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {formatDate(eventStart)}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event End:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {formatDate(eventEnd)}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Location:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {location}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Product:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {eventProduct}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Type:</label>
                <div
                  type="drop-down"
                  name="event_type"
                  value={eventType}
                  readOnly
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  {eventType}
                </div>
              </div>
              <div className="mb-4 flex items-center ">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Description:</label>
                <div
                  className="w-2/3 ml-2 h-40 overflow-auto rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {eventDescription}
                </div>
              </div>
              <div className="flex justify-between">
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
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {mobileNumber}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Email:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {eventEmail}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Space:</label>
                <div
                  type="text"
                  value={eventSpace}
                  readOnly
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm bg-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  {eventSpace}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Space Rental Fee:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {rentalFee}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Event Cost:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {eventCost}
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 font-medium text-left">Number of Staff/s:</label>
                <div
                  className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100"
                >
                  {eventStaff}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setEventEditPage(1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mr-2"
                >
                  Previous
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
                  <div
                    className="w-full rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100 h-24"
                  >
                    {notAllowed.join(' | ')}
                  </div>
                </div>
              </div>
    
              <div className="mb-4">
                <label className="block text-gray-700 font-medium text-left">Materials to Bring</label>
                <div className="flex items-center mb-2">
                  <div
                    className="w-full rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100 h-24"
                  >
                    {materialsToBring.join(' | ')}
                  </div>
                </div>
              </div>
    
              <div className="mb-4">
                <label className="block text-gray-700 font-medium text-left">Requirements</label>
                <div className="flex items-center mb-2">
                  <div
                    className="w-full rounded-md border-gray-300 shadow-sm px-2 py-2 bg-gray-100 h-24"
                  >
                    {requirements.join(' | ')}
                  </div>
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
                  type="button"
                  onClick={() => setEventEditPage(2)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 "
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
    );
};


export default EventInfo;
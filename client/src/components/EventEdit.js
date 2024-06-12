import React, { useState, useEffect } from "react";

const EventEdit = ({ event, onCancel }) => {
    const [eventName, setEventName] = useState(event.event_name || '');
    const [eventDescription, setEventDescription] = useState(event.event_description || '');
    const [eventStart, setEventStart] = useState(event.event_start || '');
    const [eventEnd, setEventEnd] = useState(event.event_end || '');
    const [location, setLocation] = useState(event.location || '');
    const [eventCost, setEventCost] = useState(event.event_cost || 0);
    const [companyName, setCompanyName] = useState(event.company_name || '');
    const [eventProduct, setEventProduct] = useState(event.event_product || '');
    const [eventType, setEventType] = useState(event.event_type || '');
    const [mobileNumber, setMobileNumber] = useState(event.mobile_number || '');
    const [eventEmail, setEventEmail] = useState(event.event_email || '');
    const [eventStaff, setEventStaff] = useState(event.event_staff || 0);
    const [eventSpace, setEventSpace] = useState(event.event_space || '');
    const [rentalFee, setRentalFee] = useState(event.rental_fee || 0);
    const [durationHours, setDurationHours] = useState(null);
    const [eventEditPage, setEventEditPage] = useState(1);
    const [currentNotAllowed, setCurrentNotAllowed] = useState('');
    const [currentMaterial, setCurrentMaterial] = useState('');
    const [currentRequirement, setCurrentRequirement] = useState('');
    const [notAllowed, setNotAllowed] = useState(event.not_allowed || []);
    const [materialsToBring, setMaterialsToBring] = useState(event.materials_tobring || []);
    const [requirements, setRequirements] = useState(event.requirements || []);

    const [notAllowedItems, setNotAllowedItems] = useState([]);

    const handleAddNotAllowed = () => {
      // Append the new item to the notAllowed array
      setNotAllowedItems([...notAllowed, currentNotAllowed]);
      // Clear the input field
      setCurrentNotAllowed('');
    
    };

  // const handleAddNotAllowed = () => {
  //   setNotAllowed([...notAllowed, currentNotAllowed]);
  //   setCurrentNotAllowed('');
  // };

  const handleAddMaterial = () => {
    if (notAllowed.includes(currentMaterial)) {
      alert('This item is not allowed!');
    } else {
      setMaterialsToBring([...materialsToBring, currentMaterial]);
      setCurrentMaterial('');
      // console.log(materialsToBring)
    }
  };

  const handleAddRequirement = () => {
    if (notAllowed.includes(currentRequirement)) {
      alert('This item is not allowed!');
    } else {
      setRequirements([...requirements, currentRequirement]);
      setCurrentRequirement('');
    }
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
                event_cost: eventCost,
                company_name: companyName,
                event_product: eventProduct,
                event_type: eventType,
                mobile_number: mobileNumber,
                event_email: eventEmail,
                event_staff: eventStaff,
                event_space: eventSpace,
                rental_fee: rentalFee,  
                not_allowed: notAllowedItems,
                materials_toBring: materialsToBring,
                requirements: requirements
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

    const handleEventStartChange = (e) => {
        const startValue = e.target.value;
        setEventStart(startValue);

        if (eventEnd && new Date(startValue) > new Date(eventEnd)) {
            setEventEnd('');
            setDurationHours(null);
        } else {
            calculateDuration(startValue, eventEnd);
        }
    };

    const handleEventEndChange = (e) => {
        const endValue = e.target.value;
        if (new Date(eventStart) <= new Date(endValue)) {
            setEventEnd(endValue);
            calculateDuration(eventStart, endValue);
        } else {
            alert('End time cannot be earlier than start time');
        }
    };

    const calculateDuration = (start, end) => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const diffMs = endDate - startDate;
            const diffHrs = diffMs / (1000 * 60 * 60); // convert milliseconds to hours
            setDurationHours(diffHrs);
            calculateSpaceRentalFee(eventSpace, diffHrs);
        }
    };

    const handleSpaceChange = (space) => {
        setEventSpace(space);
        calculateSpaceRentalFee(space, durationHours);
    };

    const calculateSpaceRentalFee = (eventSpace, durationHours) => {
        if (!durationHours) return;

        let rentalFeePerHour = 0;
        switch (eventSpace) {
            case 'Small Meeting Room':
                rentalFeePerHour = 3000;
                break;
            case 'Conference Room':
                rentalFeePerHour = 6000;
                break;
            case 'Banquet Room':
                rentalFeePerHour = 12000;
                break;
            case 'Ballroom':
                rentalFeePerHour = 30000;
                break;
            case 'Exhibition Hall':
                rentalFeePerHour = 50000;
                break;
            case 'Convention Center':
                rentalFeePerHour = 100000;
                break;
            default:
                rentalFeePerHour = 0;
        }

        const totalCost = rentalFeePerHour * durationHours;
        setEventCost(totalCost);
        setRentalFee(rentalFeePerHour);
    };

    return (
        <div className="min-h-80p w-100p flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Event Edit</h1>
                <form onSubmit={onSubmitForm}>
                    {eventEditPage === 1 && (
                        <>
                            <div className="mb-4 flex items-center">
                                <label className="w-1/3 text-gray-700 font-medium text-left">Company Name:</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
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
                                    onChange={handleEventStartChange}
                                    className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="w-1/3 text-gray-700 font-medium text-left">Event End:</label>
                                <input
                                    type="datetime-local"
                                    name="event_end"
                                    value={eventEnd}
                                    onChange={handleEventEndChange}
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
                                    value={eventProduct}
                                    onChange={(e) => setEventProduct(e.target.value)}
                                    className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="w-1/3 text-gray-700 font-medium text-left">Event Type:</label>
                                <select
                                    name="event_type"
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}
                                    className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select Event Type</option>
                                    <option value="type1">Type 1</option>
                                    <option value="type2">Type 2</option>
                                    {/* <!-- Add other options as needed --> */}
                                </select>
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
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300"
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
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="w-1/3 text-gray-700 font-medium text-left">Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={eventEmail}
                                    onChange={(e) => setEventEmail(e.target.value)}
                                    className="w-2/3 ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="w-1/3 text-gray-700 font-medium text-left">Event Space:</label>
                                <select
                                    name="event_space"
                                    value={eventSpace}
                                    onChange={(e) => handleSpaceChange(e.target.value)}
                                    className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select Event Space</option>
                                    <option value="Small Meeting Room">Small Meeting Room</option>
                                    <option value="Conference Room">Conference Room</option>
                                    <option value="Banquet Room">Banquet Room</option>
                                    <option value="Ballroom">Ballroom</option>
                                    <option value="Exhibition Hall">Exhibition Hall</option>
                                    <option value="Convention Center">Convention Center</option>
                                </select>
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="w-1/3 text-gray-700 font-medium text-left">Space Rental Fee:</label>
                                <input
                                    type="number"
                                    name="event_cost"
                                    value={rentalFee}
                                    onChange={(e) => setRentalFee(e.target.value)}
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
                                <label className="w-1/3 text-gray-700 font-medium text-left">Number of Staff/s:</label>
                                <input
                                    type="number"
                                    name="event_cost"
                                    value={eventStaff}
                                    onChange={(e) => setEventStaff(e.target.value)}
                                    className="w-30p ml-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
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
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
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
                                    <input
                                        type="text"
                                        name="not_allowed"
                                        value={currentNotAllowed}
                                        onChange={(e) => setCurrentNotAllowed(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setNotAllowed([])}
                                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAddNotAllowed()}
                                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="mb-4 p-2 border border-gray-300 rounded-md h-24">
                                  {notAllowedItems}
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
                                        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                <div className="mb-4 p-2 border border-gray-300 rounded-md h-24">
                                    {materialsToBring}
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
                                        className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                <div className="mb-4 p-2 border border-gray-300 rounded-md h-24">
                                    {requirements}
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
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                                >
                                    Previous
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
                                    onClick={onSubmitForm}
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

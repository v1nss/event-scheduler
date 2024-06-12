import React, { useState } from "react";

function ShowForm({onCancel}) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [durationHours, setDurationHours] = useState(null);
  const [location, setLocation] = useState("");
  const [eventCost, setEventCost] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [eventProduct, setEventProduct] = useState("");
  const [otherProduct, setOtherProduct] = useState('');
  const [eventType, setEventType] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventStaff, setEventStaff] = useState("");
  const [eventSpace, setEventSpace] = useState("");
  const [rentalFee, setRentalFee] = useState("");
  // const [others, setOthers] = useState("");

  const [error, setError] = useState("");

  const [eventEditPage, setEventEditPage] = useState(1)

  const [currentNotAllowed, setCurrentNotAllowed] = useState('');
  const [notAllowed, setNotAllowed] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState('');
  const [materialsToBring, setMaterialsToBring] = useState([]);
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [requirements, setRequirements] = useState([]);

  const handleAddNotAllowed = () => {
    setNotAllowed([...notAllowed, currentNotAllowed]);
    setCurrentNotAllowed('');
  };

  const handleAddMaterial = () => {
    if (notAllowed.includes(currentMaterial)) {
      alert('This item is not allowed!');
    } else {
      setMaterialsToBring([...materialsToBring, currentMaterial]);
      setCurrentMaterial('');
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

    // Input validation
    if (!eventName) {
      setError("Event Name is required.");
      return false;
    }
    if (!eventDescription) {
      setError("Event Description is required.");
      return false;
    }
    if (!eventStart) {
      setError("Event Start is required.");
      return false;
    }
    if (!eventEnd) {
      setError("Event End is required.");
      return false;
    }
    if (!location) {
      setError("Location is required.");
      return false;
    }
    if (!eventCost) {
      setError("Event Cost is required.");
      return false;
    }
    if (!companyName) {
      setError("Company Name is required.");
      return false;
    }
    if (!eventProduct) {
      setError("Event Product is required.");
      return false;
    }
    if (!eventType) {
      setError("Event Type is required.");
      return false;
    }
    if (!mobileNumber) {
      setError("Mobile Number is required.");
      return false;
    }
    if (!eventEmail) {
      setError("Event Email is required.");
      return false;
    }
    if (!eventStaff) {
      setError("Number of Event Staff is required.");
      return false;
    }
    if (!eventSpace) {
      setError("Number of Event Staff is required.");
      return false;
    }
    setError(null);

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
        not_allowed: notAllowed,
        materials_toBring: materialsToBring,
        requirements: requirements
      };
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
        console.log(notAllowed)
      if (response.ok) {
        window.location = "/";
      } else {
        console.error("Failed to create event");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    if (value !== 'Others') {
      setEventProduct(value);
      setOtherProduct('');
    } else {
      setEventProduct(value);
    }
  };

  const handleOtherProductChange = (e) => {
    setOtherProduct(e.target.value);
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
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl h-full max-h-[80vh] overflow-auto">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Event Info</h1>
    {error && <p style={{ color: "red" }}>{error}</p>}
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
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Event Name:</label>
            <input
              type="text"
              name="event_name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Event Start:</label>
            <input
              type="datetime-local"
              name="event_start"
              value={eventStart}
              onChange={handleEventStartChange}
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Event End:</label>
            <input
              type="datetime-local"
              name="event_end"
              value={eventEnd}
              onChange={handleEventEndChange}
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Event Location:</label>
            <input
              type="text"
              name="event_location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Product:</label>
            <div className="w-2/3 ml-2">
              <select
                name="product"
                value={eventProduct}
                onChange={handleProductChange}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Product</option>
                <option value="Technology">Technology</option>
                <option value="Consumer Goods">Consumer Goods</option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Others">Others</option>
              </select>
              {eventProduct === 'Others' && (
                <input
                  type="text"
                  name="other_product"
                  value={otherProduct}
                  onChange={handleOtherProductChange}
                  className="mt-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Please specify"
                />
              )}
            </div>
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
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
              name="mobile_number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Email:</label>
            <input
              type="email"
              name="email"
              value={eventEmail}
              onChange={(e) => setEventEmail(e.target.value)}
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Event Space:</label>
            <select
              name="event_space"
              value={eventSpace}
              onChange={(e) => 
                // setEventSpace(e.target.value);
                handleSpaceChange(e.target.value)
              }
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
            <div
              type="number"
              name="space_rental_fee"
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-7"
            >
              {rentalFee}
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Event Cost:</label>
            <div
              type="number"
              name="event_cost"
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-7"
            >
              {eventCost}
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-1/3 text-gray-700 font-medium text-left">Number of Staff:</label>
            <input
              type="number"
              name="event_staff"
              value={eventStaff}
              onChange={(e) => setEventStaff(e.target.value)}
              className="w-2/3 ml-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
              <input
                type="text"
                name="not_allowed"
                value={currentNotAllowed}
                onChange={(e) => setCurrentNotAllowed(e.target.value)}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
            <div className="mb-4 p-2 border border-gray-300 rounded-md h-24">
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
            <div className="mb-4 p-2 border border-gray-300 rounded-md h-24 ">
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
              type="button"
              onClick={() => setEventEditPage(2)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mr-2"
            >
              Previous
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
}

export default ShowForm;

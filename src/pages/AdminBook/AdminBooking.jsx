import React, { useState } from 'react';
import TablePagination from '../../custom-components/TablePagination';
import CreateBooking from './CreateBooking';

const AdminBooking = () => {
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  const toggleComponent = () => {
    setShowOtherComponent(!showOtherComponent);
  };
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 4, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 5, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 6, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 7, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 8, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 9, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 10, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 11, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 12, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 13, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 14, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 15, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 16, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more data here
  ];
  const column = [
    {
      title: 'Total ticket price',
    },
    {
      title: 'Created On',
    },
    {
      title: 'Cancellation Code',
    },
    {
      title: 'Contact Email',
    },
    {
      title: 'Performance',
    },
  ];
  const fieldData = [
    {
      title: 'Total ticket price',
      placeholder: 'Enter the Booking Total Ticket Price',
    },
    {
      title: 'Cancellation Code',
      placeholder: 'Enter the Booking Cancellation Code',
    },
    {
      title: 'Contact Email',
      placeholder: 'Enter the Booking Contact Email',
    },
    {
      title: 'Performance',
      placeholder: 'Enter the Booking Contact Email',
    },
  ];
  return (
    // <div>
    <>
      {showOtherComponent ? (
        <CreateBooking toggleComponent={toggleComponent}/> // Render the other component if showOtherComponent is true
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New Booking
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <button
            onClick={toggleComponent}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>
          <span className="text-xl px-3 py-2 font-bold text-zinc-600">
            Search for Bookings
          </span>
          {fieldData?.map((item, index) => (
            <div className="flex p-3 gap-5">
              <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
                {item.title}
              </p>
              {item.title == 'Performance' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a performance</option>
                  <option>Performance</option>
                </select>
              ) : (
                <input
                  className="px-2 rounded-md py-2 w-full"
                  placeholder={item.placeholder}
                />
              )}
            </div>
          ))}
          <button className="bg-violet-900 w-20 text-white px-2 py-2 ml-36 mt-2 rounded-md">
            Search
          </button>
          <TablePagination data={data} itemsPerPage={5} column={column} />
        </div>
      )}
    </>
  );
};

export default AdminBooking;

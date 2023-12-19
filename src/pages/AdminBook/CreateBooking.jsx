import React from 'react';

const CreateBooking = ({ toggleComponent }) => {
  const fieldData = [
    {
      title: 'Total ticket price',
      placeholder: 'Enter the Booking Total Ticket Price',
    },
    {
      title: 'Tickets',
      placeholder: 'Enter the Booking Cancellation Code',
    },
    {
      title: 'Created On',
      placeholder: 'Enter the Booking Contact Email',
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
   const handleDiscard = () => {
     toggleComponent(); // This sets showOtherComponent to false
   };

  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New Booking
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex align-middle">
            {item.title}
          </p>
          {item.title == 'Tickets' ? (
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          ) : item.title == 'Created On' ? (
            <input
              type="date"
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
            />
          ) : item.title == 'Performance' ? (
            <select class="px-2 py-2 rounded-md w-full">
              <option>Choose a performance</option>
              <option>Hello</option>
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button className="bg-green-700 px-4 py-2 rounded-lg text-white">
          Save
        </button>
        <button
          onClick={handleDiscard}
          className="bg-red-700 px-4 py-2 rounded-lg text-white"
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default CreateBooking;

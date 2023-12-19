import React from 'react';

const fieldData = [
  {
    title: 'Ticket Category',
    placeholder: 'Enter the Section Name',
  },
  {
    title: 'Price',
    placeholder: 'Enter the Ticket Price',
  },
  {
    title: 'Section',
    placeholder: 'Enter the Section Number of Rows',
  },
  {
    title: 'Row Number',
    placeholder: 'Enter the Ticket Row Number',
  },
  {
    title: 'Number',
    placeholder: 'Enter the Ticket Number',
  },
];
const CreateTickets = ({toggleComponent}) => {
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New Tickets
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Ticket Category' ? (
            <select class="px-2 py-2 rounded-md w-full">
              <option>Choose a Ticket Category</option>
              <option>Hello</option>
            </select>
          ) :item.title == 'Section' ? (
            <select class="px-2 py-2 rounded-md w-full">
              <option>Choose a Section  </option>
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

export default CreateTickets;

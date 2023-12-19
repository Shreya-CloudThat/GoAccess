import React, { useState } from 'react';
import { fetchData } from '../../config/ApiCall';
const fieldData = [
  {
    title: 'Description',
    placeholder: 'Enter the TicketCategory Description',
  },
];
const CreateTicketCategory = ({ toggleComponent }) => {

  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const [loading, setLoading] = useState(true);
  const [ticketcategorydetail,setTicketCategoryDetail]=useState({
    description:''
  })

  const payload = {
    method: 'insertTicketCategory',
    description: ticketcategorydetail.description,
    created_by: 'e0cc2ee3-8e7d-4825-b5dc-c061c370e364',
  };

  const insertTicketCategory = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-categories/insertTicketCategory',
      payload
    )
      .then((item) => {
        // console.log('response--', item);
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    toggleComponent();
  };

  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New TicketCategory
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
          ) : item.title == 'Section' ? (
            <select class="px-2 py-2 rounded-md w-full">
              <option>Choose a Section </option>
              <option>Hello</option>
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              onChange={(e) =>
                setTicketCategoryDetail({
                  ...ticketcategorydetail,
                  description: e.target.value,
                })
              }
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={insertTicketCategory}
        >
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

export default CreateTicketCategory;

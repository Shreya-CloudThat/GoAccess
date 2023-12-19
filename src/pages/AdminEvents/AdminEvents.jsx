import React, { useState } from 'react';
import TablePagination from '../../custom-components/TablePagination';
// import { useData } from '../../context/ApiCall';
import { useApiData } from '../../context/ApiDataContext';

const handleSearch = (response, search) => {
  if (search.length === 0) return response;
  return response.filter(
    (item, index) => 
    item.event_name.toLowerCase().includes(search.toLowerCase())
  );
};
const AdminEvents = ({
  toggleComponent,
  response,
  setSelectedId,
  updateComponents,
  deleteEvent
}) => {
  // const[response,setResponse]=useState('')
  const [eventdetail, setEventDetails] = useState({
    name: '',
    description: '',
    category: '',
    event_category_id: '',
  });
  const [search, setSearch] = useState('');
  // const[response,setResponse] =useState([])
  const fieldData = [
    {
      title: 'Name',
      placeholder: 'Enter the Event Name',
      method: 'event_name',
    },
    // {
    //   title: 'Media Item',
    //   //   placeholder: 'Enter the Booking Cancellation Code',
    // },
    // {
    //   title: 'Category',
    //   method: 'event_category_description',
    //   //   placeholder: 'Enter the Booking Contact Email',
    // },
    // {
    //   title: 'Description',
    //   placeholder: 'Enter the Event Description',
    //   method: 'event_description',
    // },
  ];

  const column = [
    {
      title: 'Name',
    },
    {
      title: 'Media Item',
    },
    {
      title: 'Category',
    },
    {
      title: 'Description',
    },
    {
      title: 'Edit',
    },
    {
      title: 'Delete',
    },
  ];

  const tableData = [
    {
      method: 'getEvents',
      res: handleSearch(response, search),
    },
  ];


  const { apiData } = useApiData();


  // console.log('apiData', tableData);
  return (
    // {showOtherComponent ?

    // }
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New Event
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      <button
        onClick={toggleComponent}
        className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
      >
        Create
      </button>
      <span className="text-xl px-3 py-2 font-bold text-zinc-600">
        Search for Events
      </span>
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>

          <input
            className="px-2 rounded-md py-2 w-full"
            placeholder={item.placeholder}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      ))}
      
      <TablePagination
        data={tableData}
        itemsPerPage={5}
        column={column}
        setSelectedId={setSelectedId}
        updateComponents={updateComponents}
        deleteEvent={deleteEvent}
      />
    </div>
  );
};

export default AdminEvents;

import React, { useEffect, useState } from 'react';
import CreateTicketCategory from './CreateTicketCategory';
import TablePagination from '../../custom-components/TablePagination';
import { fetchData } from '../../config/ApiCall';

const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Jane Smith' },
  { id: 4, name: 'Jane Smith' },
  { id: 5, name: 'Jane Smith' },
  { id: 6, name: 'Jane Smith' },
  { id: 7, name: 'Jane Smith' },
  { id: 8, name: 'Jane Smith' },
  { id: 9, name: 'Jane Smith' },
  { id: 10, name: 'Jane Smith' },
  { id: 11, name: 'Jane Smith' },
  { id: 12, name: 'Jane Smith' },
  { id: 13, name: 'Jane Smith' },
  { id: 14, name: 'Jane Smith' },
  { id: 15, name: 'Jane Smith' },
  { id: 16, name: 'Jane Smith' },
  // Add more data here
];
const column = [
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
const fieldData = [
  {
    title: 'Description',
    placeholder: 'Enter the TicketCategory Description',
  },
  
];

const handleSearch = (response, search) => {
  if (search.length === 0) return response;

  return response.filter((item) =>
    item.description.toLowerCase().includes(search.toLowerCase())
  );
};

const AdminTicketCategory = () => {
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  const toggleComponent = () => {
    setShowOtherComponent(!showOtherComponent);
  };

  // const[ticketcategorylist,setTicketCategoryList]=useState([])
  const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-categories/getTicketCategories',
      {
        method: 'getTicketCategories',
      }
    )
      .then((item) => {
        console.log('response--', item);
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  }, []);

    let tableData = [
      {
        method: 'getTicketCategories',
        res: handleSearch(response, search),
      },
    ];
  return (
    <>
      {showOtherComponent ? (
        <CreateTicketCategory toggleComponent={toggleComponent} />
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New TicketCategory
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <button
            onClick={toggleComponent}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>
          <span className="text-xl px-3 py-2 font-bold text-zinc-600">
            Search for TicketCategories
          </span>
          {fieldData?.map((item, index) => (
            <div className="flex p-3 gap-5">
              <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
                {item.title}
              </p>
              {item.title == 'Event' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a Event</option>
                  <option>Hello</option>
                </select>
              ) : item.title == 'Venue' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a Venue</option>
                  <option>Hello</option>
                </select>
              ) : (
                <input
                  className="px-2 rounded-md py-2 w-full"
                  placeholder={item.placeholder}
                  onChange={(e) => setSearch(e.target.value)}
                />
              )}
            </div>
          ))}
          {/* <button className="bg-violet-900 w-20 text-white px-2 py-2 ml-36 mt-2 rounded-md">
            Search
          </button> */}
          <TablePagination data={tableData} itemsPerPage={5} column={column} />
        </div>
      )}
    </>
  );
};

export default AdminTicketCategory;

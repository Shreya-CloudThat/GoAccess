import React, { useEffect, useState } from 'react';
import TablePagination from '../../custom-components/TablePagination';
import CreateTicketPrice from './CreateTicketPrice';
import { fetchData } from '../../config/ApiCall';
import UpdateTicketPrices from './UpdateTicketPrices';
import { ThreeDots } from 'react-loader-spinner';

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
    title: 'Shows',
  },
  {
    title: 'Section',
  },
  {
    title: 'Ticket Category',
  },
  {
    title: 'Price',
  },
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];
const fieldData = [
  // {
  //   title: 'Show',
  // },
  // {
  //   title: 'Section',
  // },
  // {
  //   title: 'Ticket Category',
  // },
  // {
  //   title: 'Price',
  //   placeholder: 'Enter the TicketPrice Price',
  // },
];
const handleSearch = (response, search) => {
  if (search.length === 0) return response;

  return response.filter((item) =>
    item.price.toLowerCase().includes(search.toLowerCase())
  );
};

const AdminTicketPrices = () => {
    const [showOtherComponents, setShowOtherComponents] = useState({
      update: false,
      create: false,
    });
  const [selectedId, setSelectedId] = useState('');
  const [response, setResponse] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const getTicketPrice = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-price/getTicketPrices',
      {
        method: 'getTicketPrices',
      }
    )
      .then((item) => {
        // console.log('response--', item);
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  };
  useEffect(() => {
    getTicketPrice();
  }, []);


    const toggleComponents = () => {
      setShowOtherComponents({
        ...showOtherComponents,
        create: !showOtherComponents.create,
      });
      getTicketPrice();
    };

      const updateComponents = () => {
        setShowOtherComponents({
          ...showOtherComponents,
          update: !showOtherComponents.update,
        });
        getTicketPrice();
      };
  let tableData = [
    {
      method: 'getTicketPrices',
      res: handleSearch(response, search),
    },
  ];

  // const toggleComponent = () => {
  //   setShowOtherComponent(!showOtherComponent);
  // };

  const deleteTicketPrice = (id) => {
    setLoading(true);
    // console.log('ID_----------------------', id);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/ticket-price/deleteTicketPrice',
      {
        method: 'deleteTicketPrice',
        ticket_price_id: id,
      }
    )
      .then((item) => {
        console.log('response--', item);
        // setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    getTicketPrice();
    // getVenues();
  };


  return (
    <>
      {loading ? (
        // If loading is true, show the loading spinner (assuming Audio is a loading spinner component)
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '100vh',
          }}
        >
          <ThreeDots
            height="50"
            width="60"
            radius="9"
            color="purple"
            ariaLabel="loading"
            wrapperStyle={{ marginLeft: '300px' }} // Example styles
            wrapperClass="custom-loader"
          />
        </div>
      ) : showOtherComponents.create ? (
        <CreateTicketPrice toggleComponent={toggleComponents} />
      ) : showOtherComponents.update ? (
        <UpdateTicketPrices
          updateComponents={updateComponents}
          selectedId={selectedId}
        />
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New TicketPrice
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <button
            onClick={toggleComponents}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>
          {/* <span className="text-xl px-3 py-2 font-bold text-zinc-600">
            Search for TicketPrices
          </span>
          {fieldData?.map((item, index) => (
            <div className="flex p-3 gap-5">
              <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
                {item.title}
              </p>
              {item.title == 'Show' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a Show</option>
                  <option>Hello</option>
                </select>
              ) : item.title == 'Section' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a Section</option>
                  <option>Hello</option>
                </select>
              ) : item.title == 'Ticket Category' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a Ticket Category</option>
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
          <button className="bg-violet-900 w-20 text-white px-2 py-2 ml-36 mt-2 rounded-md">
            Search
          </button> */}
          <TablePagination
            data={tableData}
            itemsPerPage={5}
            column={column}
            updateComponents={updateComponents}
            deleteTicketPrice={deleteTicketPrice}
            setSelectedId={setSelectedId}
          />
        </div>
      )}
    </>
  );
};

export default AdminTicketPrices;

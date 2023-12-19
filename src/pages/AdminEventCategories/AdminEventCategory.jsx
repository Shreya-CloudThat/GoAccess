import React, { useState, useEffect } from 'react';
import TablePagination from '../../custom-components/TablePagination';
import CreateEventCategory from './CreateEventCategory';
import { fetchData } from '../../config/ApiCall';
import { useApiData } from '../../context/ApiDataContext';
import UpdateEventCategory from './UpdateEventCategory';
import { ThreeDots } from 'react-loader-spinner';

const AdminEventCategory = () => {
  // const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  // console.log('showOtherComponentyy', showOtherComponent);
  const [showOtherComponents, setShowOtherComponents] = useState({
    update: false,
    create: false,
  });
  const { apiData, setApiData } = useApiData();
  const [selectedId, setSelectedId] = useState('');
  const column = [
    // {
    //   title: 'Total ticket price',
    // },
    // {
    //   title: 'Created On',
    // },
    // {
    //   title: 'Cancellation Code',
    // },
    // {
    //   title: 'Contact Email',
    // },
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
  const getPayload = { method: 'getEventCategories' };

  const getEventCategories = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/event-categories/getEventCategories',
      getPayload
    )
      .then((item) => {
        console.log('response--', item);
        setResponse(item);
        // setApiData(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  };
  
  useEffect(() => {
    getEventCategories();
  }, []);

  const res = [
    {
      method: 'getEventCategories',
      res: response,
    },
  ];

  const toggleComponents = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      create: !showOtherComponents.create,
    });
    getEventCategories();
    // getVenues();
  };

  const updateComponents = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      update: !showOtherComponents.update,
    });
    getEventCategories();
    // getVenues();
  };

  const deleteEventCategory = (id) => {
    setLoading(true);
    // console.log('ID_----------------------', id);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/event-categories/deleteEventCategory',
      {
        method: 'deleteEventCategory',
        event_category_id: id,
      }
    )
      .then((item) => {
        console.log('response--', item);

        setLoading(false);
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    getEventCategories();
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
      ) : // If loading is false, conditionally render components based on showOtherComponents state
      showOtherComponents.create ? (
        <CreateEventCategory toggleComponent={toggleComponents} />
      ) : showOtherComponents.update ? (
        <UpdateEventCategory
          updateComponents={updateComponents}
          selectedId={selectedId}
        />
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New Event Category
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <button
            onClick={toggleComponents}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>

          <TablePagination
            data={res}
            itemsPerPage={5}
            column={column}
            updateComponents={updateComponents}
            setSelectedId={setSelectedId}
            deleteEventCategory={deleteEventCategory}
            // deleteVenue={deleteVenue}
          />
        </div>
      )}
    </>
  );
};

export default AdminEventCategory;

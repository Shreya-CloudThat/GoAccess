import React, { useState, useEffect } from 'react';
import TablePagination from '../../custom-components/TablePagination';
import CreatePerformances from './CreatePerformances';
import { fetchData } from '../../config/ApiCall';
import UpdatePerformance from './UpdatePerformance';
import { ThreeDots } from 'react-loader-spinner';

const AdminPerformances = () => {
  // const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [showOtherComponent, setShowOtherComponent] = useState({
    update: false,
    create: false,
  });
  // const toggleComponent = () => {
  //   setShowOtherComponent(!showOtherComponent);
  // };

  const toggleComponent = () => {
    setShowOtherComponent({
      ...showOtherComponent,
      create: !showOtherComponent.create,
    });
    getPerformances();
  };

  const updateComponent = () => {
    setShowOtherComponent({
      ...showOtherComponent,
      update: !showOtherComponent.update,
    });
     getPerformances();
  };

  const [showlist, setShowList] = useState([]);
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
      title: 'Shows',
    },
    {
      title: 'Date',
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
      title: 'Show',
      placeholder: 'Enter the Booking Total Ticket Price',
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/shows/getShows',
      {
        method: 'getShows',
      }
    )
      .then((item) => {
        console.log('response--', item);
        setShowList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  }, []);

  const getPayload = {
    method: 'getPerformances',
  };

  const getPerformances=(()=>{
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/performances/getPerformances',
      getPayload
    )
      .then((item) => {
        console.log('response--', item);
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  })

  useEffect(() => {
    getPerformances()
  }, []);

  const deletePerformances = (id) => {
    setLoading(true);
    // console.log('ID_----------------------', id);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/performances/deletePerformance',
      {
        method: 'deletePerformance',
        performance_id: id,
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
    getPerformances();
    // getVenues();
  };

  const res = [
    {
      method: 'getPerformances',
      res: response,
    },
  ];

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
      ) : showOtherComponent?.create ? (
        <CreatePerformances toggleComponent={toggleComponent} /> // Render the other component if showOtherComponent is true
      ) : showOtherComponent?.update ? (
        <UpdatePerformance
          updateComponents={updateComponent}
          selectedId={selectedId}
        /> // Render the other component if showOtherComponent is true
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New Performance
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <button
            onClick={toggleComponent}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>
          {/* <span className="text-xl px-3 py-2 font-bold text-zinc-600">
            Search for Performances
          </span>
          {fieldData?.map((item, index) => (
            <div className="flex p-3 gap-5">
              <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
                {item.title}
              </p>
              {item.title == 'Show' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a show</option>
                  <option> f</option>
                 
                </select>
              ) : (
                <input
                  className="px-2 rounded-md py-2 w-full"
                  placeholder={item.placeholder}
                />
              )}
            </div>
          ))} */}
          {/* <button className="bg-violet-900 w-20 text-white px-2 py-2 ml-36 mt-2 rounded-md">
            Search
          </button> */}
          <TablePagination
            data={res}
            itemsPerPage={5}
            column={column}
            updateComponents={updateComponent}
            setSelectedId={setSelectedId}
            deletePerformances={deletePerformances}
          />
        </div>
      )}
    </>
  );
};

export default AdminPerformances;

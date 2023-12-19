import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';
import TablePagination from '../../custom-components/TablePagination';
import CreateVenue from './CreateVenue';
import { create } from 'lodash';
import UpdateVenue from './UpdateVenue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Radio, ThreeDots } from 'react-loader-spinner';

const column = [
  {
    title: 'Name',
  },
  {
    title: 'Media Item',
  },
  {
    title: 'Description',
  },
  {
    title: 'Capacity',
  },
  {
    title: 'Address',
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
    title: 'Name',
    placeholder: 'Enter the Venue Name',
  },
  // {
  //   title: 'Media Item',
  // },
  // {
  //   title: 'Description',
  //   placeholder: 'Enter the Venue Description',
  // },
  // {
  //   title: 'Capacity',
  //   placeholder: 'Enter the Venue Capacity',
  // },
  // {
  //   title: 'Street',
  //   placeholder: 'Enter the Venue Street',
  // },
  // {
  //   title: 'City',
  //   placeholder: 'Enter the Venue City',
  // },
  // {
  //   title: 'Country',
  //   placeholder: 'Enter the Venue Country',
  // },
];

const handleSearch = (response, search) => {
  if (search.length === 0) return response;

  return response.filter((item) =>
    item.venue_name.toLowerCase().includes(search.toLowerCase())
  );
};

const AdminVenue = () => {
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const [showOtherComponents, setShowOtherComponents] = useState({
    update: false,
    create: false,
  });

  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [medialist, setMedialist] = useState([]);

  const toggleComponent = () => {
    setShowOtherComponent(!showOtherComponent);
    if (showOtherComponent === 'update') {
      setShowOtherComponent(true); // Show the <UpdateVenue /> component
    } else {
      setShowOtherComponent(false); // Show the <CreateVenue /> component (or other content)
    }
  };

  const toggleComponents = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      create: !showOtherComponents.create,
    });
    setTimeout(() => {
       setLoading(true);
      // setLoading(false);
      getVenues();
      //  getEvents();
     }, 1000);
  };

  const getPayload = {
    method: 'getVenues',
  };

  const getVenues = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/venues/getVenues',
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
  };

  const updateComponents = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      update: !showOtherComponents.update,
    });
    getVenues();
  };
  // const deleteComponents = () => {
  //   setShowOtherComponents({
  //     ...showOtherComponents,
  //     update: !showOtherComponents.update,
  //   });
  //   getVenues();
  // };

  console.log('selectedId', selectedId);

  useEffect(() => {
    getVenues();
  }, []);

  const deleteVenue = (id) => {
    setLoading(true);
    console.log('ID_----------------------', id);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/venues/deleteVenue',
      {
        method: 'deleteVenue',
        venue_id: id,
      }
    )
      .then((item) => {
        console.log('response--', item);
        // setResponse(item);
        setLoading(false);
        getVenues();
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });

  };

  // const res = [
  //   {
  //     method: 'getVenues',
  //     res: response,
  //   },
  // ];

  let tableData = [
    {
      method: 'getVenues',
      res: handleSearch(response, search),
    },
  ];
  console.log('tableData', tableData);

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
        <CreateVenue toggleComponent={toggleComponents} />
      ) : showOtherComponents.update ? (
        <UpdateVenue
          updateComponents={updateComponents}
          selectedId={selectedId}
        />
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3 flex flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New Venue
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded dark:bg-gray-700" />
          <button
            onClick={toggleComponents}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>
          <span className="text-xl px-3 py-2 font-bold text-zinc-600">
            Search for Venue
          </span>
          {fieldData?.map((item, index) => (
            <div className="flex p-3 gap-5" key={index}>
              <p className="font-semibold text-zinc-700 w-1/6 flex align-middle">
                {item.title}
              </p>

              <input
                className="px-2 rounded-md py-2 w-full"
                placeholder={item.placeholder}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          ))}
          {/* <button className="bg-violet-900 w-20 text-white px-2 py-2 ml-36 mt-2 rounded-md">
          Search
        </button> */}

          <TablePagination
            data={tableData}
            itemsPerPage={5}
            column={column}
            updateComponents={updateComponents}
            setSelectedId={setSelectedId}
            deleteVenue={deleteVenue}
          />
        </div>
      )}
    </>
  );
};

export default AdminVenue;

import React, { useState, useEffect } from 'react';
import AdminBooking from '../AdminBook/AdminBooking';
import CreateEvent from './CreateEvent';
import AdminEvents from './AdminEvents';
import { fetchData } from '../../config/ApiCall';
import UpdateEvent from './UpdateEvent';
// import Loader from 'react-loader-spinner';
import { Audio, ThreeDots } from 'react-loader-spinner';
// import { useData } from '../../context/ApiCall';

const AdminEventForm = ({ eventCategories }) => {
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const [selectedId, setSelectedId] = useState('');
  const [showOtherComponents, setShowOtherComponents] = useState({
    update: false,
    create: false,
  });
  console.log('showOtherComponentyy', showOtherComponent);

  const toggleComponent = () => {
    setShowOtherComponent(!showOtherComponent);
    console.log('showOtherComponent', showOtherComponent);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   // Clear the timeout when the component unmounts
  //   return () => clearTimeout(timer);
  // }, []);
  console.log('eventCategories', eventCategories);
  const getPayload = {
    method: 'getEvents',
  };

  const getEvents = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/events/getEvents',
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

  const toggleComponents = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      create: !showOtherComponents.create,
    });
    setLoading(true);
    getEvents();
    // getEvents();
    //  setTimeout(() => {
    //   setLoading(false);
    //    getEvents();
    //  }, 1000);
  };

  const updateComponents = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      update: !showOtherComponents.update,
    });
    getEvents();
  };

  useEffect(() => {
    getEvents();
  }, []);

  const deleteEvent = (id) => {
    setLoading(true);
    console.log('ID_----------------------', id);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/events/deleteEvent',
      {
        method: 'deleteEvent',
        event_id: id,
      }
    )
      .then((item) => {
        console.log('response--', item);
        // setResponse(item);
        setLoading(false);
        getEvents();
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });

    // getVenues();
  };

  const res = [
    {
      method: 'getEvents',
      res: response,
    },
  ];

  // const eventCategory = useData();
  // console.log('eventCategory', eventCategory);

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
        <CreateEvent toggleComponent={toggleComponents} />
      ) : showOtherComponents.update ? (
        <UpdateEvent
          updateComponents={updateComponents}
          selectedId={selectedId}
        />
      ) : (
        <AdminEvents
          updateComponents={updateComponents}
          toggleComponent={toggleComponents}
          response={response}
          setSelectedId={setSelectedId}
          deleteEvent={deleteEvent}
        />
      )}
    </>
  );
};

export default AdminEventForm;

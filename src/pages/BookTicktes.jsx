import React, { useState, useEffect } from 'react';
import { fetchData } from '../config/ApiCall';
import { Link, useParams } from 'react-router-dom';

const BookTicktes = ({ title, id ,description}) => {
  const [listvenue, setListVenue] = useState([]);
  const [venuedetail, setVenueDetail] = useState({
    id: '',
  });
  const [listEventsbyVenueId, setListEventsbyVenueId] = useState([]);
  const [listVenuesbyEventId, setlistVenuesbyEventId] = useState([]);
  const [selectedPerformance, SetSelectedPerformance] = useState({
    id: '',
  });
  console.log('selectedPerformance', selectedPerformance);

  useEffect(() => {
    // Fetch
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-events/listVenuesbyEventId',
      {
        method: 'listVenuesbyEventId',
        event_id: id,
      }
    )
      .then((data) => {
        setlistVenuesbyEventId(data);
      })
      .catch((error) => {
        console.error('Error fetching event categories:', error);
      });

   
  }, [id]);

  console.log('venuedetail', venuedetail);
  // console.log('listEventsbyVenueId', listEventsbyVenueId);
  console.log('listVenuesbyEventId', listVenuesbyEventId);

  return (
    <div class="w-screen px-14  ">
      <div class="font-bold text-3xl">{title}</div>
      <hr className="mt-2" />
      <div class="w-full flex mt-5 gap-10">
        <div class="w-1/3 bg-gray-300 rounded-lg p-10">
          <p className="text-2xl font-bold">What ?</p>
          <hr className="text-violet-800 bg-violet-400" />
          <p className="mt-7 w-3/4 text-base">
            {description}
            {/* Get ready to rock your night away with this megaconcert extravaganza
            from 10 of the biggest rock stars of the 80's */}
          </p>
        </div>

        <div class="w-1/3 bg-gray-300 rounded-lg p-10">
          {' '}
          <p className="text-2xl font-bold">Where ?</p>
          <hr className="text-violet-800 bg-violet-400" />
          <select
            class="px-2 py-2 rounded-md w-full mt-10"
            onChange={(e) =>
              setVenueDetail({ ...venuedetail, id: e.target.value })
            }
          >
            <option>Select a Venue</option>
            {listVenuesbyEventId?.map((item, index) => (
              <>
                <option key={item.venue_id} value={item.venue_id}>
                  {item?.venue_name}
                </option>
              </>
            ))}
          </select>
          {venuedetail?.id && (
            <div>
              {listVenuesbyEventId?.map(
                (item, index) =>
                  item.venue_id === venuedetail.id && (
                    <div key={item.venue_id}>
                      <p className="mt-2">{item.venue_description}</p>
                      <h1 className="text-zinc-800 mt-3 font-bold">Address:</h1>
                      <p className="mt-1">{item.venue_address}</p>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
        {venuedetail.id && (
          <div class="w-1/3 bg-gray-300 rounded-lg p-10">
            <p className="text-2xl font-bold">When ?</p>
            <hr className="text-violet-800 bg-violet-400" />
            <select
              class="px-2 py-2 rounded-md w-full mt-10"
              onChange={(e) =>
                SetSelectedPerformance({
                  ...selectedPerformance,
                  id: e.target.value,
                })
              }
            >
              <option>Select Time</option>
              {listVenuesbyEventId?.map((item, index) =>
                item.performances.data?.map((data, dataIndex) => {
                  const date = new Date(data.performance_date);
                  const options = {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  };

                  // Format the date as needed (for example, to "YYYY-MM-DD HH:MM:SS")
                  // const formattedDate =
                  //   date.toISOString().split('T')[0] +
                  //   ' ' +
                  //   date.toTimeString().split(' ')[0];
                  const formattedDate =
                    date.toLocaleDateString('en-US', options) +
                    ' ' +
                    date.toTimeString().split(' ')[0];

                  return (
                    <>
                      <option
                        key={data.performance_id}
                        value={data.performance_id}
                      >
                        {formattedDate}
                      </option>
                    </>
                  );
                })
              )}
            </select>
            {/* <select class="px-2 py-2 rounded-md w-full mt-5">
              {listVenuesbyEventId.map((item, index) =>
                item.performances.data.map((data, dataIndex) => {
                  const date = new Date(data.performance_date);

                  const formattedDate = date.toTimeString().split(' ')[0];

                  return (
                    <option
                      key={data.performance_id}
                      value={data.performance_date}
                    >
                      {formattedDate}
                    </option>
                  );
                })
              )}
            </select> */}
            {/* `/updatevenue?Id=${Id}` */}
            {/* <Link to=`/checkout?Id=${venuedetail.id}`> */}
            <button
              className="py-2 px-5 border border-black bg-violet-500 rounded-lg text-white hover:bg-violet-400 shadow-md shadow-black mt-4"
              onClick={() =>
                (window.location.href = `/checkout?Id=${selectedPerformance.id}`)
              }
            >
              Order tickets
            </button>
            {/* </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicktes;

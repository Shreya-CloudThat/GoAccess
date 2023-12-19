import React, { useState, useEffect } from 'react';
import { fetchData } from '../config/ApiCall';
import { Link, useParams } from 'react-router-dom';

const BookTicketsfromVenue = ({ title, id, description }) => {
  const [listvenue, setListVenue] = useState([]);
  const [eventdetail, setEventDetail] = useState({
    id: '',
  });

  const [listEventsbyVenueId, setlistEventsbyVenueId] = useState([]);
  const [selectedPerformance, SetSelectedPerformance] = useState({
    id: '',
  });
  console.log('selectedPerformance', selectedPerformance);

  useEffect(() => {
    // Fetch
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-venues/listEventsbyVenueId',
      {
        method: 'listEventsbyVenueId',
        venue_id: id,
      }
    )
      .then((data) => {
        setlistEventsbyVenueId(data);
      })
      .catch((error) => {
        console.error('Error fetching event categories:', error);
      });
  }, [id]);

  // console.log('venuedetail', venuedetail);
  // console.log('listEventsbyVenueId', listEventsbyVenueId);
  // console.log('listVenuesbyEventId', listVenuesbyEventId);

  return (
    <div class="w-screen px-14  ">
      <div class="font-bold text-3xl">{title}</div>
      <hr className="mt-2" />
      <div class="w-full flex mt-5 gap-10">
        <div class="w-1/3 bg-gray-300 rounded-lg p-10">
          <p className="text-2xl font-bold">Where ?</p>
          <hr className="text-violet-800 bg-violet-400" />
          <p className="mt-7 w-3/4 text-base">
            {description}
            {/* Get ready to rock your night away with this megaconcert extravaganza
            from 10 of the biggest rock stars of the 80's */}
          </p>
        </div>

        <div class="w-1/3 bg-gray-300 rounded-lg p-10">
          {' '}
          <p className="text-2xl font-bold">What ?</p>
          <hr className="text-violet-800 bg-violet-400" />
          <select
            class="px-2 py-2 rounded-md w-full mt-10"
            onChange={(e) =>
              setEventDetail({ ...eventdetail, id: e.target.value })
            }
          >
            <option>Select a Event</option>
            {listEventsbyVenueId?.map((item, index) => (
              <>
                <option key={item.event_id} value={item.event_id}>
                  {item?.event_name}
                </option>
              </>
            ))}
          </select>
          {eventdetail?.id && (
            <div>
              {listEventsbyVenueId?.map(
                (item, index) =>
                  item.event_id === eventdetail?.id && (
                    <div key={item.event_id}>
                      <p className="mt-2">{item.event_description}</p>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
        {eventdetail?.id && (
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
              {listEventsbyVenueId?.map((item, index) =>
                item?.performances?.data?.map((data, dataIndex) => {
                  const date = new Date(data.performance_date);
                  const options = {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  };
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

            <button
              className="py-2 px-5 border border-black bg-violet-500 rounded-lg text-white hover:bg-violet-400 shadow-md shadow-black mt-4"
              onClick={() =>
                (window.location.href = `/checkout-venue?Id=${selectedPerformance.id}`)
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

export default BookTicketsfromVenue;

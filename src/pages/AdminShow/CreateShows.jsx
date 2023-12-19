import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

const fieldData = [
  {
    title: 'Event',
    placeholder: 'Enter the Section Name',
    method: 'event_id',
  },

  {
    title: 'Venue',
    placeholder: 'Enter the Section Number of Rows',
    method: 'venue_id',
  },
];

const CreateShows = ({ toggleComponent }) => {
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const [venuelist, setVenueList] = useState([]);
  const [eventlist, setEventList] = useState([]);

  const [sectiondetail, setSectionDetail] = useState({
    event_id: '',
    venue_id: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/events/getEvents',
      {
        method: 'getEvents',
      }
    )
      .then((item) => {
        // console.log('response--', item);
        setEventList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });

    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/venues/getVenues',
      {
        method: 'getVenues',
      }
    )
      .then((item) => {
        console.log('response--', item);
        setVenueList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  }, []);

  console.log('eventlist', eventlist);

  const payload = {
    method: 'insertShow',
    event_id: sectiondetail.event_id,
    venue_id: sectiondetail.venue_id,
    created_by: 'e0cc2ee3-8e7d-4825-b5dc-c061c370e364',
  };
  const insertShow = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/shows/insertShow',
      payload
    )
      .then((item) => {
        console.log('response--', item);
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
        Create a New Show
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>{' '}
        
          {item.title == 'Event' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setSectionDetail({ ...sectiondetail, event_id: e.target.value })
              }
            >
              <option>Choose a Event</option>
              {eventlist?.map((event) => (
                <option value={event.event_id}>{event.event_name}</option>
              ))}
            </select>
          ) : item.title == 'Venue' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setSectionDetail({ ...sectiondetail, venue_id: e.target.value })
              }
            >
              <option>Choose a Venue</option>
              {venuelist?.map((venue) => (
                <option value={venue.venue_id}>{venue.venue_name}</option>
              ))}
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={insertShow}
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

export default CreateShows;

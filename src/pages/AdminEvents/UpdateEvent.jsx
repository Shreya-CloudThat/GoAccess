import React, { useState, useContext, useEffect } from 'react';
import { fetchData } from '../../config/ApiCall';
import Admin from '../Admin';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

const fieldData = [
  {
    title: 'Event Name',
    placeholder: 'Enter the Name',
    method: 'event_name',
  },
  {
    title: 'Category',
    placeholder: 'Enter the category',
    method: 'event_category_description',
  },
  {
    title: 'Media Item',
    placeholder: 'Enter the Media Item',
    method: 'url',
  },
  {
    title: 'Description',
    placeholder: 'Enter the description',
    method: 'event_description',
  },
];

const UpdateEvent = ({ updateComponents, selectedId }) => {
  const [response, setResponse] = useState();
  const [eventlist, setEventList] = useState();
  const [loading, setLoading] = useState(true);
  const [mediaItems, setMediaItems] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [eventdetail, setEventDetail] = useState({
    event_name: '',
    event_description: '',
    event_category_description: '',
    media_item_id: '',
    url: '',
    event_category_id: '',
    id: '',
  });
  const [selectedImage, setSelectedImage] = useState();

  const handleDiscard = () => {
    updateComponents();
    // window.location.href = '/adminvenue';
  };

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/events/getEvents',
      { method: 'getEvents' }
    )
      .then((item) => {
        console.log('response--', item);
        setEventList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/getMediaItems',
      { method: 'getMediaItems' }
    )
      .then((data) => {
        setMediaItems(data);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
      });

    // Fetch Event Categories
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/event-categories/getEventCategories',
      { method: 'getEventCategories' }
    )
      .then((data) => {
        setEventCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching event categories:', error);
      });
    // toggleComponent();
  }, []);

  const [medialist, setMediaList] = useState([]);

  const Id = selectedId;

  useEffect(() => {
    // Find the object in the data array that matches the Id from the URL
    const matchingVenue = eventlist?.find((event) => event.event_id === Id);

    if (matchingVenue) {
      // Set the state based on the matching object
      setEventDetail({
        event_name: matchingVenue.event_name,
        event_description: matchingVenue.event_description,
        event_category_description: matchingVenue.event_category_description,
        media_item_id: matchingVenue.media_item_id,
        event_category_id: matchingVenue.event_category_id,
        id: matchingVenue.event_id,
        url: matchingVenue.url,
      });
      setSelectedImage({
        value: matchingVenue.url,
        imageUrl: matchingVenue.url,
      });
    }
  }, [Id, eventlist]);

  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'updateEvent',
    event_id: eventdetail.id,
    name: eventdetail.event_name,
    description: eventdetail.event_description,
    media_item_id: eventdetail.media_item_id,
    event_category_id: eventdetail.event_category_id,
    created_by: user_id,
  };
  //

  const updateEvent = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/events/updateEvent',
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
    updateComponents();
  };

  const options = mediaItems.map((item) => ({
    label: (
      <div>
        <img src={item.url} alt={item.id} style={{ width: '30px' }} />
      </div>
    ),
    value: item,
  }));

  const [selected, setSelected] = useState({
    category: '',
    mediaitem: '',
  });

  console.log('eventdetail', eventdetail);

  console.log('selectedImage', selectedImage);
  const handleImageChange = (selectedOption) => {
    // setSelectedImage(selectedOption);
    setEventDetail({
      ...eventdetail,
      url: selectedOption.value,
    });

    setEventDetail({
      ...eventdetail,
      media_item_id: selectedOption.value.media_item_id,
    });
    setSelected({ ...selected, mediaitem: selectedOption.value.media_item_id });
    setSelectedImage(selectedOption);
  };

  console.log('Selected,', selected);

  
  return (
    <>
      <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
        <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
          Update Event
        </span>
        <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        {fieldData?.map((item, index) => (
          <div className="flex p-3 gap-5">
            <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
              {item.title}
            </p>
            {item.title == 'Category' ? (
              <select
                class="px-2 py-2 rounded-md w-full"
                value={eventdetail.event_category_id || ''}
                onChange={(e) =>
                  setEventDetail({
                    ...eventdetail,
                    event_category_id: e.target.value,
                  })
                }
              >
                <option>Choose a Category</option>
                {eventCategories?.map((item, index) => (
                  // setSelectedEventCategoryId(item.id)
                  <option
                    key={item.id}
                    value={item.id}
                    // onChange={() =>
                    //   setEventDetail({ ...eventdetail, id: item.id })
                    // }
                  >
                    {item?.description}
                  </option>
                ))}
              </select>
            ) : item.title == 'Media Item' ? (
              <div>
                <Select
                  value={selectedImage}
                  options={options}
                  onChange={handleImageChange}
                  getOptionLabel={(option) => (
                    <div>
                      <img
                        src={option.imageUrl}
                        // alt={option.label}
                        style={{ width: '30px', marginRight: '10px' }}
                      />
                      {option.label}
                    </div>
                  )}
                  getOptionValue={(option) => option.value}
                  className="w-44 -ml-5"
                />

                {/* {selected?.mediaitem && (
                <div>
                  <h2>Selected Image:</h2>
                  <img
                    src={selected?.mediaitem?.value?.url}
                    // alt={selected?.mediaitem}
                    style={{ width: '50px' }}
                  />
                </div>
              )} */}
              </div>
            ) : (
              <input
                className="px-2 rounded-md py-2 w-full"
                placeholder={item.placeholder}
                value={eventdetail[item.method] || ''}
                onChange={(e) =>
                  setEventDetail({
                    ...eventdetail,
                    [item.method]: e.target.value,
                  })
                }
              />
            )}
          </div>
        ))}
        <div className="flex ml-36 gap-3">
          <button
            className="bg-green-700 px-4 py-2 rounded-lg text-white"
            onClick={updateEvent}
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
    </>
  );
};

export default UpdateEvent;

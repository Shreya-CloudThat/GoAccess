import React, { useState, useEffect } from 'react';
import { fetchData } from '../../config/ApiCall';
import Select from 'react-select';
import ImageSelector from '../../custom-components/ImageSelector';
// import { useApiData } from '../../context/ApiDataContext';

const CreateEvent = ({ toggleComponent }) => {
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const [response, setResponse] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mediaItems, setMediaItems] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [eventdetail, setEventDetail] = useState({
    name: '',
    description: '',
    category: '',
    mediaitem: '',
    id: '',
  });
  const [selected, setSelected] = useState({
    category: '',
    mediaitem: '',
  });

  console.log('eventdetail', eventdetail);

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
      method: 'media_item',
    },
    {
      title: 'Description',
      placeholder: 'Enter the description',
      method: 'event_description',
    },
  ];
  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;

  const payload = {
    method: 'insertEvent',
    name: eventdetail.event_name,
    description: eventdetail.event_description,
    media_item_id: selected.mediaitem?.value?.media_item_id,
    event_category_id: selected.category.id,
    created_by: user_id,
  };

  const insertEvent = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/events/insertEvent',
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

  useEffect(() => {
    // Fetch Media Items
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
  }, []);

  const handleCategoryChange = (event) => {
    const selectedOption = eventCategories.find(
      (item) => item.description === event.target.value
    );

    // console.log('selectedOption', event.target.value);
    setEventDetail({...eventdetail,category:selectedOption?.description})
    setSelected({ ...selected, category: selectedOption });
  };

   const options = mediaItems.map((item) => ({
    label: (
      <div>
        <img src={item.url} alt={item.id} style={{ width: '30px' }} />
      </div>
    ),
    value: item,
  }));

  const handleMediaChange = (event) => {
    const selectedOption = mediaItems.find(
      (item) => item.url === event.target.value
    );

    // console.log('selectedOption', event.target.value);
    setSelected({ ...selected, mediaitem: selectedOption });
  };
  // console.log('selected', selected.category.id);
  const handleImageChange = (selectedOption) => {
     setSelected({ ...selected, mediaitem: selectedOption });
     setEventDetail({...eventdetail,mediaitem:selectedOption.value.url})
    // setSelectedImage(selectedOption);
  };
const validateForm = () => {
  const requiredFields = [
    'event_name',
    'event_description',
    'category',
    'mediaitem',
  ];

  for (const field of requiredFields) {
    if (!eventdetail[field]) {
      // Field is empty, form is invalid
      return false;
    }
  }
  return true;
};

useEffect(() => {
  setIsFormValid(validateForm());
}, [eventdetail]);

console.log("isvalid",isFormValid)
  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New Event
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
              onChange={handleCategoryChange}
            >
              <option>Choose a Category</option>
              {eventCategories?.map((item, index) => (
                // setSelectedEventCategoryId(item.id)
                <option
                  key={item.id}
                  onChange={() =>
                    setEventDetail({ ...eventdetail, id: item.id })
                  }
                >
                  {item?.description}
                </option>
              ))}
            </select>
          ) : item.title == 'Media Item' ? (
            <div>
              <Select
                value={selected?.mediaitem}
                options={options}
                onChange={handleImageChange}
                getOptionLabel={(option) => (
                  <div>
                    <img
                      src={option.imageUrl}
                      // alt={option.label}
                      style={{ width: '50px', marginRight: '10px' }}
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
            // <Select
            //   options={options}
            //   onChange={handleMediaChange}
            //   value={selected?.mediaitem}
            //   placeholder="Choose a Media Item"
            // />
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              onChange={(e) =>
                setEventDetail({
                  ...eventdetail,
                  [item.method]: e.target.value,
                })
              }
              required
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button
          className={`bg-green-700 px-4 py-2 rounded-lg text-white ${
            isFormValid ? '' : 'bg-gray-400 opacity-50 cursor-not-allowed'
          }`}
          // className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={insertEvent}
          disabled={!isFormValid}
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

export default CreateEvent;

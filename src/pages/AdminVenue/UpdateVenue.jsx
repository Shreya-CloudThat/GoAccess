import React, { useState, useContext, useEffect } from 'react';
import { fetchData } from '../../config/ApiCall';
import Admin from '../Admin';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

const fieldData = [
  {
    title: 'Name',
    placeholder: 'Enter the Venue Name',
    method: 'name',
  },
  {
    title: 'Media Item',
  },
  {
    title: 'Description',
    placeholder: 'Enter the Venue Description',
    method: 'description',
  },
  {
    title: 'Capacity',
    placeholder: 'Enter the Venue Capacity',
    method: 'capacity',
  },
  {
    title: 'Street',
    placeholder: 'Enter the Venue Street',
    method: 'street',
  },
  {
    title: 'City',
    placeholder: 'Enter the Venue City',
    method: 'city',
  },
  {
    title: 'Country',
    placeholder: 'Enter the Venue Country',
    method: 'country',
  },
];

const UpdateVenue = ({ updateComponents, selectedId }) => {
  const [response, setResponse] = useState();
  const [venuelist, setVenueList] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState();

  const handleDiscard = () => {
    // toggleComponent();
    updateComponents();
    // window.location.href = '/adminvenue';
  };

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/list-venues/listVenues',
      {
        method: 'listVenues',
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
    // toggleComponent();
  }, []);

  const [venuedetail, setVenueDetails] = useState({
    name: '',
    description: '',
    street: '',
    city: '',
    country: '',
    capacity: '',
    media_item_id: '',
  });

    const [selected, setSelected] = useState({
      category: '',
      mediaitem: '',
    });

  const [medialist, setMediaList] = useState([]);

  console.log('venuedetail', venuedetail);

  const Id = selectedId;

  useEffect(() => {
    // Find the object in the data array that matches the Id from the URL
    const matchingVenue = venuelist?.find((venue) => venue.venue_id === Id);

    if (matchingVenue) {
      // Set the state based on the matching object
      setVenueDetails({
        name: matchingVenue.name,
        description: matchingVenue.description,
        street: matchingVenue?.address.split(', ')[0],
        city: matchingVenue?.address.split(', ')[1],
        country: matchingVenue?.address.split(', ')[2], // Set the appropriate value here
        capacity: matchingVenue.capacity,
        media_item_id: matchingVenue.media_item_id,
      });
      setSelectedImage({
        value: matchingVenue.url,
        imageUrl: matchingVenue.url,
      });
    }
  }, [Id, venuelist]);

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/getMediaItems',
      { method: 'getMediaItems' }
    )
      .then((item) => {
        // console.log('response--', item);
        setMediaList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  }, []);

    const handleImageChange = (selectedOption) => {
      // setSelectedImage(selectedOption);
      setVenueDetails({
        ...venuedetail,
        url: selectedOption.value,
      });

      setVenueDetails({
        ...venuedetail,
        media_item_id: selectedOption.value.media_item_id,
      });
      setSelected({
        ...selected,
        mediaitem: selectedOption.value.media_item_id,
      });
      setSelectedImage(selectedOption);
    };


  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'updateVenue',
    name: venuedetail.name,
    description: venuedetail.description,
    address:
      venuedetail.street +
      ' , ' +
      venuedetail.city +
      ' , ' +
      venuedetail.country,
    capacity: venuedetail.capacity,
    media_item_id: venuedetail.media_item_id,
    created_by: user_id,
    venue_id: Id,
  };
  //

  const updateVenue = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/venues/updateVenue',
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

    const options = medialist.map((item) => ({
      label: (
        <div>
          <img src={item.url} alt={item.id} style={{ width: '30px' }} />
        </div>
      ),
      value: item,
    }));

  const deleteVenue = () => {};

  return (
    <>
      <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col align-middle">
        <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
          Update Venue
        </span>
        <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        {fieldData?.map((item, index) => (
          <div className="flex p-3 gap-5">
            <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
              {item.title}
            </p>
            {item.title == 'Media Item' ? (
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
              // <select
              //   class="px-2 py-2 rounded-md w-full"
              //   onChange={(e) =>
              //     setVenueDetails({
              //       ...venuedetail,
              //       media_item_id: e.target.value,
              //     })
              //   }
              // >
              //   <option>Choose a Media Item</option>
              //   {medialist?.map((media) => (
              //     <option value={media.media_item_id}>{media.url}</option>
              //   ))}
              // </select>
              <input
                className="px-2 rounded-md py-2 w-full"
                placeholder={item.placeholder}
                value={venuedetail[item.method] || ''}
                onChange={(e) =>
                  setVenueDetails({
                    ...venuedetail,
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
            onClick={updateVenue}
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

export default UpdateVenue;

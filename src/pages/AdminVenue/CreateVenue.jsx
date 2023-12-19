import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

const fieldData = [
  {
    title: 'Name',
    placeholder: 'Enter the Venue Name',
    method: 'name',
  },
  {
    title: 'Media Item',
    method:'media_item'
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

const CreateVenue = ({ toggleComponent }) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const timestamp = new Date().toISOString();

  const [venuedetail, setVenueDetails] = useState({
    name: '',
    description: '',
    street: '',
    city: '',
    country: '',
    capacity: '',
    mediaitem: '',
  });
  const [medialist, setMedialist] = useState([]);
  const [selected, setSelected] = useState({
    category: '',
    mediaitem: '',
  });
  console.log('venuedetail', venuedetail);

   let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  //  console.log(user_id)
  const payload = {
    method: 'insertVenue',
    name: venuedetail.name,
    description: venuedetail.description,
    address:
      venuedetail.street +
      ' , ' +
      venuedetail.city +
      ' , ' +
      venuedetail.country,
    capacity: venuedetail.capacity,
    media_item_id: selected.mediaitem?.value?.media_item_id,
    created_by: user_id,
  };

  useEffect(()=>{
     setLoading(true);
     fetchData(
       'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/getMediaItems',
       { method: 'getMediaItems' }
     )
       .then((item) => {
         console.log('response--', item);
         setMedialist(item);
         setLoading(false);
       })
       .catch((error) => {
         console.error('Error in fetch:', error);
       });
  },[])
  console.log("medialist-->",medialist)

  const insertVenue = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/venues/insertVenue',
      payload
    )
      .then((item) => {
        console.log('response--', item);
        setResponse(item);
        setLoading(false);
        //  window.location.reload();
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    toggleComponent();
  };

  const validateForm = () => {
    const requiredFields = [
      'name',
     'mediaitem',
      'country',
      'city',
      'street',
      'capacity',
      'description',
    ];

    for (const field of requiredFields) {
      if (!venuedetail[field]) {
        // Field is empty, form is invalid
        return false;
      }
    }
    return true;
  };

     const options = medialist.map((item) => ({
       label: (
         <div>
           <img src={item.url} alt={item.id} style={{ width: '30px' }} />
         </div>
       ),
       value: item,
     }));

      const handleImageChange = (selectedOption) => {
        setSelected({ ...selected, mediaitem: selectedOption });
        setVenueDetails({ ...venuedetail, mediaitem: selectedOption.value.url });
        // setSelectedImage(selectedOption);
      };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [venuedetail]);

  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New Venue
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
            //   {medialist.map((item) => (
            //     <option value={item.media_item_id}>{item.url}</option>
            //   ))}
            // </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
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
          className={`bg-green-700 px-4 py-2 rounded-lg text-white ${
            isFormValid ? '' : 'bg-gray-400 opacity-50 cursor-not-allowed'
          }`}
          // className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={insertVenue}
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

export default CreateVenue;

import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

const fieldData = [
  {
    title: 'Name',
    placeholder: 'Enter the Section Name',
    method: 'section_name',
  },
  {
    title: 'Description',
    placeholder: 'Enter the Section Description',
    method: 'section_description',
  },
  {
    title: 'Number of Rows',
    placeholder: 'Enter the Section Number of Rows',
    method: 'no_of_rows',
  },
  {
    title: 'Row Capacity',
    placeholder: 'Enter the Section Row Capacity',
    method: 'row_capacity',
  },
  {
    title: 'Capacity',
    placeholder: 'Enter the Section Capacity',
    method: 'capacity',
  },
  {
    title: 'Venue',
    placeholder: 'Enter the Section Capacity',
    method: 'venue',
    id: 'venue_id',
  },
];

const CreateSection = ({ toggleComponent }) => {
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const [venuelist, setVenueList] = useState([]);
  const [sectiondetail, setSectionDetail] = useState({
    section_name: '',
    section_description: '',
    no_of_rows: '',
    row_capacity: '',
    capacity: '',
    venue_id: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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


 const payload = {
   method: 'insertSection',
   name: sectiondetail.section_name,
   description: sectiondetail.section_description,
   no_of_rows: sectiondetail.no_of_rows,
   row_capacity: sectiondetail.row_capacity,
   venue_id: sectiondetail.venue_id,
   created_by: 'e0cc2ee3-8e7d-4825-b5dc-c061c370e364',
 };

  const insertSection = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/sections/insertSection',
      payload
    )
      .then((item) => {
        // console.log('response--', item);
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    toggleComponent();
  };

   console.log('sectiondetail', sectiondetail);

  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New Section
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Venue' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setSectionDetail({
                  ...sectiondetail,
                  venue_id: e.target.value,
                 
                })
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
              onChange={(e) =>
                setSectionDetail({
                  ...sectiondetail,
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
          onClick={insertSection}
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

export default CreateSection;

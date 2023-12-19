import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

const CreatePerformances = ({ toggleComponent }) => {
  const [performancedetail, setPerformancedetail] = useState({
    show:'',
    date: '',
  });
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [showlist, setShowList] = useState([]);
  const fieldData = [
    {
      title: 'Show',
      placeholder: 'Enter the EventCategory Description',
    },
    {
      title: 'Date',
      placeholder: 'Enter the MediaItem Url',
    },
  ];
   let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'insertPerformance',
    show_id: performancedetail.show,
    performance_date: performancedetail.date,
    created_by: user_id,
  };

  const insertMediaItem = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/performances/insertPerformance',
      payload
    )
      .then((item) => {
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    toggleComponent();
  };

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/shows/getShows',
      {
        method: 'getShows',
      }
    )
      .then((item) => {
        setShowList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  }, []);

  console.log("performancedetail",performancedetail)
  console.log('showlist', showlist);
  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New Performances
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Show' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              
              onChange={(e) =>
                setPerformancedetail({
                  ...performancedetail,
                  show: e.target.value,
                })
              }
            >
              <option>Choose a Show</option>
              {/* <option>Choose a Show</option> */}

              {showlist?.map((show, index) => (
                <option key={show.show_id} value={show.show_id}>
                  {show.event_name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              type="date"
              onChange={(e) =>
                setPerformancedetail({
                  ...performancedetail,
                  date: e.target.value,
                })
              }
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={insertMediaItem}
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

export default CreatePerformances;

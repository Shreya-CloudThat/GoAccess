import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

const UpdatePerformance = ({ updateComponents, selectedId }) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);

  const [performancedetail, setPerformancedetail] = useState({
    show: '',
    date: '',
    show_id:''
  });

  console.log('performancedetail', performancedetail);
  const[performancelist,setPerformanceList] = useState([])
  //   console.log('categorydetail', categorydetail);
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
    method: 'updatePerformance',
    show_id: performancedetail.show_id,
    performance_date: performancedetail.date,
    created_by: user_id,
    performance_id: selectedId,
  };

  const handleDiscard = () => {
    // toggleComponent();
    updateComponents();
    // window.location.href = '/adminvenue';
  };
  const updatePerformances = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/performances/updatePerformance',
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


  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/performances/getPerformances',
      {
        method: 'getPerformances',
      }
    )
      .then((item) => {
        console.log('response--', item);
        setPerformanceList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    // toggleComponent();
  }, []);

  const [showlist, setShowList] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/shows/getShows',
      {
        method: 'getShows',
      }
    )
      .then((item) => {
        console.log('response--', item);
        setShowList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  }, []);

  const Id = selectedId;
//   console.log('performance', selectedId);
  useEffect(() => {
    const matchingVenue = performancelist?.find((e) => e.id === Id);
    if (matchingVenue) {
      setPerformancedetail({
        ...performancedetail,
        show: matchingVenue.show_name,
        date: matchingVenue.performance_date,
        show_id: matchingVenue.show_id,
      });
    }
  }, [Id, performancelist]);

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const requiredFields = ['description'];

    for (const field of requiredFields) {
      if (!performancedetail[field]) {
        // Field is empty, form is invalid
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [performancedetail]);

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
              value={performancedetail.show}
              onChange={(e) =>
                setPerformancedetail({
                  ...performancedetail,
                  show: e.target.value,
                  show_id:e.target.key
                })
              }
            >
              <option>Choose a Show</option>
              {/* <option>Choose a Show</option> */}

              {showlist?.map((show, index) => (
                <option key={show.show_id} value={show.event_name}>
                  {show.event_name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              type="date"
              value={
                performancedetail?.date
                  ? new Date(performancedetail.date).toLocaleDateString('en-CA')
                  : ''
              }
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
          onClick={updatePerformances}
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

export default UpdatePerformance;

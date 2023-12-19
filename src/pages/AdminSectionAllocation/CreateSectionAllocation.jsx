import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

const CreateSectionAllocation = ({ toggleComponent }) => {
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const fieldData = [
    {
      title: 'Occupied Count',
      placeholder: 'Enter the SectionAllocation Occupied Count',
      method:'occupied_count'
    },
    {
      title: 'Performance',
      placeholder: 'Enter the Section Name',
      method:'performance_id'
    },
    {
      title: 'Section',
      placeholder: 'Enter the Section Description',
      method:'section_id'
    },
  ];

  const [sectionlist, setSectionList] = useState([]);
  const [performancelist, setPerformanceList] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionallocation, setSectionAlllocation] = useState({
    occupied_count: '',
    performance_id: '',
    section_id: '',
  });

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/sections/getSections',
      {
        method: 'getSections',
      }
    )
      .then((item) => {
        console.log('response--', item);
        setSectionList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });

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
  }, []);


 let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'insertSectionAllocation',
    section_id: sectionallocation.section_id,
    performance_id: sectionallocation.performance_id,
    occupied_count: sectionallocation.occupied_count,
    created_by: user_id,
  };

  const insertSectionAllocation = () => {
    setLoading(true);
    fetchData(
      ' https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/section-allocation/insertSectionAllocation',
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
        Create a New SectionAllocation
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Performance' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setSectionAlllocation({
                  ...sectionallocation,
                  performance_id: e.target.value,
                })
              }
            >
              <option>Choose a Performance</option>
              {performancelist?.map((performance, index) => (
                <option key={index} value={performance.id}>
                  {performance.show_name}
                </option>
              ))}
            </select>
          ) : item.title == 'Section' ? (
            <select
              class="px-2 py-2 rounded-md w-full"
              onChange={(e) =>
                setSectionAlllocation({
                  ...sectionallocation,
                  section_id: e.target.value,
                })
              }
            >
              <option>Choose a Section</option>
              {sectionlist?.map((section, index) => (
                <option key={index} value={section.section_id}>
                  {section.section_name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              onChange={(e) =>
                setSectionAlllocation({
                  ...sectionallocation,
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
          onClick={insertSectionAllocation}
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

export default CreateSectionAllocation;

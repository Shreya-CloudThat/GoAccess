import React, { useEffect, useState } from 'react';
import { fetchData } from '../../config/ApiCall';

const CreateEventCategory = ({ toggleComponent }) => {
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);

  const [categorydetail, setCategoriesdetail] = useState({
    description: '',
  });

  console.log('categorydetail', categorydetail);

  const fieldData = [
    {
      title: 'Description',
      placeholder: 'Enter the EventCategory Description',
    },
  ];

  // Validate
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const requiredFields = ['description'];

    for (const field of requiredFields) {
      if (!categorydetail[field]) {
        // Field is empty, form is invalid
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [categorydetail]);

  ///

  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'insertEventCategory',
    description: categorydetail.description,
    created_by: user_id,
  };

  const insertEventCategory = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/event-categories/insertEventCategory',
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
        Create a New EventCategory
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {item.title == 'Performance' ? (
            <select class="px-2 py-2 rounded-md w-full">
              <option>Choose a performance</option>
              <option>Hello</option>
            </select>
          ) : (
            <input
              key=""
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              onChange={(e) =>
                setCategoriesdetail({
                  ...categorydetail,
                  description: e.target.value,
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
          onClick={insertEventCategory}
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

export default CreateEventCategory;

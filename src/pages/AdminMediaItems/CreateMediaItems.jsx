import React, { useState, useEffect } from 'react';
import { fetchData } from '../../config/ApiCall';

const CreateMediaItems = ({ toggleComponent }) => {
  const [mediadetail, setMediaDetails] = useState({
    url: '',
  });
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const handleDiscard = () => {
    toggleComponent(); // This sets showOtherComponent to false
  };

  console.log('mediadetail', mediadetail);
  const fieldData = [
    // {
    //   title: 'Url',
    //   placeholder: 'Enter the MediaItem Url',
    // },
    {
      title: 'Image',
      placeholder: 'Enter the MediaItem Url',
    },
  ];
  let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'insertMediaItem',
    url: mediadetail?.url,
    created_by: user_id,
  };

  const insertMediaItem = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/insertMediaItem',
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Use FileReader to read the contents of the file as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaDetails({
          url: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
      <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
        Create a New MediaItem
      </span>
      <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      {fieldData?.map((item, index) => (
        <div className="flex p-3 gap-5">
          <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
            {item.title}
          </p>
          {/* 
          {item?.title == 'Image' ? (
            <input
              type="file"
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              onChange={(e) =>
                setMediaDetails({ ...mediadetail, url: e.target.value })
              }
            />
          ) : (
            <input
              className="px-2 rounded-md py-2 w-full"
              placeholder={item.placeholder}
              onChange={(e) =>
                setMediaDetails({ ...mediadetail, url: e.target.value })
              }
            />
          )} */}

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {mediadetail.url && (
            <img src={mediadetail.url} alt="Uploaded Image" />
          )}
          {/* <input
            className="px-2 rounded-md py-2 w-full"
            placeholder={item.placeholder}
            onChange={(e) =>
              setMediaDetails({ ...mediadetail, url: e.target.value })
            }
          /> */}
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

export default CreateMediaItems;

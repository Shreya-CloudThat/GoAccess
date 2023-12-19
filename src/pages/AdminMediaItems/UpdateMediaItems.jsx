import React, { useState, useEffect } from 'react';
import { fetchData } from '../../config/ApiCall';

const UpdateMediaItems = ({ updateComponents, selectedId }) => {
  const [mediadetail, setMediaDetails] = useState({
    url: '',
  });
  const [medialist, setMediaList] = useState([]);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);

  console.log('mediadetail', medialist);
  const handleDiscard = () => {
    updateComponents(); // This sets showOtherComponent to false
  };
  const fieldData = [
    {
      title: 'Url',
      placeholder: 'Enter the MediaItem Url',
    },
  ];
  const Id = selectedId;
   let user_id = JSON.parse(localStorage.getItem('access'))[0]?.user_id;
  const payload = {
    method: 'updateMediaItem',
    url: mediadetail?.url,
    created_by: user_id,
    media_item_id: Id,
  };

  useEffect(() => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/getMediaItems',
      { method: 'getMediaItems' }
    )
      .then((item) => {
        console.log('response--', item);
        setMediaList(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    // toggleComponent();
  }, []);

  useEffect(() => {
    // Find the object in the data array that matches the Id from the URL
    const matchingMedia = medialist?.find(
      (media) => media.media_item_id === Id
    );

    if (matchingMedia) {
      // Set the state based on the matching object
      setMediaDetails({
        url: matchingMedia.url,
      });
    }
  }, [Id, medialist]);

  const updateMediaItem = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/updateMediaItem',
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Use FileReader to read the contents of the file as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaDetails({ ...mediadetail, url: reader.result });
        //  setMediaDetails({
        //    url: reader.result,
        //  });
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

          {/* <input
            className="px-2 rounded-md py-2 w-full"
            placeholder={item.placeholder}
            value={mediadetail.url}
            onChange={(e) =>
              setMediaDetails({ ...mediadetail, url: e.target.value })
            }
          /> */}

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {mediadetail.url && (
            <img
              src={mediadetail.url}
              alt="Uploaded Image"
              className="h-24 w-24"
            />
          )}
        </div>
      ))}
      <div className="flex ml-36 gap-3">
        <button
          className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={updateMediaItem}
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

export default UpdateMediaItems;

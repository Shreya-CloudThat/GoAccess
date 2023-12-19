import React, { useState, useEffect } from 'react';
import TablePagination from '../../custom-components/TablePagination';
import CreateMediaItems from './CreateMediaItems';
import { fetchData } from '../../config/ApiCall';
import UpdateMediaItems from './UpdateMediaItems';
import { ThreeDots } from 'react-loader-spinner';

const AdminMediaItems = () => {
  // const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [showOtherComponent, setShowOtherComponent] = useState({
    update: false,
    create: false,
  });

  const toggleComponent = () => {
    setShowOtherComponent({
      ...showOtherComponent,
      create: !showOtherComponent.create,
    });
    getMediaItems();
  };

  const updateComponent = () => {
    setShowOtherComponent({
      ...showOtherComponent,
      update: !showOtherComponent.update,
    });
    getMediaItems();
  };

  const getPayload = { method: 'getMediaItems' };

  const getMediaItems = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/getMediaItems',
      getPayload
    )
      .then((item) => {
        console.log('response--', item);
        setResponse(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
  };
  useEffect(() => {
    getMediaItems();
  }, []);

  const column = [
    {
      title: 'Url',
    },
    {
      title: 'Edit',
    },
    {
      title: 'Delete',
    },
  ];

  // console.log("data",data)
  const fieldData = [
    {
      title: 'Url',
      placeholder: 'Enter the MediaItem Url',
    },
  ];

  const handleSearch = (response, search) => {
    if (search.length === 0) return response;

    return response.filter((item) =>
      item.url.toLowerCase().includes(search.toLowerCase())
    );
  };

  console.log('response', response);

  let tableData = [
    {
      method: 'getMediaItems',
      res: handleSearch(response, search),
    },
  ];

  //  const res = [
  //    {
  //      method: 'getMediaItems',
  //      res: response,
  //    },
  //  ];
  console.log('tableData', tableData);

  const deleteMediaItem = (id) => {
    setLoading(true);
    // console.log('ID_----------------------', id);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/media-items/getMediaItems/deleteMediaItem',
      {
        method: 'deleteMediaItem',
        media_item_id: id,
      }
    )
      .then((item) => {
        console.log('response--', item);

        setLoading(false);
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Error in fetch:', error);
      });
    getMediaItems();
    // getVenues();
  };

  return (
    <>
      {loading ? (
        // If loading is true, show the loading spinner (assuming Audio is a loading spinner component)
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '100vh',
          }}
        >
          <ThreeDots  
            height="50"
            width="60"
            radius="9"
            color="purple"
            ariaLabel="loading"
            wrapperStyle={{ marginLeft: '300px' }} // Example styles
            wrapperClass="custom-loader"
          />
        </div>
      ) : showOtherComponent?.create ? (
        <CreateMediaItems toggleComponent={toggleComponent} /> // Render the other component if showOtherComponent is true
      ) : showOtherComponent.update ? (
        <UpdateMediaItems
          updateComponents={updateComponent}
          selectedId={selectedId}
        />
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New MediaItems
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <button
            onClick={toggleComponent}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>

          <TablePagination
            data={tableData}
            itemsPerPage={5}
            column={column}
            updateComponents={updateComponent}
            setSelectedId={setSelectedId}
            deleteMediaItem={deleteMediaItem}
          />
        </div>
      )}
    </>
  );
};

export default AdminMediaItems;

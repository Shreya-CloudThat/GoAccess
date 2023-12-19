import React, { useEffect, useState } from 'react';
import TablePagination from '../../custom-components/TablePagination';
import CreateSectionAllocation from './CreateSectionAllocation';
import { fetchData } from '../../config/ApiCall';
import { ThreeDots } from 'react-loader-spinner';

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 4, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 5, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 6, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 7, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 8, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 9, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 10, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 11, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 12, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 13, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 14, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 15, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 16, name: 'Jane Smith', email: 'jane@example.com' },
  // Add more data here
];
const column = [
  {
    title: 'Occupied Count',
  },
  {
    title: 'Performance',
  },
  {
    title: 'Section',
  },
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];
const fieldData = [
  {
    title: 'Occupied Count',
    placeholder: 'Enter the SectionAllocation Occupied Count',
  },
  // {
  //   title: 'Performance',
  // },
  // {
  //   title: 'Section',
  // },
];

const handleSearch = (response, search) => {
  if (search.length === 0) return response;

  return response.filter((item) =>
    item.occupied_count.toLowerCase().includes(search.toLowerCase())
  );
};
const AdminSectionAllocation = () => {
  const [showOtherComponents, setShowOtherComponents] = useState({
    update: false,
    create: false,
  });
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');

  const getSectionAllocations = () => {
    setLoading(true);
    fetchData(
      'https://8v901o1eo2.execute-api.ap-south-1.amazonaws.com/dev/section-allocation/getSectionAllocations',
      {
        method: 'getSectionAllocations',
      }
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
    getSectionAllocations();
  }, []);

  const updateComponents = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      update: !showOtherComponents.update,
    });
     getSectionAllocations();
  };

  const toggleComponent = () => {
    setShowOtherComponents({
      ...showOtherComponents,
      create: !showOtherComponents.create,
    });
     getSectionAllocations();
  };

  let tableData = [
    {
      method: 'getSectionAllocations',
      res: handleSearch(response, search),
    },
  ];
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
            color="violet"
            ariaLabel="loading"
            wrapperStyle={{ marginLeft: '300px' }} // Example styles
            wrapperClass="custom-loader"
          />
        </div>
      ) : showOtherComponents.create ? (
        <CreateSectionAllocation toggleComponent={toggleComponent} /> // Render the other component if showOtherComponent is true
      ) : showOtherComponents.update ? (
        <UpdateSection
          updateComponents={updateComponents}
          selectedId={selectedId}
        />
      ) : (
        <div className="bg-gray-200 rounded-md w-2/3  flex  flex-col">
          <span className="text-2xl px-3 py-3 mt-2 font-bold text-zinc-600">
            Create a New SectionAllocation
          </span>
          <hr className="w-full h-1 bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <button
            onClick={toggleComponent}
            className="bg-violet-900 w-20 text-white px-2 py-2 ml-3 mt-2 rounded-md"
          >
            Create
          </button>
          <span className="text-xl px-3 py-2 font-bold text-zinc-600">
            Search for Sections
          </span>
          {fieldData?.map((item, index) => (
            <div className="flex p-3 gap-5">
              <p className="font-semibold text-zinc-700 w-1/6 flex  align-middle">
                {item.title}
              </p>
              {item.title == 'Performance' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a Perfromance</option>
                  <option>Hello</option>
                </select>
              ) : item.title == 'Section' ? (
                <select class="px-2 py-2 rounded-md w-full">
                  <option>Choose a Section</option>
                  <option>Hello</option>
                </select>
              ) : (
                <input
                  className="px-2 rounded-md py-2 w-full"
                  placeholder={item.placeholder}
                />
              )}
            </div>
          ))}
          <button className="bg-violet-900 w-20 text-white px-2 py-2 ml-36 mt-2 rounded-md">
            Search
          </button>
          <TablePagination data={tableData} itemsPerPage={5} column={column} />
        </div>
      )}
    </>
  );
};

export default AdminSectionAllocation;

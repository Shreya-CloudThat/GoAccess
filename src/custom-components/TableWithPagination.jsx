import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const itemsPerPage = 5;

const TableWithPagination = () => {
  const data = [
    {
      column1: 'Value 1A',
      column2: 'Value 1B',
      column3: 'Value 1C',
      column4: 'Value 1D',
      column5: 'Value 1E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    {
      column1: 'Value 2A',
      column2: 'Value 2B',
      column3: 'Value 2C',
      column4: 'Value 2D',
      column5: 'Value 2E',
    },
    // Add more data rows
  ];
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page data
  const currentPageData = data.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full divide-y p-4 divide-gray-200 border ">
          {/* Table headers */}
          <thead>
            <tr className='bg-violet-900 text-white'>
              <th className="text-center p-2">Booking #</th>
              {/* <th className="text-center">Purchaser</th> */}
              <th className="text-center">Created On</th>
              <th className="text-center">Total ticktes</th>
              <th className="text-center">Total price</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.column1}</td>
                {/* <td className="text-center">{item.column2}</td> */}
                <td className="text-center">{item.column3}</td>
                <td className="text-center">{item.column4}</td>
                <td className="text-center">{item.column5}</td>
                <td className="text-center text-red">
                  {' '}
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col md:flex-row items-center justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mb-2 md:mb-0 md:mr-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TableWithPagination;

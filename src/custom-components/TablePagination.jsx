import React, { useEffect, useState } from 'react';
// import {useData} from '../context/SelectedIdContext';
import UpdateVenue from '../pages/AdminVenue/UpdateVenue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchData } from '../config/ApiCall';
// import { useDataDispatch } from '../context/SelectedIdContext';
// import { useSelectedId } from '../context/SelectedIdContext';
// import { useHistory } from 'react-router-dom';

const TablePagination = ({
  data,
  itemsPerPage,
  column,
  updateComponents,
  setSelectedId,
  deleteVenue,
  deleteEvent,
  deleteEventCategory,
  deleteMediaItem,
  deletePerformances,
  deleteBooking,
  deleteTicketPrice,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemid, setItemid] = useState({
    venue_id: '',
  });
  
  // const [selectedId, setSelectedId] = useState('');

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  console.log(
    'currentData',
    currentData[0]?.res?.map((item, index) => item)
  );

  const handleEditClick = (Id) => {
    switch (currentData[0]?.method) {
      case 'getVenues':
        window.location.href = `/updatevenue?Id=${Id}`;
        break;
      default:
        return null;
    }
  };

  return (
    <div className="container overflow-x-auto mx-auto mt-5">
      {/* <h1 className="text-2xl font-bold mb-4">Table with Pagination</h1> */}

      <table className="min-w-full bg-white border border-violet-400">
        <thead>
          <tr className=" border-2 border-violet-400">
            {column.map((col, index) => (
              <th className="py-2 px-4">{col.title}</th>
            ))}
            {/* <th className="py-2 px-4">ID</th>
             <th className="py-2 px-4">Name</th>
             <th className="py-2 px-4">Email</th> */}
          </tr>
        </thead>
        <tbody>
          {(() => {
            switch (currentData[0]?.method) {
              case 'getMediaItems':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td
                      className="py-2 px-4 text-center flex justify-center"
                      id={item.media_item_id}
                    >
                      <img src={item.url} className="h-10 w-10" />
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.media_item_id}
                    >
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.media_item_id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.media_item_id}
                      onClick={() => deleteMediaItem(item.media_item_id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="cursor-pointer"
                      />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getEventCategories':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td className="py-2 px-4 text-center" id={item.id}>
                      {item.description}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.id}>
                      <button
                        onClick={() => {
                          setSelectedId(item.id);
                          updateComponents();
                        }}
                        // }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="cursor-pointer"
                        />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.id}
                      onClick={() =>
                        // setItemid({ ...itemid, venue_id: item.venue_id });
                        deleteEventCategory(item?.id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getBookingsByUserId':
                return currentData[0]?.res?.map((item, index) => {
                  const currentDate = new Date();
                  const bookingDate = item.performance_date;
                  const bookingDateTime = new Date(bookingDate);
                  console.log('bookingDate', bookingDateTime);
                  console.log('bookingDate C', currentDate);

                   const timeDifference = bookingDateTime - currentDate;
                   const isWithin24Hours =
                     timeDifference <= 24 * 60 * 60 * 1000;
                  const isDateFartherThanOneDay =
                    (bookingDate - currentDate) / (1000 * 60 * 60 * 24) > 1;
                  console.log('isWithin24Hours', isWithin24Hours);
                  // <div className="overflow-x-auto">
                  return (
                    <tr key={index} className="border border-violet-100">
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {index + 1}
                      </td>

                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.event_name}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.venue_name}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.performance_date.split('T')[0]}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.performance_date.split('T')[1]}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.tickets.data.map((item) => (
                          <>
                            <span>{item.row_number} </span>
                            {'-'}
                            <span> {item.seat_number} </span>
                            <br></br>
                          </>
                        ))}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.tickets.data.map(
                          (item, index) =>
                            index === 0 && (
                              <>
                                {item.section_name}
                                {'-'}
                                {item.section_description}
                              </>
                            )
                        )}

                        {/* {item.tickets.data.map((item) => item.row_number)} */}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.tickets.data.length}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.total_price}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        {item.description}
                      </td>
                      <td
                        className="py-2 px-4 text-center"
                        id={item.booking_id}
                      >
                        <button
                          type="button"
                          className={`text-white ${
                            isWithin24Hours
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800'
                          } font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
                          onClick={() =>
                            !isWithin24Hours && deleteBooking(item.booking_id)
                          }
                          disabled={isWithin24Hours}
                        >
                          CANCEL
                        </button>
                        {/* Alternatively, you can use an icon if you uncomment the following line */}
                        {/* <FontAwesomeIcon icon={faTrash} /> */}
                      </td>

                      {/* Add more table cells as needed */}
                    </tr>
                  );
                  // </div>
                });
              // case 'getEventCategories':
              //   return currentData[0]?.res?.map((item, index) => (
              //     <tr key={index} className="border border-violet-100">
              //       <td
              //         className="py-2 px-4 text-center"
              //         id={item.media_item_id}
              //       >
              //         {item.description}
              //       </td>
              //       <td
              //         className="py-2 px-4 text-center"
              //         id={item.media_item_id}
              //       >
              //         <button
              //         //  onClick={ ()=>handleEditClick(item.venue_id)}
              //         // onClick={() => {
              //         //   setSelectedId(item.venue_id);
              //         //   updateComponents();
              //         // }}
              //         >
              //           <FontAwesomeIcon icon={faEdit} />
              //         </button>
              //       </td>
              //       <td
              //         className="py-2 px-4 text-center"
              //         id={item.media_item_id}
              //       >
              //         <FontAwesomeIcon icon={faTrash} />
              //       </td>
              //       {/* Add more table cells as needed */}
              //     </tr>
              //   ));
              case 'getSections':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.section_name}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.section_description}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.no_of_rows}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.row_capacity}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.capacity}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.venue_name}
                    </td>

                    <td className="py-2 px-4 text-center">
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.section_id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.section_id}
                      onClick={() => deleteSection(item?.section_id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getSectionAllocations':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.occupied_count}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.performance_date.split('T')[0]}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.section_id}>
                      {item.name}
                    </td>

                    <td className="py-2 px-4 text-center">
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.venue_id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getTicketCategories':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td className="py-2 px-4 text-center" id={item.id}>
                      {item.description}
                    </td>

                    <td className="py-2 px-4 text-center">
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.venue_id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getTicketPrices':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td
                      className="py-2 px-4 text-center"
                      id={item.ticket_price_id}
                    >
                      {item.show_description}
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.ticket_price_id}
                    >
                      {item.section_description}
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.ticket_price_id}
                    >
                      {item.ticket_category_description}
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.ticket_price_id}
                    >
                      {item.price}
                    </td>

                    <td className="py-2 px-4 text-center">
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.ticket_price_id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.ticket_price_id}
                      onClick={()=>deleteTicketPrice(item.ticket_price_id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getEvents':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td className="py-2 px-4 text-center" id={item?.event_id}>
                      {item?.event_name}
                    </td>
                    <td className="py-2 px-4 text-center" id={item?.event_id}>
                      <img src={item.url} className="h-9 w-8" />
                    </td>
                    <td className="py-2 px-4 text-center" id={item?.event_id}>
                      {item?.event_category_description}
                    </td>
                    <td className="py-2 px-4 text-center" id={item?.event_id}>
                      {item?.event_description}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.event_id}>
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.event_id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.event_id}
                      onClick={() =>
                        // setItemid({ ...itemid, venue_id: item.venue_id });
                        deleteEvent(item?.event_id)
                      }
                    >
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        icon={faTrash}
                      />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getVenues':
                // console.log('here', currentData[0]);
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      {item.venue_name}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      {item.venue_name}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      {item.venue_description}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      {item.capacity}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      {item.address}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.venue_id}>
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.venue_id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item?.venue_id}
                      onClick={() =>
                        // setItemid({ ...itemid, venue_id: item.venue_id });
                        deleteVenue(item?.venue_id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getShows':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td
                      className="py-2 px-4 text-center"
                      id={item?.event_category_id}
                    >
                      {item?.event_name}
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item?.event_category_id}
                    >
                      {item?.venue_name}
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.event_category_id}
                    >
                      <button
                      //  onClick={ ()=>handleEditClick(item.venue_id)}
                      // onClick={() => {
                      //   setSelectedId(item.venue_id);
                      //   updateComponents();
                      // }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.event_category_id}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'getPerformances':
                return currentData[0]?.res?.map((item, index) => (
                  <tr key={index} className="border border-violet-100">
                    <td className="py-2 px-4 text-center" id={item.id}>
                      {item.show_name}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.id}>
                      {item.performance_date.split('T')}
                    </td>
                    <td className="py-2 px-4 text-center" id={item.id}>
                      <button
                        //  onClick={ ()=>handleEditClick(item.venue_id)}
                        onClick={() => {
                          setSelectedId(item.id);
                          updateComponents();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td
                      className="py-2 px-4 text-center"
                      id={item.id}
                      onClick={() => deletePerformances(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                    {/* Add more table cells as needed */}
                  </tr>
                ));
              case 'info':
                return <Info text={text} />;
              default:
                return null; // or any default rendering if needed
            }
          })()}
        </tbody>
      </table>

      <div className="my-4 flex items-center justify-between">
        <button
          className={`${
            currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded-l`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="text-md font-bold">
          Page {currentPage} of {maxPage}
        </div>
        <button
          className={`${
            currentPage === maxPage
              ? 'bg-gray-300'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded-r`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
